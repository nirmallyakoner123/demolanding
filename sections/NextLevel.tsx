'use client';

import FireIcon from '@/components/icons/FireIcon';
import VideoWithFallback from '@/components/VideoWithFallback';

const nextLevelData = [
  {
    title: 'AI-Powered Interview',
    description: 'AI conducts and evaluates interviews in real-time, eliminating scheduling delays and ensuring structured, unbiased hiring.',
    image: '/next-level/next_1.png',
    video: '/next-level/next_1 (1).mp4'
  },
  {
    title: 'Bias-Free Candidate Evaluations',
    description: 'Standardized AI assessments remove human bias, focusing only on skills and potential—leading to fairer hiring decisions.',
    image: '/next-level/next_2.png',
    video: '/next-level/next_2.mp4'
  },
  {
    title: 'Real-Time Skills Analysis',
    description: 'AI analyzes both technical and soft skills instantly, using speech recognition and live coding tests to identify top talent.',
    image: '/next-level/next_3_new.png',
    video: '/next-level/next_3.mp4'
  },
  {
    title: 'Automated ATS System',
    description: 'Track, manage, and organize candidates effortlessly with an AI-powered Applicant Tracking System that keeps your hiring process streamlined.',
    image: '/next-level/next_4.png',
    video: '/next-level/next_4.mp4'
  }
];

export default function NextLevel() {
  return (
    <div className="hire_smarter next_level relative" id="features">
      {/* Top Gradient Border */}
      <div 
        className="absolute top-0 left-0 w-full h-[2px] z-[-1] opacity-20"
        style={{
          background: 'linear-gradient(90deg, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
        }}
      />
      
      {/* Bottom Gradient Border */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[2px] z-[-1] opacity-20"
        style={{
          background: 'linear-gradient(90deg, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
        }}
      />

      <div className="container mx-auto px-4">
        {/* Content Wrapper */}
        <div className="relative py-[50px] px-[30px] sm:py-[100px] sm:px-[60px]">
          {/* Corner Circles */}
          <span className="absolute w-[18px] h-[18px] bg-[#F8F8F8] border border-[#E6E6E6] rounded-full z-[3] -top-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-[#F8F8F8] border border-[#E6E6E6] rounded-full z-[3] -top-[9px] -right-[9px]" />

          <div className="text-center mb-10 lg:mb-12">
            <div className="mb-4 inline-flex items-center justify-center bg-white px-[15px] py-[8px] rounded-[120px] border border-[rgba(30,30,30,0.10)] text-[rgba(30,30,30,0.80)] text-[16px] font-medium">
              <span className="mr-2 flex items-center justify-center">
                <FireIcon />
              </span>
              Features
            </div>
            
            <h2 className="text-[#1E1E1E] text-[30px] lg:text-[40px] xl:text-[50px] font-normal leading-tight font-lexend max-w-[90%] mx-auto">
              Next-Level Hiring, Powered by <span className="text-primary">AI</span>
            </h2>
            
            <div className="mt-4 text-[#1E1E1E] text-[14px] lg:text-[16px] xl:text-[19px] opacity-70 font-medium max-w-[700px] mx-auto">
              <p>Say goodbye to slow, manual hiring. With AI-powered interview automation, real-time skill analysis, and bias-free evaluations, you can make data-driven hiring decisions instantly, without wasting time.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {nextLevelData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-[#E9E9E9] h-full overflow-hidden flex flex-col"
              >
                <div className="p-6 mx-2 pb-1 flex-grow">
                  <h3 className="text-[#1E1E1E] text-[22px] font-bold font-nunito mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-[18px] font-medium opacity-70">
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
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px'
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
