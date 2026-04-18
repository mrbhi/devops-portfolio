import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: string;
  level: number;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const skills: Skill[] = [
    // Cloud
    { name: 'Azure', category: 'Cloud', level: 95 },
    { name: 'GCP', category: 'Cloud', level: 85 },
    { name: 'AWS', category: 'Cloud', level: 75 },
    
    // CI/CD
    { name: 'Azure DevOps', category: 'CI/CD', level: 95 },
    { name: 'GitHub Actions', category: 'CI/CD', level: 95 },
    { name: 'Jenkins', category: 'CI/CD', level: 85 },
    { name: 'GitLab CI', category: 'CI/CD', level: 80 },
    
    
    // Containers
    { name: 'Docker', category: 'Containers', level: 95 },
    { name: 'Kubernetes', category: 'Containers', level: 90 },
    { name: 'Helm', category: 'Containers', level: 80 },
    { name: 'Containerd', category: 'Containers', level: 75 },
    
    // IaC
    { name: 'Terraform', category: 'IaC', level: 92 },
    { name: 'Ansible', category: 'IaC', level: 85 },
    { name: 'CloudFormation', category: 'IaC', level: 75 },
    { name: 'Pulumi', category: 'IaC', level: 70 },
    
    // Monitoring
    { name: 'Prometheus', category: 'Monitoring', level: 92 },
    { name: 'Grafana', category: 'Monitoring', level: 92 },
    { name: 'ELK Stack', category: 'Monitoring', level: 75 },
    { name: 'Datadog', category: 'Monitoring', level: 70 },
    
    // Scripting
    { name: 'Python', category: 'Scripting', level: 95 },
    { name: 'Bash', category: 'Scripting', level: 92 },
    { name: 'PowerShell', category: 'Scripting', level: 85 },
    { name: 'Go', category: 'Scripting', level: 70 },
    
    // Version Control
    { name: 'Git', category: 'VCS', level: 95 },
    { name: 'GitHub', category: 'VCS', level: 95 },
    { name: 'GitLab', category: 'VCS', level: 88 },
    { name: 'Bitbucket', category: 'VCS', level: 80 },
  ];

  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.skills-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Category buttons
      gsap.fromTo(
        '.category-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Skills animation
      gsap.fromTo(
        '.skill-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate when category changes
  useEffect(() => {
    gsap.fromTo(
      '.skill-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'back.out(1.4)',
      }
    );
  }, [activeCategory]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="skills-heading text-section text-white mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="skills-heading text-[#8a94a6] max-w-2xl mx-auto">
            Tools and technologies I work with to build scalable, automated, and reliable infrastructure.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#00d4ff] text-[#04080f]'
                  : 'glass text-[#b8c0cc] hover:text-white hover:border-[#00d4ff]/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="skill-card group relative"
            >
              <div className="glass rounded-xl p-4 text-center hover:border-[#00d4ff]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,212,255,0.15)]">
                <p className="text-white font-medium text-sm mb-2">{skill.name}</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#0099cc] rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-[#00d4ff] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.level}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Level Legend */}
        <div className="flex justify-center gap-8 mt-10 text-sm text-[#8a94a6]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00d4ff]" />
            <span>Expert (90%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0099cc]" />
            <span>Advanced (80-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006699]" />
            <span>Proficient (70-79%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
