import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 sm:mb-8 lg:mb-12 animate-slide-up">
          <Mail className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-gold-600 mx-auto mb-4 sm:mb-6 lg:mb-8" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black mb-3 sm:mb-4 lg:mb-6 tracking-wide">
            Restez <span className="font-bold text-gold-600">Connecté</span>
          </h2>
          <div className="w-12 sm:w-16 lg:w-24 h-px bg-gold-600 mx-auto mb-4 sm:mb-6 lg:mb-8"></div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            <span className="font-serif italic">Restez informé de nos actualités et événements exclusifs.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto animate-scale-in px-4">
          <div className="flex flex-col sm:flex-row gap-0 shadow-lg sm:shadow-2xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse e-mail"
              className="flex-1 px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-200 focus:ring-2 focus:ring-gold-600 focus:border-gold-600 transition-all duration-300 sm:rounded-l-none rounded-t-lg sm:rounded-t-none"
              required
            />
            <button
              type="submit"
              className="bg-gold-600 hover:bg-gold-700 text-black font-bold px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 transition-all duration-300 hover:scale-105 border-2 border-gold-600 hover:border-gold-700 group rounded-b-lg sm:rounded-b-none sm:rounded-r-lg"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300 mx-auto" />
            </button>
          </div>
        </form>

        {subscribed && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-100 text-green-700 border border-green-200 animate-slide-up mx-4 rounded-lg">
            <p className="font-semibold text-sm sm:text-base">Merci de vous être abonné !</p>
            <p className="text-xs sm:text-sm">Vous recevrez bientôt nos dernières mises à jour et offres exclusives.</p>
          </div>
        )}

        <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 px-4">
          Nous respectons votre vie privée. Désabonnez-vous à tout moment. Aucun spam, jamais.
        </p>
      </div>
    </section>
  );
};