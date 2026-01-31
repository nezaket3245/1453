"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EGEPEN PRODUCT SHOWROOM COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Premium product showcase for Egepen Deceuninck PVC profiles.
 * Features technical specifications tables, catalog downloads,
 * and interactive product selection.
 */

// Egepen Product Series Data
export const egepenProducts = [
  {
    id: "legend",
    name: "Legend",
    tagline: "Premium Performans",
    description: "6 odalı üstün ısı yalıtım değerleri ile enerji tasarrufunda lider seri. Şık tasarım ve maksimum konfor.",
    image: "/images/pvc/legend-profile.png",
    catalogUrl: "/catalogs/egepen-legend-katalog.pdf",
    badge: "En Çok Tercih Edilen",
    specs: {
      profileWidth: "80mm",
      chambers: 6,
      thermalInsulation: "1.0 W/m²K",
      soundInsulation: "45 dB",
      windResistance: "C5 / B5",
      airPermeability: "Sınıf 4",
      waterTightness: "E1500",
      securityClass: "RC2",
    },
    features: [
      "6 Odalı Profil Yapısı",
      "Üstün Isı Yalıtımı",
      "Çelik Takviyeli",
      "Kurşunsuz Formülasyon",
      "50 Yıl Kullanım Ömrü",
      "Kolay Temizlenebilir Yüzey",
    ],
    colors: ["Beyaz", "Krem", "Antrasit Gri", "Altın Meşe", "Maun"],
  },
  {
    id: "legend-art",
    name: "Legend Art",
    tagline: "Estetik ve Performans",
    description: "Benzersiz kontur tasarımı ile modern mimariye uyum. Yüksek estetik değer ve üstün teknik özellikler.",
    image: "/images/pvc/legend-art-profile.png",
    catalogUrl: "/catalogs/egepen-legend-art-katalog.pdf",
    badge: "Tasarım Ödüllü",
    specs: {
      profileWidth: "80mm",
      chambers: 6,
      thermalInsulation: "0.95 W/m²K",
      soundInsulation: "47 dB",
      windResistance: "C5 / B5",
      airPermeability: "Sınıf 4",
      waterTightness: "E1500",
      securityClass: "RC2",
    },
    features: [
      "Benzersiz Kontur Tasarım",
      "6 Odalı Profil",
      "A Sınıfı Enerji Verimliliği",
      "Entegre Pervaz Sistemi",
      "Çelik Takviyeli",
      "UV Dayanıklı",
    ],
    colors: ["Beyaz", "Krem", "Antrasit Gri", "Pirinç", "Gümüş Gri"],
  },
  {
    id: "zendow",
    name: "Zendow / Zen Spirit",
    tagline: "Minimalist Şıklık",
    description: "Zarif çizgileri ve ince profil görünümü ile minimalist tasarım sevenlerin tercihi.",
    image: "/images/pvc/zendow-profile.png",
    catalogUrl: "/catalogs/egepen-zendow-katalog.pdf",
    badge: "Minimalist",
    specs: {
      profileWidth: "70mm",
      chambers: 5,
      thermalInsulation: "1.2 W/m²K",
      soundInsulation: "42 dB",
      windResistance: "C4 / B4",
      airPermeability: "Sınıf 4",
      waterTightness: "E1200",
      securityClass: "RC1",
    },
    features: [
      "İnce Görünüm Çerçeve",
      "5 Odalı Profil",
      "Geniş Cam Alanı",
      "Modern Tasarım",
      "Ekonomik Çözüm",
      "Hızlı Montaj",
    ],
    colors: ["Beyaz", "Krem", "Antrasit Gri"],
  },
  {
    id: "hs76",
    name: "HS76 Sürme Sistem",
    tagline: "Geniş Açıklıklar",
    description: "Büyük cam yüzeyleri ve ferah yaşam alanları için ideal sürme pencere ve kapı sistemi.",
    image: "/images/pvc/hs76-profile.png",
    catalogUrl: "/catalogs/egepen-hs76-katalog.pdf",
    badge: "Sürme Sistem",
    specs: {
      profileWidth: "76mm",
      chambers: 5,
      thermalInsulation: "1.4 W/m²K",
      soundInsulation: "40 dB",
      windResistance: "C3 / B3",
      airPermeability: "Sınıf 3",
      waterTightness: "E900",
      securityClass: "RC1",
    },
    features: [
      "Büyük Cam Yüzeyleri",
      "Kolay Açılır Kapanır",
      "Yer Tasarrufu",
      "Panoramik Görünüm",
      "Çoklu Kanat Seçeneği",
      "Eşiksiz Geçiş Opsiyonu",
    ],
    colors: ["Beyaz", "Krem", "Antrasit Gri", "Altın Meşe"],
  },
];

// Technical Specification Labels (Turkish)
const specLabels: Record<string, string> = {
  profileWidth: "Profil Genişliği",
  chambers: "Oda Sayısı",
  thermalInsulation: "Isı Yalıtımı (Uf)",
  soundInsulation: "Ses Yalıtımı",
  windResistance: "Rüzgar Dayanımı",
  airPermeability: "Hava Geçirgenliği",
  waterTightness: "Su Sızdırmazlığı",
  securityClass: "Güvenlik Sınıfı",
};

interface EgepenShowroomProps {
  onProductSelect?: (productId: string) => void;
  showCatalogDownload?: boolean;
}

export function EgepenShowroom({ 
  onProductSelect, 
  showCatalogDownload = true 
}: EgepenShowroomProps) {
  const [selectedProduct, setSelectedProduct] = useState(egepenProducts[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductSelect = (product: typeof egepenProducts[0]) => {
    setSelectedProduct(product);
    onProductSelect?.(product.id);
    
    // Track product view
    analytics.trackEvent("product_view", {
      product_name: product.name,
      product_id: product.id,
    });
  };

  const handleCatalogDownload = (product: typeof egepenProducts[0]) => {
    // Track catalog download
    analytics.trackCatalogDownload(
      `${product.name} Katalog`,
      product.id
    );
    
    // Open PDF in new tab
    window.open(product.catalogUrl, "_blank");
  };

  const handleQuoteRequest = () => {
    analytics.trackQuoteRequest(selectedProduct.name, "showroom");
    setIsModalOpen(true);
  };

  return (
    <section 
      id="egepen-showroom" 
      className="section bg-gradient-to-b from-white to-neutral-50"
      aria-labelledby="showroom-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Egepen Deceuninck
          </motion.span>
          
          <motion.h2
            id="showroom-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-neutral-900 mb-6"
          >
            PVC Pencere <span className="text-primary-600">Serileri</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600"
          >
            Avrupa'nın lider profil üreticisi Deceuninck teknolojisi ile üretilen 
            Egepen sistemleri. Her seriye tıklayarak teknik detayları inceleyin.
          </motion.p>
        </div>

        {/* Product Series Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {egepenProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductSelect(product)}
              aria-pressed={selectedProduct.id === product.id}
              className={`
                relative px-6 py-3 rounded-xl font-bold text-sm transition-all
                ${selectedProduct.id === product.id
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                  : "bg-white text-neutral-700 hover:bg-primary-50 border border-neutral-200"
                }
              `}
            >
              {product.badge && selectedProduct.id === product.id && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-secondary-500 text-white text-[10px] font-bold rounded-full">
                  {product.badge}
                </span>
              )}
              {product.name}
            </button>
          ))}
        </div>

        {/* Selected Product Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Product Image & Quick Info */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 shadow-2xl">
                <OptimizedImage
                  src={selectedProduct.image}
                  alt={`Egepen ${selectedProduct.name} PVC Profil`}
                  fill
                  className="object-contain p-8"
                />
                
                {/* Badge */}
                {selectedProduct.badge && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-secondary-500 text-white text-sm font-bold rounded-full shadow-lg">
                    ⭐ {selectedProduct.badge}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleQuoteRequest}
                  className="flex-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Fiyat Teklifi Al
                </Button>
                
                {showCatalogDownload && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleCatalogDownload(selectedProduct)}
                    className="flex-1"
                  >
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M9 15h6M12 18V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Katalog İndir (PDF)
                  </Button>
                )}
              </div>

              {/* Color Options */}
              <div className="mt-8 p-6 bg-white rounded-2xl border border-neutral-200">
                <h4 className="font-bold text-neutral-900 mb-4">🎨 Renk Seçenekleri</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              {/* Product Title */}
              <div className="mb-8">
                <h3 className="text-3xl font-black text-neutral-900 mb-2">
                  Egepen {selectedProduct.name}
                </h3>
                <p className="text-lg text-primary-600 font-bold mb-4">
                  {selectedProduct.tagline}
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Technical Specs Table */}
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm mb-8">
                <div className="bg-primary-600 text-white px-6 py-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Teknik Özellikler
                  </h4>
                </div>
                <table className="w-full">
                  <tbody>
                    {Object.entries(selectedProduct.specs).map(([key, value], index) => (
                      <tr 
                        key={key}
                        className={index % 2 === 0 ? "bg-neutral-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 font-medium text-neutral-700 border-b border-neutral-100">
                          {specLabels[key] || key}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-primary-600 border-b border-neutral-100">
                          {typeof value === "number" ? `${value} Oda` : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 border border-primary-100">
                <h4 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm">✓</span>
                  Öne Çıkan Özellikler
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All Products Grid (Small thumbnails) */}
        <div className="mt-16 pt-16 border-t border-neutral-200">
          <h3 className="text-2xl font-bold text-center text-neutral-900 mb-8">
            Tüm Egepen Serileri
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {egepenProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`
                  group p-4 rounded-2xl border-2 transition-all text-left
                  ${selectedProduct.id === product.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50"
                  }
                `}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-3">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-neutral-900">{product.name}</h4>
                <p className="text-xs text-neutral-500">{product.tagline}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EgepenShowroom;
