"use client";

import FireIcon from "@/components/icons/FireIcon";
import VideoWithFallback from "@/components/VideoWithFallback";
import { motion } from "motion/react";

const nextLevelData = [
  {
    title: "AI-Powered Interview",
    description:
      "AI conducts and evaluates interviews in real-time, eliminating scheduling delays and ensuring structured, unbiased hiring.",
    image: "/next-level/next_1.png",
    video: "/next-level/next_1 (1).mp4",
  },
  {
    title: "Bias-Free Candidate Evaluations",
    description:
      "Standardized AI assessments remove human bias, focusing only on skills and potential—leading to fairer hiring decisions.",
    image: "/next-level/next_2.png",
    video: "/next-level/next_2.mp4",
  },
  {
    title: "Real-Time Skills Analysis",
    description:
      "AI analyzes both technical and soft skills instantly, using speech recognition and live coding tests to identify top talent.",
    image: "/next-level/next_3_new.png",
    video: "/next-level/next_3.mp4",
  },
  {
    title: "Automated ATS System",
    description:
      "Track, manage, and organize candidates effortlessly with an AI-powered Applicant Tracking System that keeps your hiring process streamlined.",
    image: "/next-level/next_4.png",
    video: "/next-level/next_4.mp4",
  },
];

export default function NextLevel() {
  return (
    <div className="hire_smarter next_level relative" id="features">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent" />

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Content Wrapper */}
        <div className="relative py-12 lg:py-24 px-8 lg:px-14">
          {/* Box Vertical Borders */}
          <div className="absolute top-0 left-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

          {/* Corner Circles */}
          <span className="absolute w-[18px] h-[18px] bg-white border border-zinc-200 rounded-full z-3 -top-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-white border border-zinc-200 rounded-full z-3 -top-[9px] -right-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -right-[9px]" />

          <div className="text-center mb-10 lg:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center justify-center bg-white px-[15px] py-[8px] rounded-full border border-border-light text-custom text-base font-normal"
            >
              <span className="mr-2 flex items-center justify-center">
                <FireIcon />
              </span>
              Features
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-custom text-2xl lg:text-[50px] font-normal leading-tight font-lexend max-w-[90%] mx-auto"
            >
              Next-Level Hiring, Powered by{" "}
              <span className="text-primary">AI</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-custom text-sm lg:text-base xl:text-xl opacity-70 font-medium max-w-[700px] mx-auto"
            >
              <p>
                Say goodbye to slow, manual hiring. With AI-powered interview
                automation, real-time skill analysis, and bias-free evaluations,
                you can make data-driven hiring decisions instantly, without
                wasting time.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {nextLevelData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl border border-zinc-200 h-full overflow-hidden flex flex-col"
              >
                <div className="p-6 mx-2 pb-1 grow">
                  <h3 className="text-custom text-2xl font-bold font-nunito mb-2">
                    {item.title}
                  </h3>
                  <p className="text-custom text-base font-medium opacity-70">
                    {item.description}
                  </p>
                </div>

                <div className="px-4 mx-2 pb-0 mt-auto flex justify-center items-end">
                  <div className="w-full">
                    <VideoWithFallback
                      src={item.video}
                      fallbackSrc={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      className="w-full h-auto object-contain rounded-[8px]"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
