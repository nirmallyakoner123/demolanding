"use client";

import React from "react";
import { PiStarFourFill } from "react-icons/pi";
import CheckLineIcon from "@/components/icons/CheckLineIcon";

interface PlanCardUIProps {
  title: string;
  subtitle: string;
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  price: number | string;
  originalPrice?: number;
  discount?: string;
  billingSuffix?: string;
  features?: string[];
  actionText: string;
  onActionClick: () => void;
  actionVariant?: "primary" | "secondary" | string;
}

const PlanCardUI: React.FC<PlanCardUIProps> = ({
  title,
  subtitle,
  isPopular,
  isCurrentPlan,
  price,
  originalPrice,
  discount,
  billingSuffix,
  features = [],
  actionText,
  onActionClick,
  actionVariant = "primary",
}) => {
  return (
    <div
      className={`
        relative h-full bg-white rounded-2xl 
        shadow-md overflow-hidden transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1
        ${isPopular ? "border-2 border-primary" : "border border-zinc-200"}
      `}
    >
      <div className="p-5 h-full flex flex-col">
        {/* Header Section with Title and Badge */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h5 className="text-custom font-lexend text-lg lg:text-xl xl:text-2xl font-medium leading-normal m-0">
                {title}
              </h5>
            </div>
            {isPopular && (
              <div className="flex items-center justify-center gap-1 px-2 py-2 rounded-full bg-linear-to-r from-[rgba(51,136,255,0.12)] to-[rgba(0,160,226,0.12)] text-primary font-nunito text-xs font-semibold whitespace-nowrap">
                <span className="inline-block animate-[spin_3s_linear_infinite]">
                  <PiStarFourFill />
                </span>
                <span>Most Popular</span>
              </div>
            )}
          </div>
          <p className="text-custom font-nunito text-xs lg:text-sm sm:text-base font-normal leading-[1.6] sm:leading-normal opacity-65 mt-2.5 mb-0">
            {subtitle}
          </p>
        </div>

        {/* Price Section */}
        <div className="mb-5">
          {typeof price === "string" ? (
            <h3 className="text-custom font-lexend text-4xl xl:text-5xl font-semibold leading-none mb-0">
              {price}
            </h3>
          ) : (
            <>
              <h3 className="text-custom font-lexend text-4xl xl:text-5xl font-semibold leading-none mb-0">
                ${price}
                <small className="text-custom font-nunito text-sm lg:text-base font-normal opacity-60 ml-1">
                  /{billingSuffix}
                </small>
              </h3>
              {originalPrice && (
                <div className="mt-2 text-xs lg:text-sm">
                  <span className="line-through text-custom opacity-50 font-normal">
                    ${originalPrice} / Year
                  </span>
                  {discount && (
                    <span className="text-success pl-2 font-normal">
                      {discount} OFF
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="mb-2">
          <button
            className={`
              w-full py-2 xl:py-2.5 px-6 lg:px-3 xl:px-4 rounded-lg
              font-nunito text-base font-semibold transition-all duration-300 ease-in-out cursor-pointer
              ${
                actionVariant === "primary"
                  ? "bg-linear-to-t from-primary to-primary text-white hover:opacity-90 hover:-translate-y-[2px] border-0"
                  : "bg-background border border-zinc-200 text-custom hover:bg-zinc-200"
              }
            `}
            onClick={onActionClick}
          >
            {actionText}
          </button>
        </div>

        {/* Divider */}
        <hr className="my-4 border-0 border-t border-zinc-200" />

        {/* Features List */}
        <div className="grow">
          <ul className="list-none p-0 m-0">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start mb-3 gap-2 last:mb-0">
                <span className="shrink-0 flex items-center justify-center mt-1">
                  <CheckLineIcon />
                </span>
                <span className="text-custom font-nunito text-xs lg:text-sm font-normal leading-[1.6] opacity-75">
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCardUI;
