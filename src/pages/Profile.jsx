import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/Button';
import { FiUser, FiMail, FiBook, FiAward, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { profile, updateProfile } = useContext(UserContext);
  const { theme } = useTheme();

  // Form local state initialized from context profile
  const [name, setName] = useState(profile.name);
  const [college, setCollege] = useState(profile.college);
  const [branch, setBranch] = useState(profile.branch);
  const [email, setEmail] = useState(profile.email);
  const [skills, setSkills] = useState(profile.skills || []);

  const [newSkillText, setNewSkillText] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;

    const formattedSkill = newSkillText.trim();
    if (skills.includes(formattedSkill)) {
      toast.error("Skill already exists in your profile!");
      return;
    }

    setSkills([...skills, formattedSkill]);
    setNewSkillText('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required fields.");
      return;
    }

    const updated = {
      name: name.trim(),
      college: college.trim(),
      branch: branch.trim(),
      email: email.trim(),
      skills: skills
    };

    updateProfile(updated);
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          My Student Profile
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal academic records and core programming skill tags used to customize resume scoring reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Avatar Panel */}
        <div className="md:col-span-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-primary via-blue-600 to-indigo-700 text-white font-black text-3xl shadow-md uppercase">
              {name ? name.charAt(0) : 'U'}
            </div>
            <div className="absolute bottom-0 right-0 rounded-full bg-success p-1 text-white ring-4 ring-white dark:ring-darkCard">
              <FiCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{branch}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">ACTIVE USER</p>
          </div>
          
          <div className="w-full pt-4 border-t border-slate-100 dark:border-darkBorder/60 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Active Theme:</span>
              <span className="font-semibold capitalize text-slate-700 dark:text-slate-200">{theme} Mode</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Preparation:</span>
              <span className="font-semibold text-primary">Pre-Placement active</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details Form & Skills Tags */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Main Details Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">Edit Profile details</h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    College / University Name
                  </label>
                  <div className="relative">
                    <FiBook className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Course / Branch
                  </label>
                  <div className="relative">
                    <FiAward className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Skills Management */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">Technical Skills</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Add programming languages, frameworks, or databases. These tags are cross-referenced during resume scans.
            </p>

            {/* Input tag field */}
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                placeholder="e.g. Python, Docker, Node.js"
                className="block w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
              />
              <Button type="submit" variant="outline" icon={FiPlus}>
                Add
              </Button>
            </form>

            {/* Tags wrapper */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-750 dark:border-slate-850 dark:bg-slate-900 dark:text-slate-300"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1.5 inline-flex h-3 w-3 flex-shrink-0 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      aria-label={`Remove ${skill}`}
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500">No skills added yet.</span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
