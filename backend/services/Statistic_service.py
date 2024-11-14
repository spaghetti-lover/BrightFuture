from dataclasses import dataclass
from datetime import datetime, timedelta
import pytz
from math import radians, cos, sin
import pandas as pd
from pvlib import location, irradiance
from typing import Dict, List, Tuple

async def get_statistics(capacity: float, latitude: float, longitude: float, timezone: str, 
                  model: str, surface_tilt: float, surface_azimuth: float, 
                  performance_ratio: float) -> Dict:
    """
    Calculate solar statistics and energy generation.
    
    Parameters:
        capacity: System capacity in kW
        latitude: Location latitude
        longitude: Location longitude
        timezone: Timezone string (e.g., 'Asia/Ho_Chi_Minh')
        model: Solar panel model name
        surface_tilt: Panel tilt angle in degrees
        surface_azimuth: Panel azimuth angle in degrees
        performance_ratio: System performance ratio (0-1)
    
    Returns:
        Dictionary containing GII values and energy generation statistics
    """
    
    def get_module_info(model: str) -> Dict:
        """Get module specifications from CSV file"""
        module_df = pd.read_csv('module_data.csv')
        module = module_df[module_df['Model Name'] == model].iloc[0]
        return {
            'efficiency': module['Efficiency'],
            'area': module['Area'],
            'watt_peak': module['Watt peak']
        }

    def calculate_solar_radiation() -> Tuple[pd.Series, pd.Series, float, pd.DataFrame]:
        """Calculate solar radiation using pvlib"""
        site = location.Location(latitude, longitude, timezone)
        times = pd.date_range(start='2024-01-01', end='2025-01-01', freq='H', tz=timezone)
        times = times[:-1]
        
        solar_position = site.get_solarposition(times)
        atmosphere_data = site.get_clearsky(times)
        
        poa_irradiance = irradiance.get_total_irradiance(
            surface_tilt=surface_tilt,
            surface_azimuth=surface_azimuth,
            dni=atmosphere_data['dni'],
            ghi=atmosphere_data['ghi'],
            dhi=atmosphere_data['dhi'],
            solar_zenith=solar_position['apparent_zenith'],
            solar_azimuth=solar_position['azimuth']
        )
        
        radiation_df = pd.DataFrame({
            'total_radiation': poa_irradiance['poa_global']
        })
        
        daily_gii = radiation_df['total_radiation'].resample('D').sum() / 1000
        monthly_gii = radiation_df['total_radiation'].resample('ME').sum() / 1000
        yearly_gii = radiation_df['total_radiation'].sum() / 1000
        
        return daily_gii, monthly_gii, yearly_gii, radiation_df

    def calculate_energy_generation(gii_series: pd.Series, module_info: Dict) -> pd.Series:
        """
        Calculate energy generation from GII values
        E = A * r * H * PR
        where:
        - E = Energy output (kWh)
        - A = Total solar panel area (m²)
        - r = Solar panel efficiency
        - H = Solar radiation (kWh/m²)
        - PR = Performance ratio
        """
        return gii_series * module_info['efficiency'] * performance_ratio * (capacity / module_info['watt_peak'] * module_info['area'])

    # Get module specifications
    module_info = get_module_info(model)
    
    # Calculate radiation values
    daily_gii, monthly_gii, yearly_gii, radiation_df = calculate_solar_radiation()
    
    # Calculate energy generation
    daily_energy = calculate_energy_generation(daily_gii, module_info)
    monthly_energy = calculate_energy_generation(monthly_gii, module_info)
    yearly_energy = daily_energy.sum()
    
    # Format daily values
    daily_values = [
        {
            "date": date.strftime("%Y-%m-%d"),
            "gii": round(gii, 2),
            "energy": round(energy, 2)
        }
        for (date, gii), (_, energy) in zip(daily_gii.items(), daily_energy.items())
    ]
    
    # Format monthly values
    monthly_values = [
        {
            "month": date.strftime("%Y-%m"),
            "gii": round(gii, 2),
            "energy": round(energy, 2)
        }
        for (date, gii), (_, energy) in zip(monthly_gii.items(), monthly_energy.items())
    ]
    
    # Create output dictionary
    result = {
        # GII Statistics (kWh/m²)
        "max_daily_gii": round(daily_gii.max(), 2),
        "min_daily_gii": round(daily_gii.min(), 2),
        "yearly_total_gii": round(yearly_gii, 2),
        "average_daily_gii": round(daily_gii.mean(), 2),
        
        # Energy Generation Statistics (kWh)
        "max_daily_energy": round(daily_energy.max(), 2),
        "min_daily_energy": round(daily_energy.min(), 2),
        "yearly_total_energy": round(yearly_energy, 2),
        "average_daily_energy": round(daily_energy.mean(), 2),
        
        # Detailed values
        "daily_values": daily_values,
        "monthly_values": monthly_values,
        
        # System parameters
        "system_capacity": capacity,
        "performance_ratio": performance_ratio,
        "module_efficiency": module_info['efficiency']
    }
    
    return result