"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PriceDescLists from "./PriceDescLists";

const SolarPanelFinance = () => {
  const tabs = ["BUY", "LEASE / PPA", "LOAN"];
  const [activeTab, setActiveTab] = useState("BUY");
  const [showDetails, setShowDetails] = useState(false);
  const MenuPricesBuy = [
    {
      price: "$5,000",
      desc: "UPFRONT COST AFTER INCENTIVES",
    },
    {
      price: "$5,000",
      desc: "UPFRONT COST AFTER INCENTIVES",
    },
    {
      price: "$20,000",
      desc: "20-YEAR BENEFITS",
    },
    {
      price: "$15,000",
      desc: "TOTAL 20-YEAR SAVINGS",
    },
  ];
  const MenuPricesLease = [
    {
      price: "$5,000",
      desc: "UPFRONT COST AFTER INCENTIVES",
    },
    {
      price: "$20,000",
      desc: "20-YEAR BENEFITS",
    },
    {
      price: "$15,000",
      desc: "TOTAL 20-YEAR SAVINGS",
    },
  ];
  const MenuPricesLoan = [
    {
      price: "$5,000",
      desc: "UPFRONT COST AFTER INCENTIVES",
    },
    {
      price: "$20,000",
      desc: "20-YEAR BENEFITS",
    },
    {
      price: "$15,000",
      desc: "TOTAL 20-YEAR SAVINGS",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        LEARN HOW TO FINANCE YOUR SOLAR PANELS
      </h2>

      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "BUY" && (
        <div>
          <p className="mb-4">
            <span className="font-semibold text-primary-purple">
              Pay up front, largest lifetime savings.
            </span>{" "}
            You pay the full cost up front and own the solar system without any
            additional payments over time. As the outright owner, you may claim
            any local, state, or federal incentives.
          </p>

          <div className="flex flex-wrap justify-between mb-4">
            <PriceDescLists MenuPrices={MenuPricesBuy} />
          </div>

          <button
            className="flex items-center justify-center w-full py-2 text-blue-500 hover:bg-blue-50 rounded"
            onClick={() => setShowDetails(!showDetails)}
          >
            SHOW DETAILED ESTIMATES
            {showDetails ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>

          {showDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p>Detailed estimates would go here...</p>
            </div>
          )}
        </div>
      )}

      {activeTab == "LEASE / PPA" && (
        <div>
          <p className="mb-4">
            <span className="font-semibold text-primary-purple">
              Pay up front, largest lifetime savings.
            </span>{" "}
            You pay the full cost up front and own the solar system without any
            additional payments over time. As the outright owner, you may claim
            any local, state, or federal incentives.
          </p>

          <div className="flex justify-between mb-4">
            <PriceDescLists MenuPrices={MenuPricesLease} />
          </div>

          <button
            className="flex items-center justify-center w-full py-2 text-blue-500 hover:bg-blue-50 rounded"
            onClick={() => setShowDetails(!showDetails)}
          >
            SHOW DETAILED ESTIMATES
            {showDetails ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>
        </div>
      )}
      {activeTab == "LOAN" && (
        <div>
          <p className="mb-4">
            <span className="font-semibold text-primary-purple">
              Pay up front, largest lifetime savings.
            </span>{" "}
            You pay the full cost up front and own the solar system without any
            additional payments over time. As the outright owner, you may claim
            any local, state, or federal incentives.
          </p>

          <div className="flex justify-between mb-4">
            <PriceDescLists MenuPrices={MenuPricesLoan} />
          </div>

          <button
            className="flex items-center justify-center w-full py-2 text-blue-500 hover:bg-blue-50 rounded"
            onClick={() => setShowDetails(!showDetails)}
          >
            SHOW DETAILED ESTIMATES
            {showDetails ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SolarPanelFinance;
