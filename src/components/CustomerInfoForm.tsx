import React, { useState } from 'react';
import { CartItem } from '../context/ShoppingBagContext';
import { useNavigate } from 'react-router-dom';

interface CustomerInfoFormProps {
  items: CartItem[];
  totalPrice: number;
}

export const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ items, totalPrice }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
  });
  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
  });

  const validateForm = () => {
    const newErrors = {
      nom: '',
      prenom: '',
      telephone: '',
      adresse: '',
    };
    let isValid = true;

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
      isValid = false;
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
      isValid = false;
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
      isValid = false;
    } else if (!/^[0-9\s\-\+\(\)]+$/.test(formData.telephone)) {
      newErrors.telephone = 'Format de téléphone invalide';
      isValid = false;
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = "L'adresse est requise";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `ORD-${Date.now()}`;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;

      const webhookPayload = {
        order_id: orderId,
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        adresse: formData.adresse,
        products: items.map((item) => ({
          product_name: `${item.product.brand} - ${item.product.name}`,
          product_image: item.product.image,
          quantity: item.quantity.toString(),
          price: (item.product.price * item.quantity).toFixed(2),
        })),
        subtotal: totalPrice.toFixed(2),
        total: totalPrice.toFixed(2),
        status: 'No Delivery',
      };

      const webhookResponse = await fetch('https://hook.eu2.make.com/lojsfapb4e56k26iqaz00sqft9guyxdj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (!webhookResponse.ok) {
        throw new Error('Webhook request failed');
      }

      const orderData = {
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        customerInfo: formData,
        totalPrice: totalPrice,
        orderDate: new Date().toISOString(),
      };

      localStorage.removeItem('shoppingBag');

      navigate('/thank-you', { state: orderData });
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.nom ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm`}
          />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
        </div>

        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Entrez votre prénom"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.prenom ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm`}
          />
          {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="+212 6XX XXX XXX"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.telephone ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm`}
          />
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
        </div>

        <div>
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse de livraison
          </label>
          <textarea
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Entrez votre adresse complète"
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.adresse ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm resize-none`}
          />
          {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-8"
        >
          {isSubmitting ? 'Traitement en cours...' : 'CONFIRMER LA COMMANDE'}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          En confirmant votre commande, vous acceptez nos conditions générales de vente
        </p>
      </form>
    </div>
  );
};
