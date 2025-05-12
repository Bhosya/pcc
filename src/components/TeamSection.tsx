
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const teamData = [
  {
    id: 1,
    name: "Aditya Prakasa",
    role: "Ketua",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Computer Science student dengan passion di bidang artificial intelligence dan cybersecurity. Memimpin PCC dengan visi menjadikan organisasi sebagai inkubator talenta teknologi terbaik.",
    socialMedia: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 2,
    name: "Putri Andini",
    role: "Wakil Ketua",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Mahasiswa Teknik Informatika dengan keahlian di bidang web development dan UI/UX design. Aktif dalam berbagai kompetisi hackathon tingkat nasional.",
    socialMedia: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 3,
    name: "Rizky Maulana",
    role: "Koordinator Divisi Programming",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Full-stack developer dengan penguasaan berbagai framework modern. Memiliki pengalaman magang di perusahaan teknologi multinasional.",
    socialMedia: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 4,
    name: "Anisa Rahmawati",
    role: "Koordinator Divisi Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Graphic designer dan UI/UX enthusiast. Memiliki passion dalam menciptakan desain yang memadukan estetika dan fungsionalitas.",
    socialMedia: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 5,
    name: "Farhan Aldiansyah",
    role: "Koordinator Divisi Networking",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Spesialis dalam bidang jaringan komputer dan cloud infrastructure. Memiliki sertifikasi CCNA dan AWS Certified Solutions Architect.",
    socialMedia: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    id: 6,
    name: "Maya Setiawati",
    role: "Koordinator Divisi Multimedia",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    bio: "Content creator dengan keahlian dalam video editing, animasi, dan digital marketing. Aktif dalam berbagai proyek multimedia kampus.",
    socialMedia: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  }
];

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  
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
    <section id="team" className="py-20 relative overflow-hidden bg-gradient-to-b from-darkBlue/95 to-darkBlue">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sora mb-4 text-white reveal">
            Meet Our <span className="text-neonBlue">Team</span>
          </h2>
          <div className="w-20 h-1 bg-neonBlue mx-auto mb-8 reveal" style={{ animationDelay: '0.2s' }}></div>
          <p className="max-w-2xl mx-auto text-white/70 reveal" style={{ animationDelay: '0.3s' }}>
            Kenali para penggerak di balik PCC yang penuh semangat dan dedikasi.
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 reveal" style={{ animationDelay: '0.4s' }}>
          {teamData.map((member, index) => (
            <div
              key={member.id}
              className="glassmorphism rounded-lg overflow-hidden hover-card cursor-pointer"
              onClick={() => setSelectedMember(member.id)}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover object-center transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-sora text-white font-medium">{member.name}</h3>
                <p className="text-neonBlue text-sm">{member.role}</p>
                
                <div className="flex items-center mt-4">
                  <div className="flex space-x-2">
                    <a href={member.socialMedia.linkedin} className="text-white/70 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href={member.socialMedia.github} className="text-white/70 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href={member.socialMedia.instagram} className="text-white/70 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                  <div className="ml-auto">
                    <span className="text-white/50 text-xs">View Profile</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Member Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-darkBlue/95 p-4 animate-fade-in">
            <div className="relative max-w-3xl w-full">
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute -top-2 -right-2 z-10 bg-neonBlue rounded-full p-2 text-darkBlue hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              
              {teamData.find(member => member.id === selectedMember) && (
                <div className="glassmorphism rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-w-1 aspect-h-1 h-full">
                        <img 
                          src={teamData.find(member => member.id === selectedMember)?.image} 
                          alt={teamData.find(member => member.id === selectedMember)?.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-sora text-white font-semibold">
                            {teamData.find(member => member.id === selectedMember)?.name}
                          </h3>
                          <p className="text-neonBlue">
                            {teamData.find(member => member.id === selectedMember)?.role}
                          </p>
                        </div>
                        
                        <div className="flex space-x-3 ml-4">
                          {teamData.find(member => member.id === selectedMember)?.socialMedia && (
                            <>
                              <a 
                                href={teamData.find(member => member.id === selectedMember)?.socialMedia.linkedin} 
                                className="text-white/70 hover:text-white transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                              </a>
                              <a 
                                href={teamData.find(member => member.id === selectedMember)?.socialMedia.github} 
                                className="text-white/70 hover:text-white transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                              <a 
                                href={teamData.find(member => member.id === selectedMember)?.socialMedia.instagram} 
                                className="text-white/70 hover:text-white transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-6">
                        {teamData.find(member => member.id === selectedMember)?.bio}
                      </p>
                      
                      <div className="p-4 rounded-md bg-darkBlue/50 border border-neonBlue/20">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-neonBlue mr-2"></div>
                          <span className="text-neonBlue font-medium">Skills</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs">Programming</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs">Leadership</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs">Design</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs">Project Management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
