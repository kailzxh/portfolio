// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useProjects, Project } from '../context/ProjectsContext';
// import { useSkills, Skill } from '../context/SkillsContext';
// import { useTheme } from '../context/ThemeContext';
// import { ArrowLeft } from 'lucide-react';

// const AdminPage: React.FC = () => {
//   const { theme } = useTheme();
//   const { projects, addProject, updateProject, deleteProject } = useProjects();
//   const { skills, addSkill, updateSkill, deleteSkill } = useSkills();
  
//   const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');
  
//   // Project form state
//   const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
//     title: '',
//     description: '',
//     technologies: [],
//     projectLink: '',
//     githubLink: '',
//     imageUrl: ''
//   });
  
//   // Skill form state
//   const [skillForm, setSkillForm] = useState<Omit<Skill, 'id'>>({
//     name: '',
//     imageUrl: ''
//   });
  
//   // Edit states
//   const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
//   const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  
//   // Project form handlers
//   const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProjectForm(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const technologies = e.target.value.split(',').map(tech => tech.trim());
//     setProjectForm(prev => ({ ...prev, technologies }));
//   };
  
//   const handleProjectSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (editingProjectId) {
//       updateProject(editingProjectId, projectForm);
//       setEditingProjectId(null);
//     } else {
//       addProject(projectForm);
//     }
    
//     setProjectForm({
//       title: '',
//       description: '',
//       technologies: [],
//       projectLink: '',
//       githubLink: '',
//       imageUrl: ''
//     });
//   };
  
//   const handleEditProject = (project: Project) => {
//     setProjectForm({
//       title: project.title,
//       description: project.description,
//       technologies: project.technologies,
//       projectLink: project.projectLink,
//       githubLink: project.githubLink,
//       imageUrl: project.imageUrl
//     });
//     setEditingProjectId(project.id);
//   };
  
//   // Skill form handlers
//   const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSkillForm(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleSkillSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (editingSkillId) {
//       updateSkill(editingSkillId, skillForm);
//       setEditingSkillId(null);
//     } else {
//       addSkill(skillForm);
//     }
    
//     setSkillForm({
//       name: '',
//       imageUrl: ''
//     });
//   };
  
//   const handleEditSkill = (skill: Skill) => {
//     setSkillForm({
//       name: skill.name,
//       imageUrl: skill.imageUrl
//     });
//     setEditingSkillId(skill.id);
//   };
  
//   return (
//     <div className={theme}>
//       <div className="admin-container">
//         <div className="admin-header">
//           <Link to="/" className="flex items-center gap-2 text-important mb-4">
//             <ArrowLeft size={20} />
//             <span>Back to Website</span>
//           </Link>
//           <h1 className="h2">Admin Dashboard</h1>
//         </div>
        
//         <div className="flex gap-4 mb-6">
//           <button 
//             className={`admin-button ${activeTab === 'projects' ? 'opacity-100' : 'opacity-50'}`}
//             onClick={() => setActiveTab('projects')}
//           >
//             Manage Projects
//           </button>
//           <button 
//             className={`admin-button ${activeTab === 'skills' ? 'opacity-100' : 'opacity-50'}`}
//             onClick={() => setActiveTab('skills')}
//           >
//             Manage Skills
//           </button>
//         </div>
        
//         {activeTab === 'projects' && (
//           <div className="admin-section">
//             <h2 className="h3 mb-4">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
//             <form className="admin-form" onSubmit={handleProjectSubmit}>
//               <div className="admin-form-group">
//                 <label htmlFor="title">Project Title</label>
//                 <input 
//                   type="text" 
//                   id="title" 
//                   name="title" 
//                   value={projectForm.title} 
//                   onChange={handleProjectChange} 
//                   required 
//                 />
//               </div>
              
//               <div className="admin-form-group">
//                 <label htmlFor="description">Description</label>
//                 <textarea 
//                   id="description" 
//                   name="description" 
//                   value={projectForm.description} 
//                   onChange={handleProjectChange} 
//                   required 
//                 />
//               </div>
              
//               <div className="admin-form-group">
//                 <label htmlFor="technologies">Technologies (comma separated)</label>
//                 <input 
//                   type="text" 
//                   id="technologies" 
//                   name="technologies" 
//                   value={projectForm.technologies.join(', ')} 
//                   onChange={handleTechnologiesChange} 
//                   required 
//                 />
//               </div>
              
//               <div className="admin-form-group">
//                 <label htmlFor="projectLink">Project Link</label>
//                 <input 
//                   type="url" 
//                   id="projectLink" 
//                   name="projectLink" 
//                   value={projectForm.projectLink} 
//                   onChange={handleProjectChange} 
//                   required 
//                 />
//               </div>
              
//               <div className="admin-form-group">
//                 <label htmlFor="githubLink">GitHub Link</label>
//                 <input 
//                   type="url" 
//                   id="githubLink" 
//                   name="githubLink" 
//                   value={projectForm.githubLink} 
//                   onChange={handleProjectChange} 
//                   required 
//                 />
//               </div>
              
//               <div className="admin-form-group">
//                 <label htmlFor="imageUrl">Image URL</label>
//                 <input 
//                   type="url" 
//                   id="imageUrl" 
//                   name="imageUrl" 
//                   value={projectForm.imageUrl} 
//                   onChange={handleProjectChange} 
//                 />
//               </div>
              
//               <button type="submit" className="admin-button">
//                 {editingProjectId ? 'Update Project' : 'Add Project'}
//               </button>
              
//               {editingProjectId && (
//                 <button 
//                   type="button" 
//                   className="admin-button bg-gray-500"
//                   onClick={() => {
//                     setEditingProjectId(null);
//                     setProjectForm({
//                       title: '',
//                       description: '',
//                       technologies: [],
//                       projectLink: '',
//                       githubLink: '',
//                       imageUrl: ''
//                     });
//                   }}
//                 >
//                   Cancel Edit
//                 </button>
//               )}
//             </form>
            
//             <div className="admin-items-list">
//               <h3 className="h4 mb-2">Existing Projects</h3>
//               {projects.map(project => (
//                 <div key={project.id} className="admin-item">
//                   <div>
//                     <strong>{project.title}</strong>
//                   </div>
//                   <div className="admin-item-actions">
//                     <button 
//                       className="edit"
//                       onClick={() => handleEditProject(project)}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       className="delete"
//                       onClick={() => deleteProject(project.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {activeTab === 'skills' && (
//           <div className="admin-section">
//             <h2 className="h3 mb-4">{editingSkillId ? 'Edit Skill' : 'Add New Skill'}</h2>
//             <form className="admin-form" onSubmit={handleSkillSubmit}>
//               <div className="admin-form-group">
//                 <label htmlFor="name">Skill Name</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   name="name" 
//                   value={skillForm.name} 
//                   onChange={handleSkillChange} 
//                   required 
//                 />
//               </div>
              
//               <div className="admin-form-group">
//                 <label htmlFor="imageUrl">Image URL</label>
//                 <input 
//                   type="url" 
//                   id="imageUrl" 
//                   name="imageUrl" 
//                   value={skillForm.imageUrl} 
//                   onChange={handleSkillChange} 
//                   required 
//                 />
//               </div>
              
//               <button type="submit" className="admin-button">
//                 {editingSkillId ? 'Update Skill' : 'Add Skill'}
//               </button>
              
//               {editingSkillId && (
//                 <button 
//                   type="button" 
//                   className="admin-button bg-gray-500"
//                   onClick={() => {
//                     setEditingSkillId(null);
//                     setSkillForm({
//                       name: '',
//                       imageUrl: ''
//                     });
//                   }}
//                 >
//                   Cancel Edit
//                 </button>
//               )}
//             </form>
            
//             <div className="admin-items-list">
//               <h3 className="h4 mb-2">Existing Skills</h3>
//               {skills.map(skill => (
//                 <div key={skill.id} className="admin-item">
//                   <div>
//                     <strong>{skill.name}</strong>
//                   </div>
//                   <div className="admin-item-actions">
//                     <button 
//                       className="edit"
//                       onClick={() => handleEditSkill(skill)}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       className="delete"
//                       onClick={() => deleteSkill(skill.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;





import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProjects, Project } from '../context/ProjectsContext';
import { useSkills, Skill } from '../context/SkillsContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, LogOut } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { theme } = useTheme();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { skills, addSkill, updateSkill, deleteSkill } = useSkills();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'projects' | 'skills'>('projects');
  
  // Project form state
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    projectLink: '',
    githubLink: '',
    imageUrl: ''
  });
  
  // Skill form state
  const [skillForm, setSkillForm] = useState<Omit<Skill, 'id'>>({
    name: '',
    imageUrl: ''
  });
  
  // Edit states
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  
  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);
  
  // Project form handlers
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim());
    setProjectForm(prev => ({ ...prev, technologies }));
  };
  
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProjectId) {
      updateProject(editingProjectId, projectForm);
      setEditingProjectId(null);
    } else {
      addProject(projectForm);
    }
    
    setProjectForm({
      title: '',
      description: '',
      technologies: [],
      projectLink: '',
      githubLink: '',
      imageUrl: ''
    });
  };
  
  const handleEditProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      projectLink: project.projectLink,
      githubLink: project.githubLink,
      imageUrl: project.imageUrl
    });
    setEditingProjectId(project.id);
  };
  
  // Skill form handlers
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkillForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSkillId) {
      updateSkill(editingSkillId, skillForm);
      setEditingSkillId(null);
    } else {
      addSkill(skillForm);
    }
    
    setSkillForm({
      name: '',
      imageUrl: ''
    });
  };
  
  const handleEditSkill = (skill: Skill) => {
    setSkillForm({
      name: skill.name,
      imageUrl: skill.imageUrl
    });
    setEditingSkillId(skill.id);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className={`flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>
            <ArrowLeft size={20} />
            <span>Back to Website</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'} hover:underline`}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="flex gap-4 mb-6">
          <button 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'projects' 
                ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' 
                : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Manage Projects
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              activeTab === 'skills' 
                ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' 
                : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setActiveTab('skills')}
          >
            Manage Skills
          </button>
        </div>
        
        {activeTab === 'projects' && (
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-2xl font-bold mb-4">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
            <form className="space-y-4" onSubmit={handleProjectSubmit}>
              <div>
                <label htmlFor="title" className="block font-medium mb-1">Project Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={projectForm.title} 
                  onChange={handleProjectChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block font-medium mb-1">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={projectForm.description} 
                  onChange={handleProjectChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  rows={4}
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="technologies" className="block font-medium mb-1">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  id="technologies" 
                  name="technologies" 
                  value={projectForm.technologies.join(', ')} 
                  onChange={handleTechnologiesChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="projectLink" className="block font-medium mb-1">Project Link</label>
                <input 
                  type="url" 
                  id="projectLink" 
                  name="projectLink" 
                  value={projectForm.projectLink} 
                  onChange={handleProjectChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="githubLink" className="block font-medium mb-1">GitHub Link</label>
                <input 
                  type="url" 
                  id="githubLink" 
                  name="githubLink" 
                  value={projectForm.githubLink} 
                  onChange={handleProjectChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block font-medium mb-1">Image URL</label>
                <input 
                  type="url" 
                  id="imageUrl" 
                  name="imageUrl" 
                  value={projectForm.imageUrl} 
                  onChange={handleProjectChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  {editingProjectId ? 'Update Project' : 'Add Project'}
                </button>
                
                {editingProjectId && (
                  <button 
                    type="button" 
                    className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({
                        title: '',
                        description: '',
                        technologies: [],
                        projectLink: '',
                        githubLink: '',
                        imageUrl: ''
                      });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
              {projects.length === 0 ? (
                <p className="text-gray-500">No projects added yet.</p>
              ) : (
                <div className="space-y-3">
                  {projects.map(project => (
                    <div 
                      key={project.id} 
                      className={`p-4 rounded-md flex justify-between items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      <div>
                        <strong>{project.title}</strong>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                          onClick={() => handleEditProject(project)}
                        >
                          Edit
                        </button>
                        <button 
                          className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                          onClick={() => deleteProject(project.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'skills' && (
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h2 className="text-2xl font-bold mb-4">{editingSkillId ? 'Edit Skill' : 'Add New Skill'}</h2>
            <form className="space-y-4" onSubmit={handleSkillSubmit}>
              <div>
                <label htmlFor="name" className="block font-medium mb-1">Skill Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={skillForm.name} 
                  onChange={handleSkillChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block font-medium mb-1">Image URL</label>
                <input 
                  type="url" 
                  id="imageUrl" 
                  name="imageUrl" 
                  value={skillForm.imageUrl} 
                  onChange={handleSkillChange} 
                  className={`w-full px-3 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                  required 
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  {editingSkillId ? 'Update Skill' : 'Add Skill'}
                </button>
                
                {editingSkillId && (
                  <button 
                    type="button" 
                    className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
                    onClick={() => {
                      setEditingSkillId(null);
                      setSkillForm({
                        name: '',
                        imageUrl: ''
                      });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Existing Skills</h3>
              {skills.length === 0 ? (
                <p className="text-gray-500">No skills added yet.</p>
              ) : (
                <div className="space-y-3">
                  {skills.map(skill => (
                    <div 
                      key={skill.id} 
                      className={`p-4 rounded-md flex justify-between items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      <div>
                        <strong>{skill.name}</strong>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                          onClick={() => handleEditSkill(skill)}
                        >
                          Edit
                        </button>
                        <button 
                          className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                          onClick={() => deleteSkill(skill.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;