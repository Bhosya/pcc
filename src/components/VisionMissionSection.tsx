
import React, { useEffect, useState } from 'react';

const missionData = [
  {
    title: "Pengembangan Keterampilan",
    description: "Memberikan pelatihan dan workshop bagi anggota untuk meningkatkan keterampilan teknis di bidang teknologi informasi."
  },
  {
    title: "Kolaborasi Proyek",
    description: "Mendorong kerjasama antar anggota dalam pengembangan proyek inovatif yang bermanfaat bagi kampus dan masyarakat."
  },
  {
    title: "Kompetisi Teknologi",
    description: "Memfasilitasi anggota untuk berpartisipasi dalam berbagai kompetisi teknologi tingkat regional maupun nasional."
  },
  {
    title: "Jaringan Profesional",
    description: "Membangun koneksi dengan industri teknologi dan alumni untuk memperluas peluang karir anggota."
  },
  {
    title: "Kontribusi Sosial",
    description: "Menggunakan keahlian teknologi untuk memberikan dampak positif pada masyarakat melalui program pengabdian."
  }
];

const VisionMissionSection = () => {
  const [activeTab, setActiveTab] = useState(0);

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
    <section id="vision" className="py-20 relative bg-gradient-to-b from-darkBlue to-darkBlue/90">
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sora mb-4 text-white reveal">
            Visi & <span className="text-neonBlue">Misi</span>
          </h2>
          <div className="w-20 h-1 bg-neonBlue mx-auto mb-8 reveal" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Vision Card */}
          <div className="glassmorphism rounded-lg p-6 h-full reveal hover-card" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-neonBlue/20 flex items-center justify-center mr-4">
                <div className="w-8 h-8 rounded-md bg-neonBlue flex items-center justify-center text-white">
                  V
                </div>
              </div>
              <h3 className="text-2xl font-sora font-semibold text-white">Visi</h3>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-to-br from-darkBlue/40 to-transparent border border-neonBlue/20">
              <p className="text-white/80 leading-relaxed text-lg mb-4">
                Menjadi komunitas teknologi informasi unggulan yang
              </p>
              <p className="text-neonBlue font-sora font-medium text-xl mb-4">
                "Membentuk generasi inovatif dan terampil di bidang teknologi informasi yang mampu bersaing di era digital global"
              </p>
              <p className="text-white/60 text-sm italic">
                Melalui kolaborasi, pembelajaran, dan pengembangan berkelanjutan.
              </p>
            </div>
          </div>
          
          {/* Mission Card */}
          <div className="glassmorphism rounded-lg p-6 h-full reveal hover-card" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-electricPurple/20 flex items-center justify-center mr-4">
                <div className="w-8 h-8 rounded-md bg-electricPurple flex items-center justify-center text-white">
                  M
                </div>
              </div>
              <h3 className="text-2xl font-sora font-semibold text-white">Misi</h3>
            </div>
            
            {/* Mission tabs */}
            <div className="overflow-x-auto">
              <div className="flex mb-4">
                {missionData.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 whitespace-nowrap transition-all duration-200 ${
                      activeTab === index 
                        ? 'text-white border-b-2 border-electricPurple'
                        : 'text-white/50 hover:text-white/70'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mission content */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-darkBlue/40 to-transparent border border-electricPurple/20 min-h-[180px]">
              <h4 className="text-xl font-sora font-medium text-electricPurple mb-3">
                {missionData[activeTab].title}
              </h4>
              <p className="text-white/80 leading-relaxed">
                {missionData[activeTab].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
