import React from 'react';

interface KofiOverlayProps {
  open: boolean;
  onClose: () => void;
}

const KofiOverlay: React.FC<KofiOverlayProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'calc(100% - 2rem)',
          maxWidth: '420px',
          height: '80vh',
          maxHeight: '700px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <iframe
          src="https://ko-fi.com/jakubfleitesjonczyk?hidefeed=true&widget=true&embed=true"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Support on Ko-fi"
        />
      </div>
    </div>
  );
};

export default KofiOverlay;
