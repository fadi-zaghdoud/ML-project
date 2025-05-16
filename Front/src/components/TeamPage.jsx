import { useState } from 'react';

function TeamPage() {
  const [activeTab, setActiveTab] = useState('team');

  const teamMembers = [
    {
      id: 1,      name: "Fadi Zaghdoud",
      role: "Full Stack Developer",
      bio: "ESPRIT | Software Engineering student.",
      image: "/images/fadi.jpg"
    },
    {
      id: 2,      name: "Khairi Hleli",
      role: "Full Stack Developer",
      bio: "ESPRIT | Software Engineering student.",
      image: "/images/khairi.jpg"
    },
    {
      id: 3,      name: "Haythem Raggad",
      role: "Full Stack Developer",
      bio: "ESPRIT | Software Engineering student.",
      image: "/images/haythem.jpeg"
    },
    {
      id: 4,      name: "Nihed Abdennour",
      role: "Full Stack Developer",
      bio: "ESPRIT | Software Engineering student.",
      image: "/images/nihed.jpg"
    },
    {
      id: 5,      name: "Maram Naderi",
      role: "Full Stack Developer",
      bio: "ESPRIT | Software Engineering student.",
      image: "/images/maram.jpg"
    }
  ];

  const projectInfo = {
    name: "TuniHire",
    description: "An AI-powered recruitment platform that helps match job candidates with positions based on their skills and experience. Our platform includes salary prediction and candidate recommendation features to facilitate the hiring process.",
    technologies: ["React", "Flask", "Machine Learning", "Python", "TailwindCSS", "scikit-learn", "NLTK"],
    features: ["Salary Prediction", "Candidate Evaluation"]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8 md:p-10">
      <div className="flex justify-center mb-6 border-b pb-4">
        <button
          className={`px-4 py-2 mx-2 rounded-lg font-medium transition-colors duration-150 ${activeTab === 'team' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('team')}
        >
          Our Team
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg font-medium transition-colors duration-150 ${activeTab === 'project' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('project')}
        >
          About Project
        </button>
      </div>

      {activeTab === 'team' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
            <p className="mt-3 text-md text-gray-600">The talented people behind this project</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full mb-4 overflow-hidden bg-indigo-100 flex items-center justify-center">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-indigo-600 font-medium">{member.role}</p>
                  <p className="mt-3 text-sm text-gray-600 text-center">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'project' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">About {projectInfo.name}</h2>
            <p className="mt-3 text-md text-gray-600">Our mission and vision</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Project Description</h3>
            <p className="text-gray-600">{projectInfo.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {projectInfo.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {projectInfo.technologies.map((tech, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamPage;
