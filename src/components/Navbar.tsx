import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    to={href}
    className="relative px-3 py-2 text-white hover:text-neonBlue transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-neonBlue after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-darkBlue/90 shadow-lg shadow-neonBlue/10 glassmorphism py-3"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-10 w-10 bg-neonBlue rounded-full flex items-center justify-center mr-3 animate-pulse-glow">
            <span className="text-darkBlue font-bold">P</span>
          </div>
          <span className="font-sora font-bold text-xl">
            <span className="text-white">PCC</span>
            <span className="text-neonBlue">.</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#vision">Vision & Mission</NavLink>
          <NavLink href="/#events">Events</NavLink>
          <NavLink href="/#gallery">Gallery</NavLink>
          <NavLink href="/#team">Team</NavLink>
          <NavLink href="/#blog">Blog</NavLink>
          <Link
            to="/#contact"
            className="ml-4 bg-neonBlue text-darkBlue px-4 py-2 rounded-md font-medium hover:bg-neonBlue/90 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-neonBlue"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-darkBlue/95 glassmorphism border-t border-neonBlue/20 p-4 flex flex-col space-y-4 animate-fade-in">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#vision">Vision & Mission</NavLink>
          <NavLink href="/#events">Events</NavLink>
          <NavLink href="/#gallery">Gallery</NavLink>
          <NavLink href="/#team">Team</NavLink>
          <NavLink href="/#blog">Blog</NavLink>
          <Link
            to="/#contact"
            className="bg-neonBlue text-darkBlue px-4 py-2 rounded-md font-medium hover:bg-neonBlue/90 transition-colors duration-300 text-center"
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
