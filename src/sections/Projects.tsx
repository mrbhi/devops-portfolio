import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'E-Commerce Microservices Platform',
      description: 'Scalable e-commerce platform built with microservices architecture, Kubernetes orchestration, and automated CI/CD pipelines. Features include auto-scaling, service mesh, and distributed tracing.',
      image: '/project1.jpg',
      technologies: ['Kubernetes', 'Docker', 'Jenkins', 'AWS', 'Istio', 'Prometheus'],
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/mrbhi/ecommerce-microservices',
      featured: true,
    },
    {
      title: 'Infrastructure Monitoring Dashboard',
      description: 'Real-time monitoring solution with custom dashboards, alerting, and log aggregation for cloud infrastructure. Supports multi-cloud environments with unified visibility.',
      image: '/project2.jpg',
      technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Alertmanager', 'Thanos'],
      liveUrl: 'https://monitoring.example.com',
      githubUrl: 'https://github.com/mrbhi/monitoring-stack',
      featured: true,
    },
    {
      title: 'Cloud Cost Optimization Tool',
      description: 'Automated tool for analyzing and optimizing cloud resource usage across AWS, Azure, and GCP. Implemented automated resource scheduling and rightsizing recommendations.',
      image: '/project3.jpg',
      technologies: ['Python', 'AWS Lambda', 'Terraform', 'Cost Explorer API', 'Slack API'],
      githubUrl: 'https://github.com/mrbhi/cost-optimizer',
      featured: false,
    },
    {
      title: 'GitOps Deployment Platform',
      description: 'End-to-end GitOps platform using ArgoCD for declarative continuous delivery. Enables teams to deploy applications with pull-based automation and drift detection.',
      image: '/project1.jpg',
      technologies: ['ArgoCD', 'Kubernetes', 'Helm', 'GitHub Actions', 'Jsonnet'],
      githubUrl: 'https://github.com/mrbhi/gitops-platform',
      featured: false,
    },
    {
      title: 'Security Scanning Pipeline',
      description: 'Integrated security scanning into CI/CD pipelines with vulnerability detection, SAST/DAST analysis, and compliance reporting for container images and infrastructure.',
      image: '/project2.jpg',
      technologies: ['Trivy', 'SonarQube', 'OWASP ZAP', 'Snyk', 'Jenkins'],
      githubUrl: 'https://github.com/mrbhi/security-pipeline',
      featured: false,
    },
    {
      title: 'Multi-Environment Terraform Modules',
      description: 'Reusable Terraform modules for provisioning production-ready infrastructure across multiple environments with best practices for security, monitoring, and cost optimization.',
      image: '/project3.jpg',
      technologies: ['Terraform', 'AWS', 'Azure', 'Terragrunt', 'Checkov'],
      githubUrl: 'https://github.com/mrbhi/terraform-modules',
      featured: false,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.projects-heading',
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

      // Project cards animation
      gsap.fromTo(
        '.project-card-wrapper',
        { y: 50, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-container',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00d4ff]/3 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="projects-heading text-section text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects-heading text-[#8a94a6] max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in DevOps, cloud infrastructure, 
            and automation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card-wrapper ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ perspective: '1000px' }}
            >
              <div className="project-card group h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04080f] via-transparent to-transparent" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#00d4ff] text-[#04080f] text-xs font-bold rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#00d4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#8a94a6] text-sm mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-[#00d4ff]/10 text-[#00d4ff] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-[#00d4ff]/10 text-[#00d4ff] rounded">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#04080f] text-sm font-medium rounded-lg hover:bg-[#00d4ff]/90 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 glass text-[#b8c0cc] text-sm font-medium rounded-lg hover:text-white hover:border-[#00d4ff]/30 transition-all"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/mrbhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass text-[#b8c0cc] rounded-lg hover:text-white hover:border-[#00d4ff]/30 transition-all group"
          >
            View All Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
