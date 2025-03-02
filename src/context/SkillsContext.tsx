import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Skill {
  id: string;
  name: string;
  imageUrl: string;
}

interface SkillsContextType {
  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

const defaultSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    imageUrl: '/assets/images/skills/react.webp'
  },
  {
    id: '2',
    name: 'Flutter',
    imageUrl: '/assets/images/skills/flutter.png'
  },
  {
    id: '3',
    name: 'PostgreSQL',
    imageUrl: '/assets/images/skills/download.png'
  },
  {
    id: '4',
    name: 'Unity Engines',
    imageUrl: '/assets/images/skills/unity.png'
  },
  {
    id: '5',
    name: 'C# scripts',
    imageUrl: '/assets/images/skills/css.jpg'
  },
  {
    id: '6',
    name: 'NextJS',
    imageUrl: '/assets/images/skills/next-js.webp'
  },
  {
    id: '7',
    name: 'Dart',
    imageUrl: '/assets/images/skills/dart.png'
  },
  {
    id: '8',
    name: 'Git',
    imageUrl: '/assets/images/skills/git.webp'
  },
  {
    id: '9',
    name: 'HTML',
    imageUrl: '/assets/images/skills/html.webp'
  },
  {
    id: '10',
    name: 'JavaScript',
    imageUrl: '/assets/images/skills/js.webp'
  }
];

export const SkillsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>(() => {
    const savedSkills = localStorage.getItem('skills');
    return savedSkills ? JSON.parse(savedSkills) : defaultSkills;
  });

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = {
      ...skill,
      id: Date.now().toString()
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, updatedSkill: Partial<Skill>) => {
    setSkills(
      skills.map(skill => 
        skill.id === id ? { ...skill, ...updatedSkill } : skill
      )
    );
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <SkillsContext.Provider value={{ skills, addSkill, updateSkill, deleteSkill }}>
      {children}
    </SkillsContext.Provider>
  );
};

export const useSkills = (): SkillsContextType => {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};