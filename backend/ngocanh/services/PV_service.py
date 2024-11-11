
"""
E = A * r * H * PR

E = Energy (kWh)
A = Total solar panel Area (m2)
r = solar panel yield or efficiency(%) 
H = Annual average solar radiation on tilted panels (shadings not included)
PR = Performance ratio, coefficient for losses (range between 0.5 and 0.9, default value = 0.75)
"""

def estimate_electricity_generated(panel_area, panel_yield, solar_radiation, performance_ratio):
    panel_area = float(panel_area)
    panel_yield = float(panel_yield)
    solar_radiation = float(solar_radiation)
    performance_ratio = float(performance_ratio)
   
        
    # Calculate electricity generated
    kwh_generated = round(panel_area * panel_yield * solar_radiation * performance_ratio * 10**-4, 2)
    return {
        "kwh_generated": kwh_generated,
        "messages": {
            "electricity_generated_message": f"{kwh_generated} kWh of electricity generated",
            "input_values": f"Based on: {panel_area} m² panel area , {panel_yield}% yield, {solar_radiation} kWh/m² radiation, {performance_ratio}% performance"

        }
    }