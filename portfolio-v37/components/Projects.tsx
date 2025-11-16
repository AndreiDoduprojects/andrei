'use client';

interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'Financial Analytics Platform',
      description: 'Real-time investment tracking and portfolio optimization system',
      tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      year: '2024',
    },
    {
      title: 'Enterprise SaaS Application',
      description: 'Multi-tenant platform with advanced collaboration features',
      tech: ['Next.js', 'TypeScript', 'Redis', 'Docker'],
      year: '2023',
    },
    {
      title: 'E-Commerce Solution',
      description: 'High-performance platform with seamless payment integration',
      tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
      year: '2023',
    },
  ];

  return (
    <section className="relative overflow-hidden" id="work" style={{ paddingTop: 'var(--section-spacing-mobile)', paddingBottom: 'var(--section-spacing-mobile)' }}>
      {/* Responsive section spacing */}
      <style>{`
        @media (min-width: 768px) {
          #work {
            padding-top: var(--section-spacing-tablet);
            padding-bottom: var(--section-spacing-tablet);
          }
        }
        @media (min-width: 1024px) {
          #work {
            padding-top: var(--section-spacing-desktop);
            padding-bottom: var(--section-spacing-desktop);
          }
        }
      `}</style>

      <div className="container">
        <div className="max-w-5xl" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ marginBottom: 'var(--section-spacing-mobile)', textAlign: 'center' }} className="md:mb-24 lg:mb-32">
            <h2 className="text-5xl sm:text-6xl font-bold text-white" style={{ marginBottom: 'var(--spacing-lg)' }}>Selected Work</h2>
            <p className="text-xl text-gray-500">Recent projects and collaborations</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <div className="bg-white/[0.02] border border-white/[0.08] rounded-md hover:bg-white/[0.04] hover:border-white/[0.12] hover:scale-[1.01]" style={{
                  padding: 'var(--component-padding-md)',
                  transition: 'background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center'
                }}>
                  <style>{`
                    @media (min-width: 768px) {
                      .project-card-${index} {
                        padding: var(--component-padding-lg);
                      }
                    }
                    @media (min-width: 1024px) {
                      .project-card-${index} {
                        padding: calc(var(--component-padding-lg) * 1.5);
                      }
                    }
                  `}</style>
                  <div className={`flex flex-col project-card-${index}`} style={{ gap: 'var(--gap-xl)', alignItems: 'center', textAlign: 'center' }}>
                    <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)', textAlign: 'center', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)', alignItems: 'center' }}>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#0369a1] group-hover:to-[#fbbf24]" style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-600 font-mono">{project.year}</span>
                      </div>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">{project.description}</p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-sm)', justifyContent: 'center' }}>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white/[0.03] text-gray-500 rounded-md text-sm font-mono border border-white/[0.05]"
                          style={{ padding: `var(--spacing-xs) var(--spacing-md)` }}
                        >
                          {tech}
                        </span>
                      ))}
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
}
