import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Twitter, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name animation - character by character
      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'expo.out',
            delay: 0.3,
          }
        );
      }

      // Title typewriter effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power2.out' }
        );
      }

      // Description fade in
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.3, ease: 'power2.out' }
        );
      }

      // Social icons orbit in
      if (socialsRef.current) {
        const icons = socialsRef.current.querySelectorAll('a');
        gsap.fromTo(
          icons,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 1.5,
          }
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button');
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 1.7,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/taofeeqbello', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/taofeeqbello', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/taofeeqbello', label: 'Twitter' },
    { icon: Mail, href: 'mailto:taofeeq@mrbhi.com', label: 'Email' },
  ];

  const name = 'Taofeeq Bello';

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04080f] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Greeting */}
        <p className="text-[#00d4ff] text-lg md:text-xl mb-4 font-medium animate-fade-in">
          Hi, I'm
        </p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-hero text-white mb-6 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {name.split('').map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <span className="text-[#00d4ff] char inline-block">.</span>
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="text-2xl md:text-3xl lg:text-4xl text-[#b8c0cc] mb-6 font-['Poppins']"
        >
          DevOps Engineer <span className="text-[#00d4ff]">&</span> Cloud Architect
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base md:text-lg text-[#8a94a6] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build scalable infrastructure, automate deployments, and bridge the gap between
          development and operations. Passionate about CI/CD, Kubernetes, and cloud-native solutions.
        </p>

        {/* Social Links */}
        <div ref={socialsRef} className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#b8c0cc] hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-[#00d4ff] hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;
