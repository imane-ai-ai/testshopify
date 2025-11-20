import React, { useState, useEffect } from 'react';

export const WhatsAppWidget: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setShowPopup(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const whatsappUrl = "http://wa.me/+212773893222?text=Salam!%20Bghit%20n3rf%20aktar%20%203la%20produits%20dyalkom";

  return (
    <>
      <a
        href={whatsappUrl}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>

      {showPopup && (
        <div className="whatsapp-popup">
          <p>📩 تواصل معنا على WhatsApp!</p>
        </div>
      )}

      <style>{`
        .whatsapp-float {
          position: fixed;
          width: 65px;
          height: 65px;
          bottom: 25px;
          right: 25px;
          background-color: #25d366;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          font-size: 30px;
          box-shadow: 2px 2px 15px rgba(0,0,0,0.25);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
        }

        .whatsapp-float:hover {
          transform: scale(1.1);
          box-shadow: 2px 2px 20px rgba(0,0,0,0.35);
        }

        .whatsapp-icon {
          width: 38px;
          height: 38px;
        }

        .whatsapp-popup {
          position: fixed;
          bottom: 95px;
          right: 35px;
          background-color: white;
          color: #333;
          padding: 10px 15px;
          border-radius: 12px;
          box-shadow: 2px 2px 15px rgba(0,0,0,0.15);
          font-size: 14px;
          z-index: 999;
          animation: popupFade 0.5s ease forwards;
        }

        .whatsapp-popup p {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }

        @keyframes popupFade {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .whatsapp-float {
            width: 55px;
            height: 55px;
            bottom: 20px;
            right: 20px;
          }

          .whatsapp-icon {
            width: 32px;
            height: 32px;
          }

          .whatsapp-popup {
            bottom: 80px;
            right: 25px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};
