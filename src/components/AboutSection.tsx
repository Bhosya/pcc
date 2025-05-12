
import React, { useEffect, useState } from 'react';

const timelineData = [
  {
    year: '2010',
    title: 'Pendirian PCC',
    description: 'Polytechnic Computer Club didirikan sebagai wadah bagi mahasiswa untuk mengembangkan keterampilan di bidang teknologi informasi.',
    icon: '💻'
  },
  {
    year: '2015',
    title: 'Perluasan Program',
    description: 'PCC berkembang dengan menambahkan berbagai divisi seperti programming, networking, dan desain grafis.',
    icon: '🚀'
  },
  {
    year: '2018',
    title: 'Prestasi Nasional',
    description: 'Anggota PCC mulai meraih berbagai prestasi di kompetisi tingkat nasional di bidang IT dan programming.',
    icon: '🏆'
  },
  {
    year: '2022',
    title: 'Era Digital',
    description: 'Adaptasi terhadap teknologi terbaru dengan fokus pada AI, cloud computing, dan pengembangan aplikasi mobile.',
    icon: '📱'
  },
  {
    year: '2025',
    title: 'Visi Baru',
    description: 'Memperluas jangkauan dan kolaborasi dengan industri teknologi untuk membuka peluang bagi anggota PCC.',
    icon: '🔮'
  }
];

const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1 });
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-darkBlue">
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sora mb-4 text-white reveal">
            Tentang <span className="text-neonBlue">PCC</span>
          </h2>
          <div className="w-20 h-1 bg-neonBlue mx-auto mb-8 reveal" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-2xl mx-auto text-white/70 reveal" style={{ animationDelay: '0.3s' }}>
            Perjalanan kami dalam membangun komunitas teknologi dan mengembangkan bakat-bakat muda di bidang komputer.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Timeline header - horizontal scrolling on mobile */}
          <div className="flex overflow-x-auto pb-4 mb-10 reveal" style={{ animationDelay: '0.4s' }}>
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 mx-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-neonBlue text-darkBlue font-medium' 
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
          
          {/* Timeline content */}
          <div className="bg-white/5 glassmorphism rounded-lg p-8 transition-all duration-500 reveal hover-card" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-16 h-16 bg-darkBlue border-2 border-neonBlue rounded-full flex items-center justify-center text-3xl mr-4">
                {timelineData[activeIndex].icon}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-sora font-bold text-neonBlue">
                  {timelineData[activeIndex].title}
                </h3>
                <p className="text-white/70 text-sm">
                  {timelineData[activeIndex].year}
                </p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              {timelineData[activeIndex].description}
            </p>
          </div>
          
          {/* Timeline navigation */}
          <div className="flex justify-between mt-8 reveal" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className={`px-4 py-2 rounded-md ${
                activeIndex === 0 
                  ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-white/20 transition-colors'
              }`}
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setActiveIndex(prev => Math.min(timelineData.length - 1, prev + 1))}
              disabled={activeIndex === timelineData.length - 1}
              className={`px-4 py-2 rounded-md ${
                activeIndex === timelineData.length - 1 
                  ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-white/20 transition-colors'
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
