import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'CROWN TIME - Premium Swiss Watches | Patek Philippe, Audemars Piguet',
  description = 'Discover the world\'s most prestigious luxury watches. Authentic Swiss timepieces from Patek Philippe, Audemars Piguet, and Cartier. Free worldwide shipping and 3-year warranty.',
  keywords = 'luxury watches, Swiss watches, Patek Philippe, Audemars Piguet, Cartier, premium timepieces, authentic watches, luxury jewelry',
  image = 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
  url = 'https://crowntime.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="LuxuryTime" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="CROWN TIME" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@crowntime" />
      <meta name="twitter:creator" content="@crowntime" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#D4AF37" />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="CROWN TIME" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "CROWN TIME",
          "description": description,
          "url": url,
          "logo": "https://crowntime.com/logo.png",
          "image": image,
          "telephone": "+41 22 123 4567",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Luxury Avenue",
            "addressLocality": "Geneva",
            "addressCountry": "Switzerland"
          },
          "sameAs": [
            "https://facebook.com/crowntime",
            "https://instagram.com/crowntime",
            "https://twitter.com/crowntime"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Luxury Watches",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Swiss Luxury Watches",
                  "category": "Watches"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};