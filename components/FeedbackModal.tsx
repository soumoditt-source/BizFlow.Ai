import React, { useState } from 'react';
import { getLabel } from '../utils/i18n';
import { Language } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  projectName: string;
  language?: Language;
}

const FeedbackModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, projectName, language = Language.ENGLISH }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(rating, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-dark-card border border-bizflow-500/50 rounded-xl max-w-md w-full p-6 shadow-2xl animate-fade-in-up text-center">
        <h3 className="text-xl font-bold text-white mb-2">{getLabel(language, 'sysPerfReport')}</h3>
        <p className="text-gray-400 text-sm mb-6">{getLabel(language, 'archGenFeedback')} <span className="text-bizflow-400">{projectName}</span>?</p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none transform transition hover:scale-110"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={star <= rating ? "#14b8a6" : "none"} 
                stroke={star <= rating ? "#14b8a6" : "#4b5563"} 
                strokeWidth="2" 
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
          ))}
        </div>

        <textarea 
          className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-sm text-white mb-4 focus:border-bizflow-500 outline-none"
          rows={3}
          placeholder={getLabel(language, 'feedbackPlaceholder')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-2 rounded font-bold uppercase text-sm ${rating > 0 ? 'bg-bizflow-600 hover:bg-bizflow-500 text-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
        >
          {getLabel(language, 'submitTelemetry')}
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;