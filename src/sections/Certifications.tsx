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
      name: 'Microsoft Certified: Azure Solutions Architect Expert',
      issuer: 'Microsoft',
      date: '2025 - 2026',
      credentialId: 'FA52335AC70EE676',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/FA52335AC70EE676',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: DevOps Engineer Expert',
      issuer: 'Microsoft',
      date: '2024 - 2026',
      credentialId: 'C27036458BF6122C',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/C27036458BF6122C',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Cybersecurity Architect Expert',
      issuer: 'Microsoft',
      date: '2025 - 2026',
      credentialId: 'F43916D55E42BEC5',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/F43916D55E42BEC5',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Azure Security Engineer Associate',
      issuer: 'Microsoft',
      date: '2025 - 2026',
      credentialId: '7401CFA8ABFC3560',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/7401CFA8ABFC3560',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Security Operations Analyst Associate',
      issuer: 'Microsoft',
      date: '2025 - 2026',
      credentialId: '2BF65601997C8BCA',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/2BF65601997C8BCA',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Identity and Access Administrator Associate',
      issuer: 'Microsoft',
      date: '2024 - 2026',
      credentialId: 'ED44B4D13D3888AC',
      verifyUrl: 'https://learn.microsoft.com/en-us/users/taofeeqbello-4286/credentials/ed44b4d13d3888ac',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Azure Administrator Associate',
      issuer: 'Microsoft',
      date: '2024 - 2026',
      credentialId: 'FAC1BFEDB0213AF0',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/FAC1BFEDB0213AF0',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: '2025 - 2026',
      credentialId: '645C6F2ADED5366A',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/645C6F2ADED5366A',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Azure AI Engineer Associate',
      issuer: 'Microsoft',
      date: '2025 - 2026',
      credentialId: '59E76BBB5ED17AB2',
      verifyUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/taofeeqbello-4286/59E76BBB5ED17AB2',
      status: 'active',
    },
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2023',
      credentialId: '3D0D9E5F-7F05-4C90-AED9-D577969F8871',
      verifyUrl: 'https://www.credly.com/badges/3d0d9e5f-7f05-4c90-aed9-d577969f8871',
      status: 'completed',
    },
    {
      name: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      date: '2023',
      credentialId: '15337F42-23A5-4813-93E1-D4AD8680DB74',
      verifyUrl: 'https://www.credly.com/badges/15337f42-23a5-4813-93e1-d4ad8680db74',
      status: 'completed',
    },
    {
      name: 'Microsoft Certified: Azure Data Fundamentals',
      issuer: 'Microsoft',
      date: '2023',
      credentialId: '7310D996-A360-495E-AC0F-01A2C3EE92E9',
      verifyUrl: 'https://www.credly.com/badges/7310d996-a360-495e-ac0f-01a2c3ee92e9',
      status: 'completed',
    },
    {
      name: 'GitHub Actions Certification',
      issuer: 'GitHub',
      date: '2025 - 2029',
      credentialId: '676DAD7F-C741-4CA4-AB1D-8455901F5E51',
      verifyUrl: 'https://www.credly.com/badges/676dad7f-c741-4ca4-ab1d-8455901f5e51',
      status: 'active',
    },
    {
      name: 'GitHub Administration Certification',
      issuer: 'GitHub',
      date: '2025 - 2028',
      credentialId: '20AF06FC-C273-4FBC-BD47-7DC84EE3CE57',
      verifyUrl: 'https://www.credly.com/badges/20af06fc-c273-4fbc-bd47-7dc84ee3ce57',
      status: 'active',
    },
    {
      name: 'GitHub Advanced Security',
      issuer: 'GitHub',
      date: '2025 - 2028',
      credentialId: '9ADDE057-3988-4AFB-82A9-4923CDAA94C4',
      verifyUrl: 'https://www.credly.com/badges/9adde057-3988-4afb-82a9-4923cdaa94c4',
      status: 'active',
    },
    {
      name: 'GitHub Foundations',
      issuer: 'GitHub',
      date: '2025 - 2028',
      credentialId: 'F124B0EB-65FA-4BD6-9F3F-2A2D9FAC2FF2',
      verifyUrl: 'https://www.credly.com/badges/f124b0eb-65fa-4bd6-9f3f-2a2d9fac2ff2',
      status: 'active',
    },
    {
      name: 'GitHub Copilot Certification',
      issuer: 'GitHub',
      date: '2025 - 2028',
      credentialId: '80E3FA91-55F3-4E3C-B24F-E397AFA54C5B',
      verifyUrl: 'https://www.credly.com/badges/80e3fa91-55f3-4e3c-b24f-e397afa54c5b',
      status: 'active',
    },
    {
      name: 'Oracle Cloud Infrastructure AI Foundations Associate',
      issuer: 'Oracle',
      date: '2023',
      credentialId: '22B756CF8CB9C7D2BD156E98457AEF79324EB575369161CA41600E690F6FCCE2',
      verifyUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=22B756CF8CB9C7D2BD156E98457AEF79324EB575369161CA41600E690F6FCCE2',
      status: 'completed',
    },
    {
      name: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      date: '2023',
      verifyUrl: 'https://www.credly.com/badges/5a03f2a1-21b2-4869-8d8f-3119c8d49851',
      status: 'completed',
    },
    {
      name: 'Career Essentials in Generative AI',
      issuer: 'Microsoft & LinkedIn',
      date: '2023',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/bc2f9cd5155e138a88c98dc23594463e06d1315859f83f56c9f92cd4833db4bf',
      status: 'completed',
    },
    {
      name: 'Azure App Service Performance (ELX)',
      issuer: 'QA Platform',
      date: '2023',
      verifyUrl: 'https://certificates.platform.qa.com/1d520e48da8df9d3e8ac15c2672295ebcaff894f.pdf',
      status: 'completed',
    },
    {
      name: 'Copilot for Microsoft 365',
      issuer: 'QA Platform',
      date: '2023',
      verifyUrl: 'https://certificates.platform.qa.com/61f6fb898fc39f04e10eb907ccfacce889ec2ee9.pdf',
      status: 'completed',
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
