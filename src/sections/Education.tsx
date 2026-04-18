import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string[];
  achievements?: string[];
  gpa?: string;
}

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const education: EducationItem[] = [
    {
      degree: 'Masters of Science in Computer Science',
      institution: 'University of Ibadan',
      location: 'Ibdan, Nigeria',
      period: '2022 - 2024',
      description: [
        'Specialized in machine learning, artificial intelligence, and cloud computing systems',
        'Conducted research on explainable AI for medical diagnosis and decision support systems',
        'Developed a predictive model for breast cancer detection using EfficientNet and LIME'
      ]
      // description: 'Focused on software engineering, database systems, and network administration. Graduated with honors.',
      // achievements: [
      //   'First Class Honors',
      //   'Best Graduating Student - Computer Science Department',
      //   'President, Computer Science Student Association',
      // ],
      // gpa: '4.5/5.0',
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Adekunle Ajasin University Akungba',
      location: 'Ondo, Nigeria',
      period: '2016 - 2020',
      description: [
        'Focused on software engineering, databases, algorithms, and system design',
        'Developed academic research project using WEKA for predictive analytics'
      ],
      // description: 'Focused on software engineering, database systems, and network administration.',
      // achievements: [
      //   'First Class Honors',
      //   'Best Graduating Student - Computer Science Department',
      //   'President, Computer Science Student Association',
      // ],
      // gpa: '4.5/5.0',
    },
    {
      degree: 'National Diploma in Computer Science',
      institution: 'Rufus Giwa Polytechnic, Owo',
      location: 'Ondo, Nigeria',
      period: '2013 - 2015',
      description: [
        'Studied foundational computer science including programming, networking, and systems analysis'
      ]
      // description: 'Focused on software engineering, database systems, and network administration.',
      // achievements: [
      //   'First Class Honors',
      //   'Best Graduating Student - Computer Science Department',
      //   'President, Computer Science Student Association',
      // ],
      // gpa: '4.5/5.0',
    },
  ];

  const courses = [
    {
      name: 'Google Cloud Professional Architect',
      platform: 'Coursera',
      year: '2021',
    },
    {
      name: 'AWS Cloud Practitioner Essentials',
      platform: 'AWS Training',
      year: '2021',
    },
    {
      name: 'Docker and Kubernetes: The Complete Guide',
      platform: 'Udemy',
      year: '2021',
    },
    {
      name: 'Terraform - Infrastructure as Code',
      platform: 'Pluralsight',
      year: '2022',
    },
    {
      name: 'Linux Administration Bootcamp',
      platform: 'Udemy',
      year: '2020',
    },
    {
      name: 'Python for DevOps',
      platform: 'LinkedIn Learning',
      year: '2022',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.edu-heading',
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

      // Education card animation
      gsap.fromTo(
        '.edu-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.edu-card',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Course cards animation
      gsap.fromTo(
        '.course-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.courses-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="edu-heading text-section text-white mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="edu-heading text-[#8a94a6] max-w-2xl mx-auto">
            Academic background and continuous learning through professional courses.
          </p>
        </div>

        {/* Main Education */}
        <div className="mb-16">
          {education.map((edu, index) => (
            <div key={index} className="edu-card max-w-3xl mx-auto">
              <div className="glass rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-8 h-8 text-[#00d4ff]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-[#00d4ff] text-lg mb-1">{edu.institution}</p>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#8a94a6]">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {edu.period}
                      </span>
                      <span>{edu.location}</span>
                      {edu.gpa && (
                        <span className="flex items-center gap-1 text-[#00d4ff]">
                          <Award size={14} />
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-[#b8c0cc] mb-4">{edu.description}</p>
                    )}

                    {edu.achievements && (
                      <div className="space-y-2">
                        <p className="text-sm text-[#8a94a6] font-medium">Achievements:</p>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className="flex items-center gap-2 text-sm text-[#b8c0cc]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Courses */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Professional Courses & Certifications
          </h3>
          <div className="courses-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="glass rounded-xl p-4 hover:border-[#00d4ff]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">
                        {course.name}
                      </h4>
                      <p className="text-[#8a94a6] text-xs">
                        {course.platform} • {course.year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
