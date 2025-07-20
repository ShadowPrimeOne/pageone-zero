import React, { useState } from 'react';

interface AgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: (signature: string) => void;
}

const agreementText = `90-Day Digital Marketing Trial Agreement\n\nBy signing below, I agree to participate in a 90-day digital marketing campaign with [Agency Name].`;
const bulletPoints = [
  'I understand there is no long-term lock-in.',
  'I am responsible for ad spend as agreed.',
  'All campaign terms will be communicated before launch.',
  'I can cancel at any time.'
];

const AgreementModal: React.FC<AgreementModalProps> = ({ isOpen, onClose, onSign }) => {
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature.trim()) {
      setError('Please type your full name to sign.');
      return;
    }
    setError('');
    onSign(signature.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 p-8 relative" onSubmit={handleSubmit}>
        <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">90-Day Digital Marketing Trial Agreement</h2>
        <p className="mb-4 text-gray-700 whitespace-pre-line">{agreementText}</p>
        <ul className="mb-4 list-disc pl-6 text-gray-700">
          {bulletPoints.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
        {/* TODO: Add canvas/touch signature for future MVP */}
        <label className="block mb-2 font-semibold">Signature</label>
        <input
          type="text"
          placeholder="Type your full name to sign"
          value={signature}
          onChange={e => setSignature(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full py-3 rounded-lg !bg-blue-600 !text-white !border !border-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 hover:!bg-blue-700 text-lg mt-2">Sign and Continue</button>
        <button type="button" className="w-full py-2 mt-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AgreementModal; 