import React, { useState } from 'react';
import { elaborateGlossaryTerm } from '../services/gemini';
import { useAppContext } from '../context/AppContext';
import './GlossaryPage.css';

const GLOSSARY_TERMS = [
  "Ballot", "Booth Level Officer (BLO)", "By-election", "Constituency",
  "EVM (Electronic Voting Machine)", "Election Commission of India (ECI)",
  "EPIC (Elector's Photo Identity Card)", "Form 6", "General Election",
  "Lok Sabha", "Model Code of Conduct (MCC)", "NOTA", "NVSP", 
  "Polling Booth", "Proxy Voting", "Rajya Sabha", "Returning Officer",
  "Tendered Vote", "Vidhan Sabha", "VVPAT (Voter Verifiable Paper Audit Trail)"
].sort();

const GlossaryPage = () => {
  const { profile } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [definition, setDefinition] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredTerms = GLOSSARY_TERMS.filter(term => 
    term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTermClick = async (term) => {
    setSelectedTerm(term);
    setDefinition('');
    setLoading(true);
    
    const language = profile?.language || 'en';
    const def = await elaborateGlossaryTerm(term, language);
    setDefinition(def);
    setLoading(false);
  };

  return (
    <div className="glossary-page">
      <h1>Election Glossary</h1>
      <p>Your A-Z guide to Indian election terminology.</p>
      
      <div className="glossary-layout">
        <div className="glossary-sidebar">
          <input 
            type="search" 
            className="input-field mb-3" 
            placeholder="Search terms..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <ul className="terms-list">
            {filteredTerms.map(term => (
              <li 
                key={term} 
                className={`term-item ${selectedTerm === term ? 'active' : ''}`}
                onClick={() => handleTermClick(term)}
              >
                {term}
              </li>
            ))}
            {filteredTerms.length === 0 && <li className="text-secondary">No terms found.</li>}
          </ul>
        </div>
        
        <div className="glossary-content">
          {selectedTerm ? (
            <div className="card definition-card">
              <h2>{selectedTerm}</h2>
              {loading ? (
                <div className="loading-skeleton mt-3">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line w-75"></div>
                </div>
              ) : (
                <p className="mt-3 definition-text">{definition}</p>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <p>Select a term from the list to see its definition.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;
