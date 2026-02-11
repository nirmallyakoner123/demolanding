import StarIcon from '@/components/icons/StarIcon';

export default function WhoWeAre() {
  return (
    <div className="who_we_are relative my-0">
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
        <div className="wwa_box relative z-0 py-[80px] lg:py-[100px]">
          {/* Box Vertical Borders */}
          <div 
            className="absolute top-0 left-0 w-[2px] h-full opacity-20"
            style={{
              background: 'linear-gradient(to bottom, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-[2px] h-full opacity-20"
            style={{
              background: 'linear-gradient(to bottom, rgba(46, 46, 46, 0.00) 0%, #2E2E2E 50%, rgba(46, 46, 46, 0.00) 100%)'
            }}
          />

          {/* Corner Circles */}
          <span className="absolute w-[18px] h-[18px] bg-[#F8F8F8] border border-[#E6E6E6] rounded-full z-[3] -top-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-[#F8F8F8] border border-[#E6E6E6] rounded-full z-[3] -top-[9px] -right-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-[#F8F8F8] border border-[#E6E6E6] rounded-full z-[3] -bottom-[9px] -left-[9px]" />
          <span className="absolute w-[18px] h-[18px] bg-[#F8F8F8] border border-[#E6E6E6] rounded-full z-[3] -bottom-[9px] -right-[9px]" />

          {/* Title Pill */}
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 px-[15px] py-[8px] rounded-[120px] border border-[rgba(30,30,30,0.10)] bg-white w-max text-[rgba(30,30,30,0.80)] text-[16px] font-medium flex items-center">
            <span className="mr-[10px] flex items-center justify-center">
              <StarIcon />
            </span>
            Who we are
          </div>

          <div className="flex justify-center">
            <div className="w-full lg:w-10/12">
              <div className="text-center">
                <h2 className="text-[#1E1E1E] text-[30px] lg:text-[40px] xl:text-[50px] font-normal leading-tight max-w-[90%] lg:max-w-[706px] mx-auto">
                  We automate <span className="text-primary">80%</span> of recruitment tasks so you can <span className="text-[#757272]">hire faster, smarter, and stress-free</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
