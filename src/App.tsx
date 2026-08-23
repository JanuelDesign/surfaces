import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  ShoppingCart,
  Eye,
  Sparkles,
  Layers,
  Footprints,
  ShieldCheck,
  Package,
  CheckCircle2,
  Phone,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { CategoryId, Product, ProductColor, OrderItem, ClientOrderInfo } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RoomVisualizerModal } from './components/RoomVisualizerModal';
import { StairsMoldingsGuide } from './components/StairsMoldingsGuide';
import { OrderDrawer } from './components/OrderDrawer';
import { PrintQuoteSheet } from './components/PrintQuoteSheet';
import { Footer } from './components/Footer';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { getLocalizedProducts, getLocalizedCategories } from './i18n/localizedData';

const LOCAL_STORAGE_ORDER_KEY = 'surfaces_order_items_v2';
const LOCAL_STORAGE_CLIENT_KEY = 'surfaces_client_info_v2';

function AppContent() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const products = useMemo(() => getLocalizedProducts(language), [language]);
  const categories = useMemo(() => getLocalizedCategories(language), [language]);

  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWearFilter, setSelectedWearFilter] = useState<string>('all');
  const [onlySamplesAvailable, setOnlySamplesAvailable] = useState<boolean>(false);

  // Modals & Drawers State
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [activeDetailColor, setActiveDetailColor] = useState<ProductColor | undefined>(undefined);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState<boolean>(false);
  const [visualizerProduct, setVisualizerProduct] = useState<Product | null>(null);
  const [visualizerColor, setVisualizerColor] = useState<ProductColor | null>(null);
  const [isStairsGuideOpen, setIsStairsGuideOpen] = useState<boolean>(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Order Items State with localStorage persistence
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    try {
      const saved =
        localStorage.getItem(LOCAL_STORAGE_ORDER_KEY) ||
        localStorage.getItem('quicksurfaces_order_items_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Client Info State
  const [clientInfo, setClientInfo] = useState<ClientOrderInfo>(() => {
    try {
      const saved =
        localStorage.getItem(LOCAL_STORAGE_CLIENT_KEY) ||
        localStorage.getItem('quicksurfaces_client_info_v2');
      return saved
        ? JSON.parse(saved)
        : {
            fullName: '',
            companyOrRole: '',
            phone: '',
            email: '',
            projectCity: '',
            projectAddress: '',
            needsInstallation: false,
            projectType: 'Residencial',
            deliveryTimeframe: 'Immediate',
            additionalNotes: '',
          };
    } catch {
      return {
        fullName: '',
        companyOrRole: '',
        phone: '',
        email: '',
        projectCity: '',
        projectAddress: '',
        needsInstallation: false,
        projectType: 'Residencial',
        deliveryTimeframe: 'Immediate',
        additionalNotes: '',
      };
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDER_KEY, JSON.stringify(orderItems));
    } catch {
      // ignore
    }
  }, [orderItems]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CLIENT_KEY, JSON.stringify(clientInfo));
    } catch {
      // ignore
    }
  }, [clientInfo]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add Hand Sample
  const handleAddSample = (product: Product, color: ProductColor) => {
    const existingIndex = orderItems.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedColor.name === color.name &&
        item.itemType === 'sample'
    );

    if (existingIndex >= 0) {
      showToast(
        isEn
          ? `Sample for ${color.name} is already in your quote list`
          : `Ya tienes la muestra de ${color.name} en tu lista`
      );
      return;
    }

    const newItem: OrderItem = {
      id: `sample_${product.id}_${color.name}_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      collectionName: product.collection,
      categoryName: product.category,
      selectedColor: color,
      itemType: 'sample',
      quantity: 1,
      unit: 'sample_unit',
      notes: isEn
        ? `Physical hand sample (${color.code || 'standard'})`
        : `Muestra física de mano (${color.code || 'estándar'})`,
    };

    setOrderItems((prev) => [newItem, ...prev]);
    showToast(
      isEn
        ? `✓ Sample of ${color.name} added to your list`
        : `✓ Muestra de ${color.name} agregada a tu lista`
    );
  };

  // Add Product / Boxes to Quote Order
  const handleAddToOrder = (
    product: Product,
    color: ProductColor,
    quantity: number = 10,
    unit: 'boxes' | 'sqft' | 'linear_ft' | 'pieces' = 'boxes',
    estimatedSqft: number = 0,
    notes?: string
  ) => {
    const existingIndex = orderItems.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedColor.name === color.name &&
        item.itemType === 'order' &&
        item.unit === unit
    );

    if (existingIndex >= 0) {
      // update quantity
      setOrderItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                estimatedSqft: (item.estimatedSqft || 0) + estimatedSqft,
              }
            : item
        )
      );
      showToast(
        isEn
          ? `Added +${quantity} ${unit} of ${color.name} to your quote`
          : `Se agregaron +${quantity} ${unit} de ${color.name} a tu pedido`
      );
    } else {
      const newItem: OrderItem = {
        id: `order_${product.id}_${color.name}_${Date.now()}`,
        productId: product.id,
        productName: product.name,
        collectionName: product.collection,
        categoryName: product.category,
        selectedColor: color,
        itemType: 'order',
        quantity,
        unit,
        estimatedSqft,
        notes: notes || `${isEn ? 'Color' : 'Color'}: ${color.name} (${color.code || ''})`,
      };
      setOrderItems((prev) => [newItem, ...prev]);
      showToast(
        isEn
          ? `✓ ${quantity} ${unit} of ${color.name} added to quote`
          : `✓ ${quantity} ${unit} de ${color.name} agregados al pedido`
      );
    }
  };

  // Update Item Quantity in Drawer
  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear All
  const handleClearOrder = () => {
    if (
      window.confirm(
        isEn
          ? 'Are you sure you want to clear your entire order list and samples?'
          : '¿Está seguro de vaciar toda su lista de pedido y muestras?'
      )
    ) {
      setOrderItems([]);
    }
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Samples available filter
      if (onlySamplesAvailable && !product.handSamplesAvailable) {
        return false;
      }

      // Wear Layer filter
      if (selectedWearFilter !== 'all') {
        const wear = product.specs.wearLayer || '';
        if (!wear.toLowerCase().includes(selectedWearFilter.toLowerCase())) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCollection = product.collection.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesColor = product.colors.some(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            (c.code && c.code.toLowerCase().includes(q))
        );
        const matchesSpecs =
          (product.specs.wearLayer && product.specs.wearLayer.toLowerCase().includes(q)) ||
          (product.specs.finished && product.specs.finished.toLowerCase().includes(q)) ||
          (product.specs.origin && product.specs.origin.toLowerCase().includes(q));

        if (!matchesName && !matchesCollection && !matchesSubtitle && !matchesColor && !matchesSpecs) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, onlySamplesAvailable, selectedWearFilter, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.id] = products.filter((p) => p.category === cat.id).length;
    });
    return counts;
  }, [categories, products]);

  const sampleCount = orderItems.filter((i) => i.itemType === 'sample').length;
  const orderCount = orderItems.filter((i) => i.itemType === 'order').length;

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fcfdff] text-slate-900 flex flex-col selection:bg-[#93b2f8]/30 selection:text-[#0a1680]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0a1680] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#93b2f8]/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#f1b94c] flex items-center justify-center text-[#0a1680] text-xs font-bold shrink-0">
            ✓
          </div>
          <span className="text-xs font-semibold text-white">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/70 hover:text-white ml-1 cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        orderItemCount={orderCount}
        sampleItemCount={sampleCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenVisualizer={() => {
          setVisualizerProduct(null);
          setVisualizerColor(null);
          setIsVisualizerOpen(true);
        }}
        onOpenStairsGuide={() => setIsStairsGuideOpen(true)}
      />

      {/* Hero Banner only when on all categories or no search */}
      {selectedCategory === 'all' && !searchQuery && (
        <HeroSection
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenVisualizer={() => {
            setVisualizerProduct(null);
            setVisualizerColor(null);
            setIsVisualizerOpen(true);
          }}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        />
      )}

      {/* Sticky Fast Category Filter Bar */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        totalCount={products.length}
      />

      {/* Main Catalog Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Active Category Header & Secondary Quick Filters - Bento Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#93b2f8]/30 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#0a1680] tracking-widest bg-[#93b2f8]/20 px-2 py-0.5 rounded-sm">
                {selectedCategory === 'all'
                  ? (isEn ? 'Official 2026 Catalog' : 'Catálogo Completo 2026')
                  : currentCategoryObj?.name}
              </span>
              <span className="text-xs text-[#64748b]">•</span>
              <span className="text-xs text-[#64748b] font-medium">
                {filteredProducts.length}{' '}
                {isEn
                  ? `${filteredProducts.length === 1 ? 'collection' : 'collections'} available`
                  : `${filteredProducts.length === 1 ? 'colección disponible' : 'colecciones disponibles'}`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1680] mt-1 tracking-tight">
              {selectedCategory === 'all'
                ? (isEn ? 'High-Performance Surfaces, Flooring & Panels' : 'Superficies, Pisos & Revestimientos')
                : currentCategoryObj?.tagline}
            </h2>
            {selectedCategory !== 'all' && (
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                {currentCategoryObj?.description}
              </p>
            )}
          </div>

          {/* Quick Filter Controls - Bento Pill Style */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by Wear layer */}
            <select
              value={selectedWearFilter}
              onChange={(e) => setSelectedWearFilter(e.target.value)}
              className="bg-white hover:bg-slate-50 text-[#0a1680] text-xs font-semibold px-3 py-2 rounded-full border border-slate-200 focus:border-[#0a1680] outline-none cursor-pointer"
            >
              <option value="all">{isEn ? 'All Wear Layers' : 'Todas las Capas de Uso'}</option>
              <option value="20 Mil">20 Mil ({isEn ? 'Residential / Commercial' : 'Residencial/Comercial'})</option>
              <option value="22 Mil">22 Mil ({isEn ? 'Heavy Commercial' : 'Ultra Resistente'})</option>
              <option value="AC5">AC5 ({isEn ? 'Heavy Traffic' : 'Tráfico Pesado'})</option>
              <option value="AC6">AC6 ({isEn ? 'Intense Commercial - Finsa' : 'Comercial Intenso - Finsa'})</option>
            </select>

            {/* Hand samples available filter */}
            <button
              onClick={() => setOnlySamplesAvailable(!onlySamplesAvailable)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                onlySamplesAvailable
                  ? 'bg-[#0a1680] border-[#0a1680] text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-[#0a1680] hover:bg-slate-50'
              }`}
            >
              <Sparkles size={13} className={onlySamplesAvailable ? 'text-[#fbedb0]' : 'text-[#f1b94c]'} />
              <span>{isEn ? 'Samples Only' : 'Solo Muestras'}</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid - Bento Layout */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={(prod, color) => {
                  setActiveDetailProduct(prod);
                  setActiveDetailColor(color);
                }}
                onOpenVisualizerWithProduct={(prod, color) => {
                  setVisualizerProduct(prod);
                  setVisualizerColor(color);
                  setIsVisualizerOpen(true);
                }}
                onAddSample={(prod, color) => handleAddSample(prod, color)}
                onAddToOrder={(prod, color) => {
                  setActiveDetailProduct(prod);
                  setActiveDetailColor(color);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#93b2f8]/20 text-[#0a1680] flex items-center justify-center mx-auto border border-[#93b2f8]/40">
              <Search size={26} />
            </div>
            <h3 className="text-lg font-bold text-[#0a1680]">
              {isEn ? 'No products found' : 'No se encontraron productos'}
            </h3>
            <p className="text-xs text-slate-600">
              {isEn
                ? 'No matching results found for current filters. Try changing your search query or reset filters.'
                : 'No hay coincidencias con los filtros actuales. Intente cambiar los términos de búsqueda o limpiar los filtros.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedWearFilter('all');
                setOnlySamplesAvailable(false);
              }}
              className="px-5 py-2.5 bg-[#0a1680] hover:bg-[#081268] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs transition-colors cursor-pointer"
            >
              {isEn ? 'Reset All Filters' : 'Restablecer Filtros'}
            </button>
          </div>
        )}

        {/* Visual Callout for Stair Treads & Moldings */}
        <div className="bg-[#0a1680] text-white rounded-2xl p-6 sm:p-8 border border-[#0a1680] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-72 h-72 bg-[#93b2f8]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1b94c] text-[#0a1680] text-[10px] font-bold uppercase tracking-wider">
              <Footprints size={13} />
              <span>{isEn ? 'FINISHES & TRIMS' : 'TERMINACIONES & ACABADOS'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              {isEn ? 'Color-Matched Stair Treads & Transition Moldings' : 'Gradas a Juego Exacto & Molduras de Transición'}
            </h3>
            <p className="text-[#93b2f8] text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
              {isEn
                ? 'Complete your project with custom Double Rounded or Square Step treads, pine baseboards, and CM Reducer / T-Moldings precision-matched to your floor color.'
                : 'Complete su proyecto con gradas personalizadas Double Rounded o Square Step, zócalos de pino y molduras CM Reducer / T-Molding diseñadas al mismo tono de sus pisos.'}
            </p>
          </div>

          <button
            onClick={() => setIsStairsGuideOpen(true)}
            className="shrink-0 px-6 py-3 rounded-full bg-[#f1b94c] hover:bg-[#e0a83b] text-[#0a1680] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md transition transform hover:scale-102 relative z-10 cursor-pointer"
          >
            {isEn ? 'Explore Stairs & Moldings Guide' : 'Ver Guía de Gradas & Molduras'}
          </button>
        </div>
      </main>

      {/* Floating Bottom Action Bar on Mobile / Desktop */}
      {(orderCount > 0 || sampleCount > 0) && (
        <div className="fixed bottom-5 right-5 z-40 animate-in slide-in-from-bottom duration-200">
          <button
            onClick={() => setIsOrderDrawerOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0a1680] hover:bg-[#081268] text-white font-extrabold text-xs sm:text-sm shadow-2xl shadow-[#0a1680]/40 border-2 border-[#93b2f8] transition transform hover:scale-105 cursor-pointer"
          >
            <ShoppingCart size={18} className="text-[#f1b94c]" />
            <span>{isEn ? 'View Quote' : 'Ver Pedido'} ({orderCount + sampleCount})</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#f1b94c] animate-ping"></span>
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          initialColor={activeDetailColor}
          onClose={() => setActiveDetailProduct(null)}
          onOpenVisualizer={(prod, color) => {
            setActiveDetailProduct(null);
            setVisualizerProduct(prod);
            setVisualizerColor(color);
            setIsVisualizerOpen(true);
          }}
          onAddSample={(prod, color) => handleAddSample(prod, color)}
          onAddToOrder={(prod, color, qty, unit, sqft, notes) => {
            handleAddToOrder(prod, color, qty, unit, sqft, notes);
          }}
        />
      )}

      {/* 3D Room Visualizer Modal */}
      {isVisualizerOpen && (
        <RoomVisualizerModal
          initialProduct={visualizerProduct}
          initialColor={visualizerColor}
          onClose={() => setIsVisualizerOpen(false)}
          onAddSample={(prod, color) => handleAddSample(prod, color)}
          onAddToOrder={(prod, color) => {
            handleAddToOrder(prod, color, 10, 'boxes', 0);
            setIsOrderDrawerOpen(true);
          }}
        />
      )}

      {/* Stairs & Moldings Guide Modal */}
      {isStairsGuideOpen && (
        <StairsMoldingsGuide
          onClose={() => setIsStairsGuideOpen(false)}
          onAddToOrder={(prod, color, qty, unit, sqft, notes) => {
            handleAddToOrder(prod, color, qty, unit, sqft, notes);
            setIsOrderDrawerOpen(true);
          }}
        />
      )}

      {/* Order & Hand Sample Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        clientInfo={clientInfo}
        onUpdateClientInfo={(updates) => setClientInfo((prev) => ({ ...prev, ...updates }))}
      />

      {/* Printable Sheet for printing / PDF */}
      <PrintQuoteSheet orderItems={orderItems} clientInfo={clientInfo} />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenVisualizer={() => {
          setVisualizerProduct(null);
          setVisualizerColor(null);
          setIsVisualizerOpen(true);
        }}
        onOpenStairsGuide={() => setIsStairsGuideOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
