
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Hackathon 2024",
    category: "Event"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Workshop Mobile Dev",
    category: "Workshop"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Team Meeting",
    category: "Team"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Collaboration Session",
    category: "Activity"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Coding Competition",
    category: "Competition"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Tech Exhibition",
    category: "Event"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

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

  // Get unique categories
  const categories = Array.from(new Set(galleryImages.map(img => img.category)));

  // Filter images
  const filteredImages = filter 
    ? galleryImages.filter(img => img.category === filter) 
    : galleryImages;

  return (
    <section id="gallery" className="py-20 relative overflow-hidden bg-gradient-to-b from-darkBlue to-darkBlue/95">
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-circuit opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sora mb-4 text-white reveal">
            Gallery <span className="text-neonBlue">PCC</span>
          </h2>
          <div className="w-20 h-1 bg-neonBlue mx-auto mb-8 reveal" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-2xl mx-auto text-white/70 reveal" style={{ animationDelay: '0.3s' }}>
            Kenangan visual dari berbagai kegiatan dan momen berkesan yang telah kami lalui bersama.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 reveal" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === null ? 'bg-neonBlue text-darkBlue' : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === category ? 'bg-neonBlue text-darkBlue' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 reveal" style={{ animationDelay: '0.5s' }}>
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-darkBlue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs text-neonBlue">{image.category}</span>
                <h3 className="text-lg text-white font-medium">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-darkBlue/95 p-4 animate-fade-in">
            <div className="relative max-w-4xl w-full">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 bg-darkBlue/70 rounded-full p-2 text-white hover:bg-neonBlue hover:text-darkBlue transition-colors"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
              
              <div className="glassmorphism rounded-lg p-2">
                {galleryImages.find(img => img.id === selectedImage) && (
                  <>
                    <img 
                      src={galleryImages.find(img => img.id === selectedImage)?.src} 
                      alt={galleryImages.find(img => img.id === selectedImage)?.title}
                      className="w-full rounded-md object-contain max-h-[80vh]"
                    />
                    <div className="p-4">
                      <h3 className="text-xl text-white font-sora">
                        {galleryImages.find(img => img.id === selectedImage)?.title}
                      </h3>
                      <p className="text-neonBlue">
                        {galleryImages.find(img => img.id === selectedImage)?.category}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* More button */}
        <div className="text-center mt-10 reveal" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#" 
            className="inline-block bg-transparent border border-neonBlue text-neonBlue hover:bg-neonBlue/10 transition-colors duration-300 px-6 py-3 rounded-md font-medium"
          >
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
