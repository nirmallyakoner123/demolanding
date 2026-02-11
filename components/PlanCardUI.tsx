'use client';

import React from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import CheckLineIcon from '@/components/icons/CheckLineIcon';

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
  actionVariant?: 'primary' | 'secondary' | string;
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
  actionVariant = 'primary',
}) => {
  return (
    <div 
      className={`
        relative h-full bg-white rounded-[20px] border border-[rgba(30,30,30,0.08)] 
        shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 ease-in-out
        hover:shadow-[0px_8px_30px_0px_rgba(0,0,0,0.10)] hover:-translate-y-1
        ${isPopular ? 'border-2 border-[#3388FF]' : ''}
      `}
    >
      <div className="p-9 lg:p-7 sm:p-6 h-full flex flex-col">
        {/* Header Section with Title and Badge */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h5 className="text-[#1E1E1E] font-lexend text-[26px] lg:text-[22px] sm:text-[20px] font-medium leading-normal m-0">
                {title}
              </h5>
            </div>
            {isPopular && (
              <div className="flex items-center justify-center gap-1 px-3.5 py-[7px] rounded-full bg-gradient-to-r from-[rgba(51,136,255,0.12)] to-[rgba(0,160,226,0.12)] text-[#3388FF] font-nunito text-[13px] font-semibold whitespace-nowrap">
                <span className="inline-block animate-[spin_3s_linear_infinite]">
                  <PiStarFourFill />
                </span>
                <span>Most Popular</span>
              </div>
            )}
          </div>
          <p className="text-[#1E1E1E] font-nunito text-[15px] lg:text-[14px] sm:text-[13px] font-normal leading-[1.6] sm:leading-[1.5] opacity-65 mt-2.5 mb-0">
            {subtitle}
          </p>
        </div>

        {/* Price Section */}
        <div className="mb-7">
          {typeof price === 'string' ? (
             <h3 className="text-[#1E1E1E] font-lexend text-[48px] lg:text-[40px] font-semibold leading-none">
              {price}
            </h3>
          ) : (
            <>
              <h3 className="text-[#1E1E1E] font-lexend text-[48px] lg:text-[40px] font-semibold leading-none mb-0">
                ${price}
                <small className="text-[#1E1E1E] font-nunito text-[18px] lg:text-[16px] font-normal opacity-60 ml-1">
                  /{billingSuffix}
                </small>
              </h3>
              {originalPrice && (
                <div className="mt-2 text-[14px]">
                  <span className="line-through text-[#1E1E1E] opacity-50 font-normal">
                    ${originalPrice} / Year
                  </span>
                  {discount && (
                    <span className="text-[#28a745] pl-2 font-normal">
                      {discount} OFF
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="mb-7">
          <button 
            className={`
              w-full py-[15px] lg:py-[13px] sm:py-[12px] px-6 lg:px-5 sm:px-[18px] rounded-[10px] 
              font-nunito text-[16px] lg:text-[15px] sm:text-[14px] font-semibold transition-all duration-300 ease-in-out
              ${actionVariant === 'primary' 
                ? 'bg-gradient-to-t from-[#3388FF] to-[#3388FF] text-white hover:opacity-90 hover:-translate-y-[2px] border-0' 
                : 'bg-[#F1F1F1] border border-[rgba(30,30,30,0.10)] text-[#1E1E1E] hover:bg-[#E6E6E6]'
              }
            `}
            onClick={onActionClick}
          >
            {actionText}
          </button>
        </div>

        {/* Divider */}
        <hr className="my-7 border-0 border-t border-[rgba(30,30,30,0.39)]" />

        {/* Features List */}
        <div className="flex-grow">
          <ul className="list-none p-0 m-0">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-start mb-[18px] gap-[14px] last:mb-0">
                <span className="flex-shrink-0 flex items-center justify-center mt-[3px]">
                   <CheckLineIcon />
                </span>
                <span className="text-[#1E1E1E] font-nunito text-[15px] lg:text-[14px] sm:text-[13px] font-normal leading-[1.6] sm:leading-[1.5] opacity-75">
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
