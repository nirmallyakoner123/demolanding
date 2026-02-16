"use client";

import LightningIcon from "@/components/icons/LightningIcon";
import VideoWithFallback from "@/components/VideoWithFallback";

const hireSmarterData = [
  {
    icon: "01",
    title: "Resume Filtering",
    description:
      "Instantly scan, rank, and filter resumes so your team only sees top candidates.",
    image: "/hire/hire_1.png",
    video: "/video/1st screen final.mp4",
  },
  {
    icon: "02",
    title: "Smart Screening Calls",
    description:
      "AI conducts and analyzes interviews, saving you time on unqualified candidates.",
    image: "/hire/hire_2.png",
    video: "/video/smart_screening4.mp4",
  },
  {
    icon: "03",
    title: "Skill Assessments",
    description:
      "Test candidates with AI-proctored Scoring to ensure real skills, not just good resumes.",
    image: "/Frame 2043683196.png",
    video: "", // No video available
  },
];

export default function HireSmarter() {
  return (
    <div className="hire_smarter" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Content Wrapper */}
        <div className="relative py-12 lg:py-24 px-8 lg:px-14">
          {/* Side Gradients */}
          <div className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />
          <div className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0" />

          <div className="text-center mb-10">
            <div className="mb-4 inline-flex items-center justify-center bg-white px-4 py-2 rounded-full border border-border-light text-badge text-base font-normal">
              <span className="mr-2 flex items-center justify-center">
                <LightningIcon />
              </span>
              How it works
            </div>

            <h2 className="text-custom text-2xl lg:text-[50px] font-normal leading-tight font-lexend max-w-[90%] mx-auto">
              Ditch the Busywork, <span className="text-primary">Hire</span>{" "}
              Smarter
            </h2>

            <div className="mt-4 text-custom text-sm lg:text-base xl:text-xl opacity-70 font-medium max-w-[700px] mx-auto">
              <p>
                Your hiring team should be making decisions, not drowning in
                paperwork.
              </p>
              <p>
                With AI handling screening, ranking, and assessments, you get to
                the best candidates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hireSmarterData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-zinc-200 h-full overflow-hidden flex flex-col"
              >
                <div className="p-6 pb-3">
                  <span className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-200 text-custom-light font-mono text-base font-bold tracking-[-0.32px]">
                    {item.icon}
                  </span>
                </div>

                <div className="p-6 pt-1 pb-2 grow">
                  <h3 className="text-custom text-2xl font-bold font-nunito mb-2">
                    {item.title}
                  </h3>
                  <p className="text-custom text-base font-medium opacity-70">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`mt-auto ${index === 2 ? "px-10" : "pl-6"} pt-0 pr-0`}
                >
                  <div className="w-full rounded-tl-lg overflow-hidden">
                    <VideoWithFallback
                      src={item.video}
                      fallbackSrc={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      className="w-full h-auto object-contain object-top rounded-tl-lg"
                      style={{
                        objectFit: "contain",
                        objectPosition: "top",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
