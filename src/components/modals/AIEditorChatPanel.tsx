'use client'

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// --- PHASE 2: Prompt builder and AI call logic ---
function buildPrompt(step: string, userInput: string) {
  switch (step) {
    case 'bg-color':
      return `You are a website style assistant. The user wants to set the page background color. Interpret their description and return only a valid JSON object with a "background" field. The value can be any valid CSS color, including 'transparent', rgba/hsla with alpha, or a CSS gradient with transparency. If the user requests transparency, output 'transparent' or an rgba/hsla/gradient with alpha. Do not default to #000000 if transparency is requested. Do not include any explanation or extra text. User input: "${userInput}"`;
    case 'bg-overlay':
      return `The user wants to add a background overlay. Suggest a CSS overlay (rgba, gradient, or filter) matching their description. Return only a valid JSON object with an \"overlay\" field. Do not include any explanation or extra text. User input: "${userInput}"`;
    case 'text-content':
      return `The user wants to update the intro text on the page. Return only the new text, no other explanation. User input: "${userInput}"`;
    case 'text-font':
      return `The user wants a different font style for the intro text. Suggest a web-safe font stack or a popular Google Font (in CSS font-family format). Return only a valid JSON object with a \"font\" field. Do not include any explanation or extra text. User input: "${userInput}"`;
    case 'text-color':
      return `The user wants to set the text color. Interpret their description and return only a valid JSON object with a \"color\" field (hex, rgb, or named). Do not include any explanation or extra text. User input: "${userInput}"`;
    case 'image-link':
      return `The user wants to set an image from the internet. Return only a valid JSON object with an \"image\" field containing a valid image URL. Do not include any explanation or extra text. User input: "${userInput}"`;
    default:
      return userInput;
  }
}

async function callAI(prompt: string): Promise<string> {
  // For demo, use a mock API. Replace with your real endpoint as needed.
  // Example: POST to /api/ai or OpenRouter endpoint
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return (data.text || '').trim();
  } catch (e) {
    return 'AI error: ' + (e as Error).message;
  }
}

function BoxyChat({ onClose, onAIStyle }: { onClose: () => void, onAIStyle: (aiRaw: string) => void }) {
  const [step, setStep] = useState<'main'|'background'|'bg-color'|'bg-overlay'|'text'|'text-content'|'text-font'|'text-color'|'image'|'image-link'|'image-upload'|'post-change'>('main');
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState<{step: string, value: string, ai?: string}[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Helper for going back
  const handleBack = () => {
    setAiResult(null); setAiError(null);
    if (step === 'background' || step === 'text' || step === 'image') setStep('main');
    else if (step === 'bg-color' || step === 'bg-overlay') setStep('background');
    else if (step === 'text-content' || step === 'text-font' || step === 'text-color') setStep('text');
    else if (step === 'image-link' || step === 'image-upload') setStep('image');
    else setStep('main');
    setUserInput('');
  };

  // Helper for submit (AI steps)
  const handleAISubmit = async () => {
    setAiLoading(true); setAiResult(null); setAiError(null);
    const prompt = buildPrompt(step, userInput);
    const ai = await callAI(prompt);
    setAiLoading(false);
    setAiResult(ai);
    setHistory([...history, {step, value: userInput, ai}]);
    setUserInput('');
    setStep('post-change');
    // Log the raw AI output for debugging
    if (["bg-color", "bg-overlay", "text-color", "text-font"].includes(step)) {
      console.log("Raw AI output:", ai);
    }
    // Call onAIStyle for style steps with fallback for non-JSON
    if (["bg-color", "bg-overlay", "text-color", "text-font"].includes(step) && onAIStyle) {
      let aiResult: any = {};
      try {
        aiResult = JSON.parse(ai);
      } catch {
        // Fallback: if it's a color/gradient/font string, wrap in JSON
        if (/^#|rgb|linear-gradient|[a-z\s,'"-]+$/i.test(ai.trim())) {
          if (step === 'bg-color') aiResult = { background: ai.trim() };
          else if (step === 'bg-overlay') aiResult = { overlay: ai.trim() };
          else if (step === 'text-color') aiResult = { color: ai.trim() };
          else if (step === 'text-font') aiResult = { font: ai.trim() };
        } else {
          alert("Could not parse the AI output. Please try again.");
          return;
        }
      }
      onAIStyle(JSON.stringify(aiResult));
    }
  };

  // Helper for submit (non-AI steps)
  const handleSubmit = () => {
    setHistory([...history, {step, value: userInput}]);
    setUserInput('');
    setStep('post-change');
  };

  // Helper for Undo
  const handleUndo = () => {
    setHistory(history.slice(0, -1));
    setStep('main');
    setUserInput('');
    setAiResult(null); setAiError(null);
  };

  // Helper for Finish
  const handleFinish = () => {
    setHistory([]);
    setUserInput('');
    setStep('main');
    setAiResult(null); setAiError(null);
    onClose();
  };

  // --- Modern frosted glass chat UI styles ---
  const mobilePanelStyle: React.CSSProperties = {
    width: '100vw',
    maxWidth: '100vw',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '18px 18px 0 0',
    margin: 0,
  };
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const style = isMobile ? { ...mobilePanelStyle } : {};

  // --- Chat bubble styles ---
  const bubbleUser = {
    alignSelf: 'flex-end',
    background: 'linear-gradient(90deg, #e0e7ef 0%, #b3c6e0 100%)', // lighter gradient
    color: '#222',
    borderRadius: '18px 18px 4px 18px',
    padding: '8px 14px',
    margin: '4px 0',
    maxWidth: '80%',
    fontSize: 15,
    boxShadow: '0 2px 8px rgba(46,196,182,0.06)',
    lineHeight: 1.5,
  };
  const bubbleAI = {
    alignSelf: 'flex-start',
    background: 'rgba(240, 245, 255, 0.92)', // lighter glass
    color: '#222',
    borderRadius: '18px 18px 18px 4px',
    padding: '8px 14px',
    margin: '4px 0',
    maxWidth: '80%',
    fontSize: 15,
    boxShadow: '0 2px 8px rgba(106,5,114,0.06)',
    lineHeight: 1.5,
  };

  // --- Button style ---
  const buttonBase: React.CSSProperties = {
    background: 'linear-gradient(90deg, #2EC4B6 0%, #6A0572 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 999,
    padding: '10px 22px',
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: 600,
    marginBottom: 0,
    marginRight: 8,
    marginTop: 0,
    transition: 'background 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(46,196,182,0.08)',
    outline: 'none',
  };
  const buttonSecondary: React.CSSProperties = {
    ...buttonBase,
    background: '#23262F',
    color: '#fff',
    border: '1.5px solid #2EC4B6',
    boxShadow: 'none',
  };

  // --- Inline action link style ---
  const actionLink: React.CSSProperties = {
    color: '#2C6ECB',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
    display: 'inline',
    outline: 'none',
    transition: 'color 0.15s',
  };

  // --- Chat history rendering ---
  const chatHistory = history.map((h, i) => (
    <React.Fragment key={i}>
      {h.value && (
        <div style={bubbleUser}>{h.value}</div>
      )}
      {h.ai && (
        <div style={bubbleAI}>{h.ai}</div>
      )}
    </React.Fragment>
  ));

  // --- Chat area scrollable ---
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const chatAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 10px 4px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    background: 'transparent',
    minHeight: 80,
    maxHeight: isMobile ? '35vh' : 400,
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [history, aiResult, aiError]);

  // --- Header bar ---
  const headerStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.92)',
    color: '#222',
    padding: '10px 18px 8px 18px',
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: 0.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '18px 18px 0 0',
    borderBottom: '1.5px solid #e0e7ef',
    minHeight: 0,
  };

  // --- Input area ---
  const inputAreaStyle: React.CSSProperties = {
    padding: '10px 10px',
    background: 'rgba(255,255,255,0.92)',
    borderTop: '1.5px solid #e0e7ef',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 999,
    border: '1.5px solid #b3c6e0',
    padding: '8px 12px',
    fontSize: 16,
    background: '#f4f7fa',
    color: '#222',
    outline: 'none',
    marginBottom: 0,
  };

  // --- Modernized content rendering ---
  let content;
  const aiSteps = ['bg-color','bg-overlay','text-content','text-font','text-color','image-link'];
  const constructedPrompt = aiSteps.includes(step) ? buildPrompt(step, userInput) : '';
  React.useEffect(() => {
    if (userInput && aiSteps.includes(step)) {
      console.log('Boxy Prompt:', constructedPrompt);
    }
  }, [userInput, constructedPrompt, step]);

  if (step === 'main') {
    content = (
      <div style={chatAreaStyle} ref={chatAreaRef}>
        <div style={{...bubbleAI, alignSelf:'center', background:'rgba(255,255,255,0.92)', color:'#8ff'}}>
          Hi, I’m <b>Boxy</b>, the PageOne Ambassador Assistant.<br/>Let’s make some changes—choose an area to update:
          <div style={{marginTop:8}}>
            <button style={actionLink} onClick={() => setStep('background')}>Background</button>
            {' · '}
            <button style={actionLink} onClick={() => setStep('text')}>Text</button>
            {' · '}
            <button style={actionLink} onClick={() => setStep('image')}>Add Image</button>
          </div>
        </div>
      </div>
    );
  } else if (step === 'background') {
    content = (
      <div style={chatAreaStyle} ref={chatAreaRef}>
        <div style={bubbleAI}>Great! What would you like to do with the background?
          <div style={{marginTop:8}}>
            <button style={actionLink} onClick={() => setStep('bg-color')}>Change Color</button>
            {' · '}
            <button style={actionLink} onClick={() => setStep('bg-overlay')}>Add Overlay</button>
            {' · '}
            <button style={actionLink} onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    );
  } else if (aiSteps.includes(step)) {
    let promptHint = '';
    if (step === 'bg-color') promptHint = 'What color would you like? (Describe it any way you want)';
    if (step === 'bg-overlay') promptHint = 'What overlay color or effect would you like?';
    if (step === 'text-content') promptHint = 'What should the text say?';
    if (step === 'text-font') promptHint = 'What font style would you like? (e.g., ‘bold’, ‘modern’, ‘handwritten’)';
    if (step === 'text-color') promptHint = 'What color would you like for the text?';
    if (step === 'image-link') promptHint = 'Please paste the image URL below:';
    content = (
      <>
        <div style={chatAreaStyle} ref={chatAreaRef}>
          {chatHistory}
          {aiLoading && <div style={{...bubbleAI, color:'#8ff'}}>Boxy is thinking…</div>}
          {aiResult && <div style={{...bubbleAI, color:'#8ff'}}>AI: {aiResult}</div>}
          {aiError && <div style={{...bubbleAI, color:'#f88'}}>Error: {aiError}</div>}
        </div>
        <div style={inputAreaStyle}>
          <input value={userInput} onChange={e => setUserInput(e.target.value)} placeholder={promptHint} style={inputStyle} disabled={aiLoading} />
          <div style={{ display: 'flex', gap: 8, justifyContent:'flex-end' }}>
            <button style={actionLink} onClick={handleAISubmit} disabled={!userInput || aiLoading}>{aiLoading ? 'Thinking…' : 'Submit'}</button>
            <button style={actionLink} onClick={handleBack} disabled={aiLoading}>Back</button>
          </div>
          {userInput && <div style={{marginTop:8, fontSize:13, color:'#aaa', background:'#f4f7fa', borderRadius:6, padding:8}}><b>Prompt:</b> {constructedPrompt}</div>}
        </div>
      </>
    );
  } else if (step === 'text') {
    content = (
      <div style={chatAreaStyle} ref={chatAreaRef}>
        <div style={bubbleAI}>Which aspect of the text would you like to update?
          <div style={{marginTop:8}}>
            <button style={actionLink} onClick={() => setStep('text-content')}>Edit Content</button>
            {' · '}
            <button style={actionLink} onClick={() => setStep('text-font')}>Change Font</button>
            {' · '}
            <button style={actionLink} onClick={() => setStep('text-color')}>Change Color</button>
            {' · '}
            <button style={actionLink} onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    );
  } else if (step === 'image') {
    content = (
      <div style={chatAreaStyle} ref={chatAreaRef}>
        <div style={bubbleAI}>How would you like to add the image?
          <div style={{marginTop:8}}>
            <button style={actionLink} onClick={() => setStep('image-link')}>Internet Link</button>
            {' · '}
            <button style={actionLink} onClick={() => setStep('image-upload')}>Upload from Device</button>
            {' · '}
            <button style={actionLink} onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    );
  } else if (step === 'image-upload') {
    content = (
      <div style={chatAreaStyle} ref={chatAreaRef}>
        <div style={bubbleAI}>Please select an image from your device.</div>
        <input type="file" style={{ marginBottom: 8 }} disabled />
        <div style={{ display: 'flex', gap: 8, justifyContent:'flex-end' }}>
          <button style={actionLink} onClick={handleSubmit}>Submit</button>
          <button style={actionLink} onClick={handleBack}>Back</button>
        </div>
      </div>
    );
  } else if (step === 'post-change') {
    content = (
      <div style={chatAreaStyle} ref={chatAreaRef}>
        {chatHistory}
        {aiResult && <div style={{...bubbleAI, color:'#8ff'}}>AI: {aiResult}</div>}
        {aiError && <div style={{...bubbleAI, color:'#f88'}}>Error: {aiError}</div>}
        <div style={{marginTop: 10, textAlign:'center'}}>
          <button style={actionLink} onClick={() => setStep('main')}>Make Another Change</button>
          {' · '}
          <button style={actionLink} onClick={handleUndo}>Undo Last</button>
          {' · '}
          <button style={actionLink} onClick={handleFinish}>Finish</button>
        </div>
      </div>
    );
  }

  // Place Boxy mascot image in the bottom right, and adjust chat panel to avoid overlap
  const boxyWidth = isMobile ? 56 : 80;
  const boxyHeight = isMobile ? 56 : 80;
  const boxyImgStyle: React.CSSProperties = {
    position: 'fixed',
    right: 12,
    bottom: 12,
    width: boxyWidth,
    height: boxyHeight,
    zIndex: 100000,
    pointerEvents: 'none',
    filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.18))',
    userSelect: 'none',
    transition: 'right 0.2s, bottom 0.2s, width 0.2s',
  };
  // Adjust chat panel position to avoid Boxy overlap
  const chatPanelStyle: React.CSSProperties = isMobile ? {
    position: 'fixed',
    bottom: 16,
    right: 16,
    left: 16,
    width: 'auto',
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: '60vh',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#222',
    borderRadius: 18,
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    zIndex: 99999,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1.5px solid #e0e7ef',
    backdropFilter: 'blur(16px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
  } : {
    position: 'fixed',
    bottom: boxyWidth + 8,
    right: boxyWidth + 8,
    width: 370,
    maxWidth: '95vw',
    background: 'rgba(255, 255, 255, 0.82)',
    color: '#222',
    borderRadius: 18,
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    zIndex: 99999,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1.5px solid #e0e7ef',
    backdropFilter: 'blur(16px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
  };

  return (
    <>
      <div className="boxy-chat-panel" style={chatPanelStyle}>
        <div style={headerStyle}>
          <span>AI Editor Demo</span>
          {!isMobile && (
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 28,
                lineHeight: 1,
                cursor: 'pointer',
                padding: 4,
                marginLeft: 8,
                borderRadius: 6,
                transition: 'background 0.2s',
              }}
              aria-label="Close chat panel"
            >
              ×
            </button>
          )}
        </div>
        {content}
      </div>
    </>
  );
}

export default function AIEditorChatPanel({ onClose, onAIStyle }: { onClose: () => void, onAIStyle: (aiRaw: string) => void }) {
  return createPortal(
    <BoxyChat onClose={onClose} onAIStyle={onAIStyle} />, 
    typeof window !== 'undefined' ? document.body : (null as unknown as Element)
  );
} 