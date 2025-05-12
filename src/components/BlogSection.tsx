
import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const blogData = [
  {
    id: 1,
    title: "Mengenal Teknologi AI yang Mengubah Dunia",
    excerpt: "Perkembangan artificial intelligence dan bagaimana teknologi ini mengubah cara kita bekerja dan hidup di era digital.",
    date: "10 May 2025",
    author: "Rizky Maulana",
    image: "https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["AI", "Technology", "Future"]
  },
  {
    id: 2,
    title: "Tantangan dan Peluang Industri IT di Indonesia",
    excerpt: "Mengulas kondisi terkini industri teknologi informasi di Indonesia, serta tantangan dan peluang yang dihadapi oleh para profesional IT.",
    date: "28 Apr 2025",
    author: "Putri Andini",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Industry", "Career"]
  },
  {
    id: 3,
    title: "Tips Mengoptimalkan Portfolio untuk Fresh Graduate IT",
    excerpt: "Panduan lengkap menyusun portfolio yang menarik untuk mahasiswa IT yang baru lulus dan ingin memasuki dunia kerja.",
    date: "15 Apr 2025",
    author: "Anisa Rahmawati",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Career", "Portfolio", "Tips"]
  }
];

const BlogSection = () => {
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
    <section id="blog" className="py-20 relative overflow-hidden bg-gradient-to-b from-darkBlue to-darkBlue/90">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-circuit opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sora mb-4 text-white reveal">
            Latest <span className="text-neonBlue">Articles</span>
          </h2>
          <div className="w-20 h-1 bg-neonBlue mx-auto mb-8 reveal" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-2xl mx-auto text-white/70 reveal" style={{ animationDelay: '0.3s' }}>
            Artikel dan insights terbaru dari komunitas PCC tentang teknologi, programming, dan dunia IT.
          </p>
        </div>
        
        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogData.map((post, index) => (
            <div 
              key={post.id} 
              className="glassmorphism rounded-lg overflow-hidden hover-card reveal"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-block px-2 py-1 bg-neonBlue/10 text-neonBlue text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-sora font-semibold text-white mb-2 hover:text-neonBlue transition-colors">
                  <a href="#">{post.title}</a>
                </h3>
                
                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-white/50">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  
                  <a href="#" className="text-neonBlue hover:text-white text-sm flex items-center transition-colors">
                    Read More 
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* More Articles */}
        <div className="text-center mt-12 reveal" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#" 
            className="inline-block bg-transparent border border-neonBlue text-neonBlue hover:bg-neonBlue/10 transition-colors duration-300 px-6 py-3 rounded-md font-medium"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
