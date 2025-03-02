import React, { useEffect, useRef } from 'react';
import { useProjects } from '../context/ProjectsContext';

const WorkSection: React.FC = () => {
  const { projects } = useProjects();
  const workRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const workEl = entry.target as HTMLDivElement;
            const textbox = workEl.querySelector('.work-textbox');
            const picture = workEl.querySelector('.work-img');
            
            if (picture) {
              picture.classList.remove('transform');
            }
            
            if (textbox) {
              Array.from(textbox.children).forEach(
                (el) => ((el as HTMLElement).style.animationPlayState = 'running')
              );
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    workRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      workRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projects]);

  return (
    <section className="work">
      <div className="container">
        <h2 className="h2" id="work">My Work</h2>
        <div className="work-boxes">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="work-box"
              ref={el => workRefs.current[index] = el}
            >
              <div className="work-textbox">
                <h3 className="h3">{project.title}</h3>
                <p className="work-text">{project.description}</p>
                <ol className="work-technologies">
                  {project.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ol>

                <div className="work-links">
                  <a href={project.projectLink} target="_blank" rel="noopener" className="link">
                    Explore this project
                  </a>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener"
                    title="Source code"
                  >
                    <img
                      src="/assets/images/social-links/github.svg"
                      alt="GitHub"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>

              <picture className="work-img transform">
                {project.imageUrl && (
                  <img
                    loading="lazy"
                    src={project.imageUrl}
                    alt={project.title}
                  />
                )}
              </picture>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;