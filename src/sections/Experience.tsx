import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences: ExperienceItem[] = [
    {
      title: 'DevOps Engineer',
      company: 'Tech Solutions Inc.',
      location: 'Lagos, Nigeria (Remote)',
      period: '2022 - Present',
      description: [
        'Led migration from on-premise infrastructure to AWS cloud, reducing infrastructure costs by 35% and improving scalability',
        'Implemented GitOps workflow with ArgoCD, reducing deployment time by 60% and eliminating configuration drift',
        'Built comprehensive monitoring stack with Prometheus, Grafana, and Alertmanager for 50+ microservices',
        'Designed and deployed Kubernetes clusters supporting 1000+ pods across development, staging, and production environments',
        'Established Infrastructure as Code practices using Terraform, enabling environment provisioning in under 10 minutes',
      ],
      technologies: ['AWS', 'Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus', 'GitHub Actions'],
    },
    {
      title: 'Cloud Engineer',
      company: 'Digital Innovations Ltd.',
      location: 'Abuja, Nigeria',
      period: '2021 - 2022',
      description: [
        'Managed Kubernetes clusters for 15+ microservices, ensuring 99.9% uptime and zero-downtime deployments',
        'Developed reusable Terraform modules for infrastructure provisioning, reducing deployment time by 70%',
        'Automated CI/CD pipelines using GitHub Actions, enabling 50+ daily deployments with automated testing',
        'Implemented container security scanning with Trivy and SonarQube, reducing vulnerabilities by 80%',
        'Created comprehensive documentation and runbooks for incident response and disaster recovery procedures',
      ],
      technologies: ['Azure', 'Docker', 'Terraform', 'GitHub Actions', 'Jenkins', 'Helm'],
    },
    {
      title: 'Systems Administrator',
      company: 'StartUp Hub',
      location: 'Lagos, Nigeria',
      period: '2020 - 2021',
      description: [
        'Maintained Linux servers (Ubuntu, CentOS) and network infrastructure for 20+ production servers',
        'Implemented backup and disaster recovery solutions, reducing RTO from 4 hours to 30 minutes',
        'Automated routine tasks using Bash and Python scripts, saving 15+ hours per week',
        'Configured monitoring with Nagios and Zabbix, proactively identifying and resolving issues',
        'Managed user access and security policies, ensuring compliance with industry standards',
      ],
      technologies: ['Linux', 'Bash', 'Python', 'Nagios', 'AWS', 'MySQL'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.experience-heading',
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

      // Timeline line draw animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        );
      }

      // Experience items animation
      const items = timelineRef.current?.querySelectorAll('.experience-item');
      items?.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        
        gsap.fromTo(
          item,
          { 
            x: isLeft ? -50 : 50, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Node animation
        const node = item.querySelector('.timeline-node');
        if (node) {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#00d4ff]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="experience-heading text-section text-white mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="experience-heading text-[#8a94a6] max-w-2xl mx-auto">
            My professional journey in DevOps and cloud infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-[#00d4ff] via-[#00d4ff]/50 to-transparent origin-top" />
          </div>

          {/* Experience Items */}
          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-item relative md:grid md:grid-cols-2 md:gap-8 ${
                  index !== experiences.length - 1 ? 'md:pb-16' : ''
                }`}
              >
                {/* Timeline Node - Desktop */}
                <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10">
                  <div className="timeline-node w-4 h-4 rounded-full bg-[#00d4ff] border-4 border-[#04080f] shadow-[0_0_20px_rgba(0,212,255,0.5)]" />
                </div>

                {/* Content */}
                <div
                  className={`${
                    index % 2 === 0 
                      ? 'md:pr-12 md:text-right' 
                      : 'md:col-start-2 md:pl-12'
                  }`}
                >
                  <div className="glass rounded-xl p-6 hover:border-[#00d4ff]/30 transition-all duration-300 hover:-translate-y-1">
                    {/* Header */}
                    <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-[#00d4ff]" />
                      </div>
                      <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                        <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                        <p className="text-[#00d4ff] font-medium">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className={`flex flex-wrap gap-4 mb-4 text-sm text-[#8a94a6] ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-[#b8c0cc] text-sm leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-[#00d4ff]/10 text-[#00d4ff] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
