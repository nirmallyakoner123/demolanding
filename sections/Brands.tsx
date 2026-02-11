'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Brands() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const brands = [
    {
      name: 'Klizo',
      image: '/brands/Klizo Logo.png',
      width: 97,
      height: 30
    },
    {
      name: 'Ehave',
      image: '/brands/Ehave Logo.png',
      width: 92,
      height: 30
    },
    {
      name: 'AI Headhunter',
      image: '/brands/Headhunter.png',
      width: 110,
      height: 40
    },
  ];

  return (
    <div className="brands relative" id="who_we_are">
      <div className="container mx-auto px-4">
        {/* Brand Box with Gradient Borders */}
        <div className="relative py-[50px] lg:py-[100px]">
          {/* Left Gradient Border */}
          <div 
            className="absolute top-0 left-0 w-[2px] h-full z-[-1] opacity-20"
            style={{
              background: 'linear-gradient(to top, rgba(46, 46, 46, 0.45) 0%, rgba(46, 46, 46, 0.12) 50%, rgba(46, 46, 46, 0) 100%)'
            }}
          />
          
          {/* Right Gradient Border */}
          <div 
            className="absolute top-0 right-0 w-[2px] h-full z-[-1] opacity-20"
            style={{
              background: 'linear-gradient(to top, rgba(46, 46, 46, 0.45) 0%, rgba(46, 46, 46, 0.12) 50%, rgba(46, 46, 46, 0) 100%)'
            }}
          />

          <div className="max-w-[1100px] mx-auto">
            <Slider {...settings}>
              {brands.map((brand, index) => (
                <div key={index} className="outline-none">
                  <div className="flex items-center justify-center p-2.5 h-[100px] sm:h-[80px]">
                    <div className="relative h-[30px] w-auto max-w-[125px]">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={brand.width}
                        height={brand.height}
                        style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
