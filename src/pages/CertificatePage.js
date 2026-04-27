import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ELECTION_TOPICS } from '../services/firestore';
import { Download, Printer, Share2 } from 'lucide-react';
import './CertificatePage.css';

const CertificatePage = () => {
  const { profile } = useAppContext();

  if (!profile) return <div className="p-4">Loading your achievement...</div>;

  const isCompleted = profile.topicsCompleted?.length === ELECTION_TOPICS.length;

  if (!isCompleted) {
    return (
      <div className="certificate-page">
        <div className="card text-center p-5">
          <h2>Almost there!</h2>
          <p>Complete all {ELECTION_TOPICS.length} topics to unlock your Informed Citizen Certificate.</p>
          <p className="mt-2 text-secondary">
            You've completed {profile.topicsCompleted?.length || 0} topics so far.
          </p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="certificate-page">
      <div className="certificate-container" id="certificate">
        <div className="cert-header">
          <h1>Certificate of Achievement</h1>
          <h2>VoteWise — Informed Citizen</h2>
        </div>
        
        <div className="cert-body">
          <p>This is to certify that</p>
          <div className="user-name">{profile.name}</div>
          <p>
            has successfully completed the comprehensive election education program components 
            prescribed by the VoteWise Election Assistant.
          </p>
          <p className="mt-3">
            Demonstrating thorough understanding of Indian democratic processes, 
            EVM/VVPAT operations, voter registration protocols, and electoral ethics.
          </p>
        </div>

        <div className="cert-footer">
          <div className="cert-signature">
            <p>VoteWise AI</p>
            <div className="sig-line"></div>
            <p className="text-muted small">Program Coordinator</p>
          </div>
          
          <div className="cert-seal">
            OFFICIALLY INFORMED
          </div>

          <div className="cert-date">
            <p>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <div className="sig-line"></div>
            <p className="text-muted small">Date Completed</p>
          </div>
        </div>
      </div>

      <div className="actions-bar">
        <button className="btn-secondary d-flex align-items-center gap-2" onClick={handlePrint}>
          <Printer size={18} /> Print Certificate
        </button>
        <button className="btn-primary d-flex align-items-center gap-2" onClick={() => alert('Certificate link copied! Share your achievement.')}>
          <Share2 size={18} /> Share
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;
