import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  projectLink: string;
  githubLink: string;
  imageUrl: string;
}

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Zombie FPS',
    description: 'Players must survive waves of undead creatures while strategically managing their resources and exploring eerie environments.',
    technologies: ['Unity Engines', 'C#'],
    projectLink: 'https://github.com/kailzxh/Zombie-FPS-game-using-unityengine',
    githubLink: 'https://github.com/kailzxh/Zombie-FPS-game-using-unityengine',
    imageUrl: '/assets/images/work/Zombie FPS.png'
  },
  {
    id: '2',
    title: 'Sri balaji packers and movers',
    description: 'Website for packers and movers.',
    technologies: ['HTML, CSS, Js', 'Node.js', 'PostgreSql'],
    projectLink: 'https://kailzxh.github.io/sribalajipackers/',
    githubLink: 'https://github.com/kailzxh/sribalajipackers',
    imageUrl: '/assets/images/work/sri balaji packers and movers.png'
  },
  {
    id: '3',
    title: 'Flutter application',
    description: 'not yet finished',
    technologies: ['flutter', 'dart', 'android studio'],
    projectLink: '#',
    githubLink: '#',
    imageUrl: ''
  }
];

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(
      projects.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};