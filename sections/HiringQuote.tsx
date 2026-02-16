import Image from "next/image";

export default function HiringQuote() {
  return (
    <div className="relative">
      {/* Bottom Gradient Line */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20 bg-linear-to-t from-[#2e2e2e]/45 via-[#2e2e2e]/12 to-transparent"
      />

      <div className="container mx-auto px-4">
        <div className="relative z-0 overflow-hidden px-0 lg:px-4">
          {/* Corner Gradient Borders */}
          <div
            className="absolute bottom-0 right-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0"
          />
          <div
            className="absolute bottom-0 left-0 w-[2px] h-full z-[-1] opacity-20 bg-linear-to-b from-[#2e2e2e]/0 via-[#2e2e2e] to-[#2e2e2e]/0"
          />

          <div className="relative overflow-hidden rounded-xl m-8 p-4 lg:p-6 z-0">
            {/* Background Gradient */}
            <div
              className="absolute inset-0 z-[-2]"
              style={{
                background:
                  "linear-gradient(90deg, #1F1F1F 0%, #161616 45%, #161616 55%, #1F1F1F 100%), #FFF",
              }}
            />

            {/* Background Image */}
            <Image
              src="/banner_grid.png"
              alt="Decorative grid background"
              fill
              className="object-cover invert opacity-100 z-[-1]"
            />

            <div className="flex justify-center">
              <div className="w-full lg:w-10/12">
                <h3 className="text-white text-2xl lg:text-3xl xl:text-4xl font-normal mb-5 max-w-[850px] mx-auto leading-normal font-lexend">
                  "Hiring should be about talent, not time wasted.{" "}
                  <span className="text-primary">
                    AI is the future of recruitment
                  </span>
                  , and we're building the technology to make hiring smarter,
                  faster, and completely{" "}
                  <span className="text-primary">bias-free</span>."
                </h3>

                <div className="flex items-center w-full max-w-[850px] mx-auto mt-6">
                  <div className="w-12 h-12 shrink-0">
                    <Image
                      src="/author.png"
                      alt="Joseph Ricard, Founder & CEO"
                      width={60}
                      height={60}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="pl-5 w-[calc(100%-50px)]">
                    <h4 className="text-white font-nunito text-lg font-semibold mb-[2px]">
                      Joseph Ricard
                    </h4>
                    <p className="text-white text-lg font-semibold opacity-70 mb-0">
                      Founder & CEO, Klizo Solutions Pvt. Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
