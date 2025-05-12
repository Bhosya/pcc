
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: "Workshop UI/UX Design",
    date: "15 Juni 2025",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Workshop intensif tentang prinsip dan praktek desain UI/UX modern dengan studi kasus aplikasi mobile.",
    location: "Laboratorium Multimedia"
  },
  {
    id: 2,
    title: "Hackathon: Solve for Tomorrow",
    date: "22-23 Juli 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Kompetisi coding 24 jam untuk mengembangkan solusi teknologi inovatif untuk masalah sosial.",
    location: "Aula Utama Kampus"
  },
  {
    id: 3,
    title: "Seminar: Future of AI",
    date: "10 Agustus 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Diskusi mendalam tentang perkembangan terbaru kecerdasan buatan dan dampaknya pada masa depan industri.",
    location: "Auditorium Teknik"
  },
  {
    id: 4,
    title: "DevTalk: Cloud Computing",
    date: "5 September 2025",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Sesi berbagi pengetahuan tentang infrastruktur cloud dan penerapannya dalam pengembangan aplikasi modern.",
    location: "Ruang Seminar B"
  }
];

const EventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === eventsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? eventsData.length - 1 : prevIndex - 1
    );
  };

  const visibleEvents = () => {
    // For mobile, show just current
    if (window.innerWidth < 640) {
      return [eventsData[currentIndex]];
    }
    
    // For tablets, show current and next
    if (window.innerWidth < 1024) {
      const nextIndex = (currentIndex + 1) % eventsData.length;
      return [eventsData[currentIndex], eventsData[nextIndex]];
    }
    
    // For desktop, show 3 events
    const nextIndex = (currentIndex + 1) % eventsData.length;
    const nextNextIndex = (currentIndex + 2) % eventsData.length;
    return [eventsData[currentIndex], eventsData[nextIndex], eventsData[nextNextIndex]];
  };

  return (
    <section id="events" className="py-20 relative overflow-hidden bg-gradient-to-b from-darkBlue/90 to-darkBlue">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-darkBlue to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-darkBlue to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sora mb-4 text-white reveal">
            Upcoming <span className="text-neonBlue">Events</span>
          </h2>
          <div className="w-20 h-1 bg-neonBlue mx-auto mb-8 reveal" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-2xl mx-auto text-white/70 reveal" style={{ animationDelay: '0.3s' }}>
            Jangan lewatkan berbagai acara menarik yang diselenggarakan oleh PCC untuk menambah wawasan dan keterampilan Anda.
          </p>
        </div>
        
        {/* Events Slider */}
        <div className="relative max-w-6xl mx-auto reveal" style={{ animationDelay: '0.4s' }}>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%)` }}
            >
              {eventsData.map((event, index) => (
                <div 
                  key={event.id} 
                  className="px-3 w-full sm:w-1/2 lg:w-1/3 flex-shrink-0"
                >
                  <div className="h-full glassmorphism rounded-lg overflow-hidden hover-card">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-darkBlue to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <div className="bg-neonBlue/90 text-darkBlue text-sm font-semibold px-3 py-1 rounded-full inline-block">
                          {event.date}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-sora font-semibold text-white mb-2">{event.title}</h3>
                      <p className="text-white/70 mb-4 text-sm">{event.description}</p>
                      <div className="flex items-center text-neonBlue text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-darkBlue/70 hover:bg-darkBlue text-white rounded-full p-2 transition-colors"
            aria-label="Previous event"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-darkBlue/70 hover:bg-darkBlue text-white rounded-full p-2 transition-colors"
            aria-label="Next event"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8">
            {eventsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 mx-1 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-neonBlue' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12 reveal" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-transparent border border-neonBlue text-neonBlue hover:bg-neonBlue/10 transition-colors duration-300 px-6 py-3 rounded-md font-medium"
          >
            Lihat Semua Event
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
