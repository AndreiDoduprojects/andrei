'use client';

import { useState } from 'react';

type Tab = 'dev' | 'invest' | 'finance';

export default function ProfileCard() {
  const [activeTab, setActiveTab] = useState<Tab>('dev');

  const tabContent = {
    dev: {
      skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      description: 'Full-stack developer with expertise in modern web technologies',
    },
    invest: {
      skills: ['Value Investing', 'Financial Analysis', 'Portfolio Management', 'Risk Assessment'],
      description: 'Strategic investor focused on long-term value creation',
    },
    finance: {
      skills: ['Financial Modeling', 'Market Analysis', 'Data Analytics', 'Trading Systems'],
      description: 'Combining technical skills with financial expertise',
    },
  };

  return (
    <div className="metallic-border w-full">
      <div className="metallic-border-inner p-8">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #0369a1, #fbbf24)',
          }}>
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Andrei Dodu</h2>
          <p className="text-gray-400 mb-2">Full-Stack Developer & Value Investor</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Sweden • From Iași, Romania</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          <button
            className={`tab ${activeTab === 'dev' ? 'active' : ''}`}
            onClick={() => setActiveTab('dev')}
          >
            Dev
          </button>
          <button
            className={`tab ${activeTab === 'invest' ? 'active' : ''}`}
            onClick={() => setActiveTab('invest')}
          >
            Invest
          </button>
          <button
            className={`tab ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
          >
            Finance
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          <p className="text-gray-400 text-center text-sm">
            {tabContent[activeTab].description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {tabContent[activeTab].skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
