import React from 'react';

export const ScrollingBanner: React.FC = () => {
  return (
    <>
      <style>{`
        .scroll-banner {
          background: #000000;
          color: #D4AF37;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 0;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          line-height: 1;
        }

        .scroll-track {
          display: inline-block;
          will-change: transform;
          animation: scroll-left 28s linear infinite;
        }

        .scroll-item {
          display: inline-block;
          padding: 0 3rem;
          font-weight: 600;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .scroll-item a {
          color: #D4AF37;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .scroll-item {
            font-size: 14px;
            padding: 0 2rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-track {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      <div className="scroll-banner" role="region" aria-label="Bienvenue">
        <div className="scroll-track" aria-hidden="false">
          <span className="scroll-item">BIENVENUE CHEZ CROWN TIME — Excellence Horlogère</span>
          <span className="scroll-item">BIENVENUE CHEZ CROWN TIME — Excellence Horlogère</span>
          <span className="scroll-item">BIENVENUE CHEZ CROWN TIME — Excellence Horlogère</span>
          <span className="scroll-item">BIENVENUE CHEZ CROWN TIME — Excellence Horlogère</span>
          <span className="scroll-item">BIENVENUE CHEZ CROWN TIME — Excellence Horlogère</span>
          <span className="scroll-item">BIENVENUE CHEZ CROWN TIME — Excellence Horlogère</span>
        </div>
      </div>
    </>
  );
};
