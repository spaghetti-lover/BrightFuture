"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import FormSolar from "@/app/components/form/Form";
import SolarPanelSelector from "@/app/components/estimator/SolarPanelSelector";
import { Card } from "@/components/ui/card";

// Định nghĩa interface cho TypeScript
interface LocationData {
  mapUrl: string;
  imageUrl: string;
  imageAlt: string;
  area: number;
}

// Cấu hình locations để code DRY hơn
const LOCATIONS: Record<string, LocationData> = {
  "Trường THCS Ngoại ngữ - ĐH Ngoại ngữ - ĐHQGHN": {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2836.5348155533816!2d105.7801040737975!3d21.038243387455555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2sVNU%20University%20of%20Engineering%20and%20Technology!5e1!3m2!1sen!2s!4v1731599998757!5m2!1sen!2s",
    imageUrl: "/images/hnue-result.webp",
    imageAlt: "HNUE Campus View",
    area: 100,
  },
  "65 P. Trần Quang Diệu": {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501.5119083026237!2d105.82398699044326!3d21.014863794317193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7eba2c62cd%3A0xddde897cad482f64!2zNjUgUC4gVHLhuqduIFF1YW5nIERp4buHdSwgQ2jhu6MgROG7q2EsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1731627492401!5m2!1sen!2s",
    imageUrl: "/images/nha-result.webp",
    imageAlt: "Building View",
    area: 100,
  },
};

// Component để hiển thị location map và image
const LocationView = ({ mapUrl, imageUrl, imageAlt, area }: LocationData) => (
  <Card className="overflow-hidden">
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
      <iframe
        src={mapUrl}
        className="w-full md:w-1/2 h-64 md:h-96 transition-all duration-300"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
        <img
          className="w-full h-full object-cover transition-all duration-300"
          src={imageUrl}
          alt={imageAlt}
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
          Diện tích ước lượng: {area}m²
        </div>
      </div>
    </div>
  </Card>
);

const LocationDisplay = () => {
  const searchParams = useSearchParams();
  const [address, setAddress] = React.useState<string | null>(null);
  const [selectedPanel, setSelectedPanel] = useState(null);

  React.useEffect(() => {
    const queryAddress = searchParams.get("address");
    if (queryAddress && LOCATIONS[queryAddress]) {
      setAddress(queryAddress);
    }
  }, [searchParams]);

  return (
    <div className="space-y-8 mt-[30px]">
      {/* Location View */}
      {address && LOCATIONS[address] && (
        <div className="animate-fadeIn">
          <LocationView {...LOCATIONS[address]} />
        </div>
      )}

      {/* Solar Panel Selection */}
      <div className="mt-8">
        <SolarPanelSelector
          selectedPanel={selectedPanel}
          onSelectPanel={setSelectedPanel}
        />
      </div>

      {/* Solar Form */}
      <div className="mt-8">
        <FormSolar
          link="/estimator/household/result"
          // Có thể truyền thêm selectedPanel vào form nếu cần
        />
      </div>
    </div>
  );
};

export default LocationDisplay;
