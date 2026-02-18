"use client";

import { useState } from "react";
import FaqIcon from "@/components/icons/FaqIcon";
import { HiChevronDown } from "react-icons/hi2";
import { motion, AnimatePresence } from "motion/react";

const faqData = [
  {
    title: "What is Interview Screener and how does it work?",
    content:
      "Interview Screener is an AI-powered hiring platform that automates resume screening and candidate interviews. It helps recruiters save time by generating custom interview questions, evaluating candidate responses, and providing ranked shortlists—all based on the job description and applicant data.",
  },
  {
    title:
      "Can Interview Screener integrate with our existing hiring tools or job platforms?",
    content:
      "Yes, Interview Screener integrates with popular platforms like LinkedIn, Indeed, and Google Jobs. We're continually expanding integration options to make the screening process as seamless as possible.",
  },
  {
    title:
      "Is Interview Screener customizable for different job roles or industries?",
    content:
      "Absolutely. You can tailor the screening criteria and interview questions based on the specific role, required skills, and experience level. Whether you're hiring developers, marketers, or support staff, the platform adapts accordingly.",
  },
  {
    title: "What types of insights or reports will I get from the platform?",
    content:
      " You’ll receive AI-generated interview summaries, candidate rankings, skill assessments, and comparison charts. These insights make it easier to identify top candidates quickly and confidently.",
  },
  {
    title: "How much time can Interview Screener actually save my team?",
    content:
      "On average, Interview Screener can reduce initial screening time by over 70%. By automating resume reviews and pre-screen interviews, your team can focus on qualified candidates instead of spending hours sorting through unqualified ones.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative z-2" id="faq">
      <div className="container mx-auto px-4">
        {/* Content Wrapper */}
        <div className="relative py-12 lg:py-24">
          {/* Side Gradients */}
          <div className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

          <div className="mb-12 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center justify-center bg-white px-4 py-2 rounded-full border border-border-light text-badge text-base font-normal w-fit mx-auto"
            >
              <span className="mr-2 flex items-center justify-center">
                <FaqIcon />
              </span>
              FAQ
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-custom text-3xl font-normal leading-tight max-w-[90%] lg:max-w-[706px] mx-auto font-lexend"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto my-10"
            >
              {faqData.map((item, index) => (
                <div key={index} className="relative pb-2 mb-2 border-b-0">
                  {/* Item Separator Gradient */}
                  <div className="absolute bottom-0 right-5 w-full h-px opacity-10 pointer-events-none bg-linear-to-r from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

                  <button
                    className="w-full cursor-pointer flex justify-between items-center py-5 px-5 text-custom text-lg font-semibold text-left bg-transparent border-0 focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{item.title}</span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-center justify-center text-zinc-400"
                    >
                      <HiChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden px-0 mx-auto max-w-[780px]"
                      >
                        <p className="text-custom text-[18px] font-normal opacity-70 mb-0 pb-5 px-5">
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
