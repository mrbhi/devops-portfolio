import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mrbhi', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/taofeeq-bello-b0526b207/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
    { icon: Mail, href: 'mailto:taofeeqworld01@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[#0a101b] border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="text-2xl font-bold font-['Poppins'] text-white mb-4 inline-block">
              Taofeeq<span className="text-[#00d4ff]">.</span>
            </a>
            <p className="text-[#8a94a6] mb-6 max-w-md leading-relaxed">
              DevOps Engineer & Cloud Architect passionate about building scalable infrastructure, 
              automating deployments, and bridging the gap between development and operations.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-[#b8c0cc] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#8a94a6] hover:text-[#00d4ff] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:taofeeqworld01@gmail.com"
                  className="text-[#8a94a6] hover:text-[#00d4ff] transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={14} />
                  taofeeqworld01@gmail.com
                </a>
              </li>
              <li className="text-[#8a94a6] text-sm">
                Lagos, Nigeria
              </li>
              <li>
                <span className="text-green-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Open to opportunities
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#8a94a6] text-sm flex items-center gap-1">
              © {currentYear} Taofeeq Bello. Made with{' '}
              <Heart size={14} className="text-red-400 fill-red-400" /> using React & Tailwind
            </p>
            <p className="text-[#5a6478] text-sm">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#00d4ff] text-[#04080f] flex items-center justify-center shadow-lg hover:bg-[#00d4ff]/90 transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
