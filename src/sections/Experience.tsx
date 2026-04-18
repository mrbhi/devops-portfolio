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
      company: 'Enbros Technologies.',
      location: 'United Kingdom (Remote)',
      period: '2025 - Present',
      description: [
        'Led migration and modernization of legacy infrastructure to Azure cloud, improving scalability, reliability, and cost efficiency',
        'Implemented CI/CD pipelines using Azure DevOps and GitHub Actions, reducing deployment time and improving release consistency',
        'Designed and managed Kubernetes workloads (AKS) for containerized applications across multiple environments',
        'Built and maintained a monitoring and observability stack using Azure Monitor, Prometheus, and Grafana for improved system visibility',
        'Established Infrastructure as Code using Terraform and Bicep, enabling fast and consistent environment provisioning',
        'Led infrastructure and DevOps support for a Sales Agent AI system deployed on Google Cloud Vertex AI, enabling scalable model deployment and API integration',
      ],
      technologies: ['Azure', 'GCP', 'Vertex AI', 'Kubernetes', 'Docker', 'Terraform', 'Azure DevOps', 'GitHub Actions', 'Prometheus', 'Grafana'],
    },
    {
      title: 'Cloud Engineer',
      company: 'Bankboks Ltd.',
      location: 'Osogbo, Osun (Remote)',
      period: '2023 - 2024',
      description: [
        'Managed containerized applications using Docker and supported orchestration with Kubernetes, ensuring high availability',
        'Developed reusable Terraform modules for infrastructure provisioning, improving deployment speed and consistency',
        'Automated CI/CD pipelines using GitHub Actions, enabling faster and more reliable deployments',
        'Implemented monitoring and logging solutions to improve system visibility and incident response',
        'Created documentation and runbooks to support operational efficiency and incident management',
      ],
      technologies: ['Azure', 'Docker', 'Terraform', 'GitHub Actions', 'Kubernetes', 'Monitoring'],
    },
    {
      title: 'Azure Support Engineer',
      company: 'Microsoft',
      location: 'Lagos, Nigeria (Remote)',
      period: '2024 - 2025',
      description: [
        'Provided Tier 1 and Tier 2 support for Azure services including Virtual Machines, App Services, AKS, and Azure Functions',
        'Diagnosed and resolved complex networking issues across Virtual Networks, DNS, and hybrid connectivity environments',
        'Supported deployment and troubleshooting of containerized applications across Azure Kubernetes Service and Container Instances',
        'Collaborated with global engineering teams to resolve escalations within SLA requirements',
        'Contributed to knowledge base articles and runbooks to improve support efficiency and resolution time',
      ],
      technologies: ['Azure', 'AKS', 'Azure Functions', 'Networking', 'Virtual Machines', 'PowerShell', 'Azure Monitor'],
    },
    {
      title: 'Microsoft Exchange Online Administrator',
      company: 'Bankboks Ltd.',
      location: 'Osogbo, Osun (Remote)',
      period: '2022 - 2022',
      description: [
        'Led onboarding and migration of enterprise users to Microsoft Exchange Online, improving setup efficiency',
        'Managed email infrastructure deployments ensuring security, compliance, and system reliability',
        'Coordinated cross-functional teams to support enterprise messaging systems and service delivery',
        'Monitored system performance and generated SLA and compliance reports for stakeholders',
        'Developed user training materials and documentation to improve adoption and reduce support requests',
      ],
      technologies: ['Microsoft 365', 'Exchange Online', 'PowerShell', 'Office 365', 'SLA Management'],
    },
    {
      title: 'Microsoft 365 Administrator',
      company: 'Focuslead Innovative Technology',
      location: 'Ibadan, Nigeria',
      period: '2021 - 2023',
      description: [
        'Managed Microsoft 365 environments including Exchange, Teams, and SharePoint services',
        'Handled user identity, access control, and security policy configuration across enterprise tenants',
        'Supported cloud migration and tenant setup for multiple client organizations',
        'Coordinated onboarding processes and ensured smooth transition to Microsoft cloud services',
        'Automated administrative tasks using PowerShell to improve operational efficiency',
      ],
      technologies: ['Microsoft 365', 'Exchange', 'SharePoint', 'Teams', 'PowerShell', 'Azure AD'],
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
