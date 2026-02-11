'use client';

import React, { useState } from 'react';
import FaqIcon from '@/components/icons/FaqIcon';
import { HiChevronDown } from 'react-icons/hi2';

const faqData = [
  {
    title: 'What is Interview Screener and how does it work?',
    content: 'Interview Screener is an AI-powered hiring platform that automates resume screening and candidate interviews. It helps recruiters save time by generating custom interview questions, evaluating candidate responses, and providing ranked shortlists—all based on the job description and applicant data.'
  },
  {
    title: 'Can Interview Screener integrate with our existing hiring tools or job platforms?',
    content: "Yes, Interview Screener integrates with popular platforms like LinkedIn, Indeed, and Google Jobs. We're continually expanding integration options to make the screening process as seamless as possible."
  },
  {
    title: 'Is Interview Screener customizable for different job roles or industries?',
    content: "Absolutely. You can tailor the screening criteria and interview questions based on the specific role, required skills, and experience level. Whether you're hiring developers, marketers, or support staff, the platform adapts accordingly."
  },
  {
    title: 'What types of insights or reports will I get from the platform?',
    content: ' You’ll receive AI-generated interview summaries, candidate rankings, skill assessments, and comparison charts. These insights make it easier to identify top candidates quickly and confidently.'
  },
  {
    title: 'How much time can Interview Screener actually save my team?',
    content: 'On average, Interview Screener can reduce initial screening time by over 70%. By automating resume reviews and pre-screen interviews, your team can focus on qualified candidates instead of spending hours sorting through unqualified ones.'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative z-[2]" id="faq">
      <div className="container mx-auto px-4">
        {/* Content Wrapper */}
        <div className="relative py-10 lg:py-16">
          {/* Side Gradients */}
          <div 
            className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20"
            style={{
              background: 'linear-gradient(180deg, rgba(46, 46, 46, 0.45) 0%, rgba(46, 46, 46, 0.12) 50%, rgba(46, 46, 46, 0) 100%)'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20"
            style={{
              background: 'linear-gradient(180deg, rgba(46, 46, 46, 0.45) 0%, rgba(46, 46, 46, 0.12) 50%, rgba(46, 46, 46, 0) 100%)'
            }}
          />

          <div className="mb-12 px-4 text-center">
             <div className="mb-4 inline-flex items-center justify-center bg-white px-[25px] py-[8px] rounded-[120px] border border-[rgba(30,30,30,0.10)] text-[rgba(30,30,30,0.80)] text-[16px] font-medium w-fit mx-auto">
              <span className="mr-2 flex items-center justify-center">
                <FaqIcon />
              </span>
              FAQ
            </div>
            
            <h2 className="text-[#1E1E1E] text-[30px] font-normal leading-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="px-4">
            <div className="max-w-[780px] mx-auto my-10">
              {faqData.map((item, index) => (
                <div 
                  key={index} 
                  className="relative pb-2 mb-2 border-b-0"
                >
                  {/* Item Separator Gradient (except for last item ideally, but styles imply all have it) */}
                  <div 
                    className="absolute bottom-0 right-5 w-full h-[1px] opacity-10 pointer-events-none"
                    style={{
                       background: 'linear-gradient(90deg, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
                    }}
                  />

                  <button
                    className="w-full flex justify-between items-center py-5 px-5 text-[#1E1E1E] text-[18px] font-medium text-left bg-transparent border-0 focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{item.title}</span>
                    <HiChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`} 
                    />
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out px-0 mx-auto max-w-[780px] ${openIndex === index ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
                  >
                     <p className="text-[#1E1E1E] text-[18px] font-normal opacity-70 mb-0 px-5">
                      {item.content}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
