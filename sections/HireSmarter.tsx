'use client';

import LightningIcon from '@/components/icons/LightningIcon';
import VideoWithFallback from '@/components/VideoWithFallback';

const hireSmarterData = [
  {
    icon: '01',
    title: 'Resume Filtering',
    description: 'Instantly scan, rank, and filter resumes so your team only sees top candidates.',
    image: '/hire/hire_1.png',
    video: '/video/1st screen final.mp4'
  },
  {
    icon: '02',
    title: 'Smart Screening Calls',
    description: 'AI conducts and analyzes interviews, saving you time on unqualified candidates.',
    image: '/hire/hire_2.png',
    video: '/video/smart_screening4.mp4'
  },
  {
    icon: '03',
    title: 'Skill Assessments',
    description: 'Test candidates with AI-proctored Scoring to ensure real skills, not just good resumes.',
    image: '/Frame 2043683196.png',
    video: '' // No video available
  }
];

export default function HireSmarter() {
  return (
    <div className="hire_smarter" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Content Wrapper */}
        <div className="relative py-[50px] px-[30px] sm:py-[100px] sm:px-[60px]">
          {/* Side Gradients */}
          <div 
            className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20"
            style={{
              background: 'linear-gradient(270deg, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20"
            style={{
              background: 'linear-gradient(270deg, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
            }}
          />

          <div className="text-center mb-10 lg:mb-12">
            <div className="mb-4 inline-flex items-center justify-center bg-white px-[15px] py-[8px] rounded-[120px] border border-[rgba(30,30,30,0.10)] text-[rgba(30,30,30,0.80)] text-[16px] font-medium">
              <span className="mr-2 flex items-center justify-center">
                <LightningIcon />
              </span>
              How it works
            </div>
            
            <h2 className="text-[#1E1E1E] text-[30px] lg:text-[40px] xl:text-[50px] font-normal leading-tight font-lexend max-w-[90%] mx-auto">
              Ditch the Busywork, <span className="text-primary">Hire</span> Smarter
            </h2>
            
            <div className="mt-4 text-[#1E1E1E] text-[14px] lg:text-[16px] xl:text-[19px] opacity-70 font-medium max-w-[700px] mx-auto">
              <p>Your hiring team should be making decisions, not drowning in paperwork.</p>
              <p>With AI handling screening, ranking, and assessments, you get to the best candidates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hireSmarterData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-[#E9E9E9] h-full overflow-hidden flex flex-col"
              >
                <div className="p-6 pb-3">
                  <span className="w-[40px] h-[38px] flex items-center justify-center rounded-[6px] bg-[#E5E7EB] text-[rgba(30,30,30,0.50)] font-mono text-[16px] font-bold tracking-[-0.32px]">
                    {item.icon}
                  </span>
                </div>
                
                <div className="p-6 pt-1 pb-2 flex-grow">
                  <h3 className="text-[#1E1E1E] text-[22px] font-bold font-nunito mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-[18px] font-medium opacity-70">
                    {item.description}
                  </p>
                </div>
                
                <div className={`mt-auto ${index === 2 ? 'px-0' : 'pl-6'} pt-0 pr-0`}>
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
                        objectFit: 'contain',
                        objectPosition: 'top'
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
