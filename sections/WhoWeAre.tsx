"use client";

import StarIcon from "@/components/icons/StarIcon";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { useEffect, useRef } from "react";

export default function WhoWeAre() {
  const count = useMotionValue(40);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      animate(count, 80, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count]);

  return (
    <div className="who_we_are relative my-0">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent" />

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="wwa_box relative z-0 py-[80px] lg:py-[100px]">
          {/* Box Vertical Borders */}
          <div className="absolute top-0 left-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

          {/* Corner Circles */}
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -top-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -top-[9px] -right-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-background-white border border-zinc-200 rounded-full z-3 -bottom-[9px] -right-[9px]" />

          {/* Title Pill */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-border-light bg-white w-max text-badge text-base font-normal flex items-center">
            <span className="mr-2 flex items-center justify-center">
              <StarIcon />
            </span>
            Who we are
          </div>

          <div className="flex justify-center">
            <div className="w-full lg:w-10/12">
              <div className="text-center">
                <h2 className="text-custom text-2xl lg:text-[50px] font-normal leading-tight max-w-[90%] lg:max-w-[706px] mx-auto font-lexend">
                  We automate{" "}
                  <motion.span
                    ref={ref}
                    className="text-primary inline-block relative"
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      times: [0, 0.5, 1],
                    }}
                  >
                    <motion.span>{rounded}</motion.span>%
                  </motion.span>{" "}
                  of recruitment tasks so you can
                  <span className="block text-custom-light px-5">
                    hire faster, smarter, and stress-free
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
