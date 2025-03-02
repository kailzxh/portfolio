import React from 'react';
import { useSkills } from '../context/SkillsContext';

const SkillsSection: React.FC = () => {
  const { skills } = useSkills();

  return (
    <section className="skills">
      <div className="container">
        <h2 className="h2" id="skills">My Toolkit</h2>
        <div className="skills-imgs">
          {skills.map(skill => (
            <img 
              key={skill.id}
              src={skill.imageUrl} 
              alt={skill.name} 
              className="skills-img" 
              loading="lazy" 
              title={skill.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;