import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  status: 'completed' | 'in-progress';
}

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const certifications: Certification[] = [
    {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAA-12345',
      verifyUrl: 'https://www.credly.com/badges/aws-solutions-architect',
      status: 'completed',
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2023',
      credentialId: 'CKA-12345',
      verifyUrl: 'https://www.cncf.io/certification/cka/',
      status: 'completed',
    },
    {
      name: 'HashiCorp Certified: Terraform Associate',
      issuer: 'HashiCorp',
      date: '2022',
      credentialId: 'TF-12345',
      verifyUrl: 'https://www.hashicorp.com/certification/terraform-associate',
      status: 'completed',
    },
    {
      name: 'Microsoft Certified: Azure Administrator',
      issuer: 'Microsoft',
      date: '2022',
      credentialId: 'AZ-104-12345',
      verifyUrl: 'https://learn.microsoft.com/en-us/certifications/azure-administrator/',
      status: 'completed',
    },
    {
      name: 'Docker Certified Associate',
      issuer: 'Docker',
      date: '2022',
      credentialId: 'DCA-12345',
      verifyUrl: 'https://www.docker.com/certification/',
      status: 'completed',
    },
    {
      name: 'AWS Certified DevOps Engineer - Professional',
      issuer: 'Amazon Web Services',
      date: 'Expected 2024',
      status: 'in-progress',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.cert-heading',
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

      // Certification cards animation
      gsap.fromTo(
        '.cert-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cert-grid',
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
      id="certifications"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#00d4ff]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="cert-heading text-section text-white mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="cert-heading text-[#8a94a6] max-w-2xl mx-auto">
            Professional certifications that validate my expertise in cloud technologies, 
            DevOps practices, and infrastructure management.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="cert-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`cert-card group relative ${
                cert.status === 'in-progress' ? 'opacity-70' : ''
              }`}
            >
              <div className="glass rounded-xl p-6 h-full hover:border-[#00d4ff]/30 transition-all duration-300 hover:-translate-y-1">
                {/* Status Badge */}
                {cert.status === 'in-progress' && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
                    In Progress
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cert.status === 'completed' ? (
                    <Award className="w-7 h-7 text-[#00d4ff]" />
                  ) : (
                    <CheckCircle className="w-7 h-7 text-amber-400" />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {cert.name}
                </h3>
                <p className="text-[#8a94a6] text-sm mb-1">{cert.issuer}</p>
                <p className="text-[#00d4ff] text-sm mb-3">{cert.date}</p>

                {cert.credentialId && (
                  <p className="text-[#5a6478] text-xs mb-4">
                    ID: {cert.credentialId}
                  </p>
                )}

                {/* Verify Link */}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#00d4ff] hover:text-white transition-colors group/link"
                  >
                    Verify Credential
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#00d4ff]">
              {certifications.filter((c) => c.status === 'completed').length}
            </p>
            <p className="text-[#8a94a6] text-sm mt-1">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-400">
              {certifications.filter((c) => c.status === 'in-progress').length}
            </p>
            <p className="text-[#8a94a6] text-sm mt-1">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{certifications.length}</p>
            <p className="text-[#8a94a6] text-sm mt-1">Total</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
