import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cloud, Terminal, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content animations
      if (contentRef.current) {
        const heading = contentRef.current.querySelector('h2');
        const paragraphs = contentRef.current.querySelectorAll('p');
        const stats = contentRef.current.querySelectorAll('.stat-item');

        gsap.fromTo(
          heading,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          paragraphs,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          stats,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Code2, value: '3+', label: 'Years Experience' },
    { icon: Cloud, value: '10+', label: 'Cloud Deployments' },
    { icon: Terminal, value: '30+', label: 'CI/CD Pipelines' },
    { icon: Cpu, value: '99.9%', label: 'Uptime Achieved' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Taofeeq Bello"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080f]/60 via-transparent to-transparent" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#00d4ff]/30 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#00d4ff]/30 rounded-br-2xl" />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Cloud Expert</p>
                    <p className="text-[#8a94a6] text-sm">Azure | GCP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <h2 className="text-section text-white mb-6">
              About <span className="gradient-text">Me</span>
            </h2>

            <div className="space-y-4 text-[#b8c0cc] leading-relaxed">
              <p>
                With over <span className="text-[#00d4ff] font-semibold">3 years of experience</span> in DevOps and cloud infrastructure, 
                I specialize in building robust CI/CD pipelines, container orchestration, and infrastructure automation. 
                My journey began with a curiosity for optimizing development workflows, which evolved into a career 
                focused on bridging the gap between development and operations.
              </p>

              <p>
                I believe in <span className="text-white font-medium">Infrastructure as Code</span>, automated testing, 
                and continuous improvement. Every deployment should be predictable, every environment reproducible, 
                and every system observable. This philosophy drives me to implement solutions that are not just 
                functional, but also scalable and maintainable.
              </p>

              <p>
                When I'm not automating deployments or optimizing cloud resources, you'll find me exploring new 
                technologies, contributing to open-source projects, or sharing knowledge with the DevOps community.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item glass rounded-xl p-4 text-center hover:border-[#00d4ff]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <stat.icon className="w-6 h-6 text-[#00d4ff] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-[#8a94a6]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
