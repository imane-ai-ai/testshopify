import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import { ArrowLeft, Facebook, Mail, Share, Check } from 'lucide-react';
import { RelatedProducts } from './RelatedProducts';
import { useShoppingBag } from '../context/ShoppingBagContext';
import { StaggerTestimonials } from './ui/stagger-testimonials';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useShoppingBag();

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.brand === product.brand && p.id !== product.id)
      .slice(0, 6);
  }, [product]);

  const handleAddToBag = () => {
    if (!product) return;

    setIsAdding(true);

    setTimeout(() => {
      addItem(product);
      setIsAdding(false);
      setJustAdded(true);

      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 300);
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'men':
        return 'Homme';
      case 'women':
        return 'Femme';
      case 'accessories':
        return 'Accessoires';
      default:
        return 'Collection';
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Produit Non Trouvé</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            Retour à l'Accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-14 sm:pt-16 md:pt-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 sm:mb-8 lg:mb-10 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          <span>Retour à la Collection {getCategoryName(product.category)}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          <div className="lg:col-span-1 xl:col-span-1 order-2 lg:order-1">
            {product.images.length > 1 && (
              <div className="flex lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 snap-x snap-mandatory lg:snap-none scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-full lg:aspect-square overflow-hidden border-2 transition-all snap-start ${
                      selectedImage === index
                        ? 'border-black shadow-md'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 xl:col-span-6 order-1 lg:order-2">
            <div className="aspect-square overflow-hidden bg-gray-50 rounded-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4 sm:p-6 md:p-8"
              />
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-5 order-3 flex flex-col space-y-5 sm:space-y-6 lg:space-y-7">
            <div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-600 mb-2">
                TAG HEUER
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-3 leading-tight">
                {product.name}
              </h1>
              <div className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5">
                Référence: {product.brand}
              </div>

              {/* Price Display */}
              <div className="flex items-center gap-3 mb-6">
                {product.originalPrice && (
                  <span className="text-[#9aa0a6] text-lg sm:text-xl font-medium relative">
                    <span className="relative inline-block">
                      {product.originalPrice.toLocaleString('fr-MA')}Dh
                      <span className="absolute inset-0 flex items-center">
                        <span className="w-full h-[2px] bg-[#9aa0a6]"></span>
                      </span>
                    </span>
                  </span>
                )}
                <span className="text-[#111] text-xl font-medium">
                  {product.price.toLocaleString('fr-MA')}Dh
                </span>
              </div>

              <button
                onClick={() => {
                  addItem(product);
                  navigate('/checkout?direct=true');
                }}
                className="w-full py-4 sm:py-5 px-8 text-sm sm:text-base font-semibold tracking-wide uppercase transition-all mb-3 rounded-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!product.inStock}
              >
                ACHETER MAINTENANT
              </button>

              <button
                onClick={handleAddToBag}
                className={`w-full py-4 sm:py-5 px-8 text-sm sm:text-base font-semibold tracking-wide uppercase transition-all mb-4 sm:mb-5 rounded-sm flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                } ${isAdding ? 'scale-95' : 'scale-100'} ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!product.inStock || isAdding}
              >
                {justAdded ? (
                  <>
                    <Check size={20} className="animate-bounce" />
                    <span>AJOUTÉ AU PANIER</span>
                  </>
                ) : isAdding ? (
                  <span>AJOUT EN COURS...</span>
                ) : (
                  <span>AJOUTER AU PANIER</span>
                )}
              </button>

              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 mb-6 sm:mb-7">
                <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <span>Garantie virtuelle en stock</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-5 sm:pt-6 lg:pt-7">
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase tracking-wide">Description</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

{product.specifications && (
              <div className="border-t border-gray-200 pt-5 sm:pt-6 lg:pt-7">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 uppercase tracking-wide">Spécifications Techniques</h2>

                <div className="space-y-6 sm:space-y-7">
                  {(product.specifications.reference || product.specifications.modelCase || product.specifications.bezel || product.specifications.model || product.specifications.brand || product.specifications.year || product.specifications.condition || product.specifications.listingCode || product.specifications.dealerProductCode || product.specifications.yearOfProduction || product.specifications.gender || product.specifications.price || product.specifications.availability || product.specifications.scopeOfDelivery || product.specifications.series || product.specifications.modelYear || product.specifications.productionYear || product.specifications.itemNumber) && (
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                        Informations Générales
                      </h3>
                      <div className="space-y-2 sm:space-y-2.5 text-sm sm:text-base">
                        {product.specifications.listingCode && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Code d'annonce:</span>
                            <span className="font-medium text-gray-900">{product.specifications.listingCode}</span>
                          </div>
                        )}
                        {product.specifications.brand && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Marque:</span>
                            <span className="font-medium text-gray-900">{product.specifications.brand}</span>
                          </div>
                        )}
                        {product.specifications.model && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Modèle:</span>
                            <span className="font-medium text-gray-900">{product.specifications.model}</span>
                          </div>
                        )}
                        {product.specifications.series && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Série:</span>
                            <span className="font-medium text-gray-900">{product.specifications.series}</span>
                          </div>
                        )}
                        {product.specifications.reference && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Référence:</span>
                            <span className="font-medium text-gray-900">{product.specifications.reference}</span>
                          </div>
                        )}
                        {product.specifications.dealerProductCode && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Code produit du revendeur:</span>
                            <span className="font-medium text-gray-900">{product.specifications.dealerProductCode}</span>
                          </div>
                        )}
                        {product.specifications.modelCase && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Boîtier du modèle:</span>
                            <span className="font-medium text-gray-900">{product.specifications.modelCase}</span>
                          </div>
                        )}
                        {product.specifications.modelYear && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Année du modèle:</span>
                            <span className="font-medium text-gray-900">{product.specifications.modelYear}</span>
                          </div>
                        )}
                        {product.specifications.year && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Année:</span>
                            <span className="font-medium text-gray-900">{product.specifications.year}</span>
                          </div>
                        )}
                        {product.specifications.yearOfProduction && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Année de production:</span>
                            <span className="font-medium text-gray-900">{product.specifications.yearOfProduction}</span>
                          </div>
                        )}
                        {product.specifications.productionYear && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Année de production:</span>
                            <span className="font-medium text-gray-900">{product.specifications.productionYear}</span>
                          </div>
                        )}
                        {product.specifications.condition && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">État:</span>
                            <span className="font-medium text-gray-900">{product.specifications.condition}</span>
                          </div>
                        )}
                        {product.specifications.gender && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Genre:</span>
                            <span className="font-medium text-gray-900">{product.specifications.gender}</span>
                          </div>
                        )}
                        {product.specifications.price && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Prix:</span>
                            <span className="font-medium text-gray-900">{product.specifications.price}{product.specifications.negotiable && ' [Négociable]'}</span>
                          </div>
                        )}
                        {product.specifications.availability && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Disponibilité:</span>
                            <span className="font-medium text-gray-900">{product.specifications.availability}</span>
                          </div>
                        )}
                        {product.specifications.scopeOfDelivery && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Contenu de la livraison:</span>
                            <span className="font-medium text-gray-900">{product.specifications.scopeOfDelivery}</span>
                          </div>
                        )}
                        {product.specifications.itemNumber && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Numéro de l'article:</span>
                            <span className="font-medium text-gray-900">{product.specifications.itemNumber}</span>
                          </div>
                        )}
                        {product.specifications.bezel && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Lunette:</span>
                            <span className="font-medium text-gray-900">{product.specifications.bezel}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(product.specifications.caseMaterial || product.specifications.diameter || product.specifications.dialColor || product.specifications.caseShape || product.specifications.caseBack || product.specifications.crown || product.specifications.bezelMaterial || product.specifications.crystal || product.specifications.dialNumerals || product.specifications.dialType || product.specifications.date || product.specifications.hands || product.specifications.thickness || product.specifications.serialNumber) && (
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                        Boîtier & Cadran
                      </h3>
                      <div className="space-y-2 sm:space-y-2.5 text-sm sm:text-base">
                        {product.specifications.caseMaterial && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Matériau du boîtier:</span>
                            <span className="font-medium text-gray-900">{product.specifications.caseMaterial}</span>
                          </div>
                        )}
                        {product.specifications.diameter && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Taille:</span>
                            <span className="font-medium text-gray-900">{product.specifications.diameter}</span>
                          </div>
                        )}
                        {product.specifications.thickness && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Épaisseur:</span>
                            <span className="font-medium text-gray-900">{product.specifications.thickness}</span>
                          </div>
                        )}
                        {product.specifications.serialNumber && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Numéro de série:</span>
                            <span className="font-medium text-gray-900">{product.specifications.serialNumber}</span>
                          </div>
                        )}
                        {product.specifications.caseShape && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Forme du boîtier:</span>
                            <span className="font-medium text-gray-900">{product.specifications.caseShape}</span>
                          </div>
                        )}
                        {product.specifications.caseBack && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Fond du boîtier:</span>
                            <span className="font-medium text-gray-900">{product.specifications.caseBack}</span>
                          </div>
                        )}
                        {product.specifications.crown && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Couronne:</span>
                            <span className="font-medium text-gray-900">{product.specifications.crown}</span>
                          </div>
                        )}
                        {product.specifications.bezelMaterial && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Matériau de la lunette:</span>
                            <span className="font-medium text-gray-900">{product.specifications.bezelMaterial}</span>
                          </div>
                        )}
                        {product.specifications.crystal && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Verre:</span>
                            <span className="font-medium text-gray-900">{product.specifications.crystal}</span>
                          </div>
                        )}
                        {product.specifications.dialColor && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Couleur du cadran:</span>
                            <span className="font-medium text-gray-900">{product.specifications.dialColor}</span>
                          </div>
                        )}
                        {product.specifications.dialNumerals && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Chiffres du cadran:</span>
                            <span className="font-medium text-gray-900">{product.specifications.dialNumerals}</span>
                          </div>
                        )}
                        {product.specifications.dialType && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Type de cadran:</span>
                            <span className="font-medium text-gray-900">{product.specifications.dialType}</span>
                          </div>
                        )}
                        {product.specifications.date && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium text-gray-900">{product.specifications.date}</span>
                          </div>
                        )}
                        {product.specifications.hands && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Aiguilles:</span>
                            <span className="font-medium text-gray-900">{product.specifications.hands}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(product.specifications.movementType || product.specifications.powerReserve || product.specifications.baseCaliber || product.specifications.jewels) && (
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                        Calibre
                      </h3>
                      <div className="space-y-2 sm:space-y-2.5 text-sm sm:text-base">
                        {product.specifications.movementType && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Mouvement:</span>
                            <span className="font-medium text-gray-900">{product.specifications.movementType}</span>
                          </div>
                        )}
                        {product.specifications.baseCaliber && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Calibre de base:</span>
                            <span className="font-medium text-gray-900">{product.specifications.baseCaliber}</span>
                          </div>
                        )}
                        {product.specifications.powerReserve && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Réserve de marche:</span>
                            <span className="font-medium text-gray-900">{product.specifications.powerReserve}</span>
                          </div>
                        )}
                        {product.specifications.jewels && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Pierres (rubis):</span>
                            <span className="font-medium text-gray-900">{product.specifications.jewels}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {(product.specifications.waterResistance || product.specifications.functions || product.specifications.box || product.specifications.papers || product.specifications.warranty) && (
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">
                        Détails de la Montre
                      </h3>
                      <div className="space-y-2 sm:space-y-2.5 text-sm sm:text-base">
                        {product.specifications.waterResistance && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Étanchéité:</span>
                            <span className="font-medium text-gray-900">{product.specifications.waterResistance}</span>
                          </div>
                        )}
                        {product.specifications.functions && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Fonctions:</span>
                            <span className="font-medium text-gray-900">{product.specifications.functions}</span>
                          </div>
                        )}
                        {product.specifications.box && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Boîte:</span>
                            <span className="font-medium text-gray-900">{product.specifications.box}</span>
                          </div>
                        )}
                        {product.specifications.papers && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Papiers:</span>
                            <span className="font-medium text-gray-900">{product.specifications.papers}</span>
                          </div>
                        )}
                        {product.specifications.warranty && (
                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-600">Garantie:</span>
                            <span className="font-medium text-gray-900">{product.specifications.warranty}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 sm:gap-4">
              <button className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-gray-300 hover:border-black transition-colors rounded-sm">
                <Facebook size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-gray-300 hover:border-black transition-colors rounded-sm">
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-gray-300 hover:border-black transition-colors rounded-sm">
                <Share size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="my-16 sm:my-20 lg:my-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-tight uppercase">
            Livraison Gratuit + Essayages Avec Garantie 1 ans
          </h2>
          <StaggerTestimonials />
        </div>

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};
