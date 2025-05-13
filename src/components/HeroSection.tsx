import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  useEffect(() => {
    // Animate elements when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 bg-circuit"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://ukmpcc.org/images/heroimage-edited.webp")',
          opacity: 0.2,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-darkBlue/10"></div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neonBlue rounded-full opacity-70 animate-float"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-electricPurple rounded-full opacity-60 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/4 w-2 h-2 bg-neonBlue rounded-full opacity-50 animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl text-neonBlue font-sora mb-4 reveal animate-slide-up">
            Selamat Datang di Website Kami!
          </h2>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-sora leading-tight mb-6 text-white reveal animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-glow">POLYTECHNIC</span> <br />
            <span className="text-glow bg-gradient-to-r from-neonBlue via-white to-electricPurple bg-clip-text text-transparent">
              COMPUTER CLUB
            </span>
          </h1>

          <h3
            className="text-xl md:text-3xl mb-8 text-white/80 font-poppins reveal animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            2025/2026
          </h3>

          <p
            className="max-w-2xl text-white/70 mb-10 reveal animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            Komunitas mahasiswa dengan semangat inovasi teknologi, kolaborasi
            dan pengembangan diri di bidang komputer dan teknologi informasi.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 reveal animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="#about"
              className="bg-neonBlue hover:bg-neonBlue/90 text-darkBlue px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
            >
              Pelajari Lebih Lanjut
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="border border-neonBlue text-neonBlue hover:bg-neonBlue/10 px-6 py-3 rounded-md font-medium transition-all duration-300"
            >
              Gabung Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-darkBlue to-transparent"></div>
    </section>
  );
};

export default HeroSection;
