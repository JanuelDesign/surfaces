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
  Database,
} from 'lucide-react';
import { CategoryId, Product, ProductColor, OrderItem, ClientOrderInfo } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { OrderDrawer } from './components/OrderDrawer';
import { PrintQuoteSheet } from './components/PrintQuoteSheet';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { getLocalizedProducts, getLocalizedCategories } from './i18n/localizedData';
import { getStoredProducts, syncFromGoogleSheets } from './utils/googleSheetsSync';
import { openRoomVisualizer } from './utils/constants';

const LOCAL_STORAGE_ORDER_KEY = 'surfaces_order_items_v2';
const LOCAL_STORAGE_CLIENT_KEY = 'surfaces_client_info_v2';

function AppContent() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [catalogVersion, setCatalogVersion] = useState(0);

  // Auto background synchronization with linked Google Sheet on app load
  useEffect(() => {
    syncFromGoogleSheets().then((res) => {
      if (res.success) {
        setCatalogVersion((v) => v + 1);
      }
    }).catch(() => {
      // silent background fallback
    });
  }, []);

  const baseProducts = useMemo(() => {
    // If user has custom products synced from Google Sheets, check and use them; otherwise use localized catalog
    const isCustomStored = localStorage.getItem('surfaces_custom_synced_products_v1');
    if (isCustomStored) {
      try {
        const custom = getStoredProducts();
        if (custom && custom.length > 0) {
          return custom;
        }
      } catch (e) {
        console.error('Error loading custom products', e);
      }
    }
    return getLocalizedProducts(language);
  }, [language, catalogVersion]);

  const categories = useMemo(() => getLocalizedCategories(language), [language]);

  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWearFilter, setSelectedWearFilter] = useState<string>('all');
  const [onlySamplesAvailable, setOnlySamplesAvailable] = useState<boolean>(false);

  // Modals & Drawers State
  const [activeDetailProduct, setActiveDetailProduct] = useState<Product | null>(null);
  const [activeDetailColor, setActiveDetailColor] = useState<ProductColor | undefined>(undefined);
  const [isGoogleSheetsOpen, setIsGoogleSheetsOpen] = useState<boolean>(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    return baseProducts.filter((product) => {
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
  }, [baseProducts, selectedCategory, onlySamplesAvailable, selectedWearFilter, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.id] = baseProducts.filter((p) => p.category === cat.id).length;
    });
    return counts;
  }, [categories, baseProducts]);

  const sampleCount = orderItems.filter((i) => i.itemType === 'sample').length;
  const orderCount = orderItems.filter((i) => i.itemType === 'order').length;

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0B] flex flex-col selection:bg-[#D9D9D9] selection:text-[#0B0B0B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-[#0B0B0B] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#262626] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0B0B0B] text-xs font-bold shrink-0">
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

      {/* Main Compact Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onClearSearch={() => setSearchQuery('')}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        orderItemCount={orderCount}
        sampleItemCount={sampleCount}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenDatabaseSync={() => setIsGoogleSheetsOpen(true)}
      />

      {/* Hero Banner only when on all categories and no search */}
      {selectedCategory === 'all' && !searchQuery && (
        <HeroSection
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenVisualizer={openRoomVisualizer}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        />
      )}

      {/* Sticky Fast Category Filter Bar */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        totalCount={baseProducts.length}
      />

      {/* Main Catalog Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Category Header & Secondary Quick Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#D9D9D9] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-white tracking-widest bg-[#0B0B0B] px-2.5 py-0.5 rounded-full">
                {selectedCategory === 'all'
                  ? (isEn ? 'Official 2026 Catalog' : 'Catálogo Oficial 2026')
                  : currentCategoryObj?.name}
              </span>
              <span className="text-xs text-[#6B6762]">•</span>
              <span className="text-xs text-[#6B6762] font-medium">
                {filteredProducts.length}{' '}
                {isEn
                  ? `${filteredProducts.length === 1 ? 'collection' : 'collections'} available`
                  : `${filteredProducts.length === 1 ? 'colección disponible' : 'colecciones disponibles'}`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B0B0B] mt-1.5 tracking-tight">
              {selectedCategory === 'all'
                ? (isEn ? 'SPC Rigid Core Flooring & Architectural Trims' : 'Pisos SPC Rigid Core & Molduras de Precisión')
                : currentCategoryObj?.tagline}
            </h2>
            {selectedCategory !== 'all' && (
              <p className="text-xs text-[#6B6762] mt-1 max-w-2xl">
                {currentCategoryObj?.description}
              </p>
            )}
          </div>

          {/* Quick Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter by Wear layer */}
            <select
              value={selectedWearFilter}
              onChange={(e) => setSelectedWearFilter(e.target.value)}
              className="bg-[#F5F5F5] hover:bg-white text-[#0B0B0B] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D9D9D9] focus:border-[#0B0B0B] outline-none cursor-pointer transition"
            >
              <option value="all">{isEn ? 'All Wear Layers' : 'Todas las Capas de Uso'}</option>
              <option value="20 Mil">20 Mil ({isEn ? 'Residential / Commercial' : 'Residencial/Comercial'})</option>
              <option value="22 Mil">22 Mil ({isEn ? 'Heavy Commercial' : 'Ultra Resistente'})</option>
            </select>

            {/* Hand samples available filter */}
            <button
              onClick={() => setOnlySamplesAvailable(!onlySamplesAvailable)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                onlySamplesAvailable
                  ? 'bg-[#0B0B0B] border-[#0B0B0B] text-white shadow-xs'
                  : 'bg-white border-[#D9D9D9] text-[#0B0B0B] hover:bg-[#F5F5F5]'
              }`}
            >
              <Sparkles size={13} className={onlySamplesAvailable ? 'text-white' : 'text-[#6B6762]'} />
              <span>{isEn ? 'Samples Only' : 'Solo Muestras'}</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
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
                onOpenVisualizerWithProduct={() => openRoomVisualizer()}
                onAddSample={(prod, color) => handleAddSample(prod, color)}
                onAddToOrder={(prod, color) => {
                  setActiveDetailProduct(prod);
                  setActiveDetailColor(color);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#D9D9D9] p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F5F5F5] text-[#0B0B0B] flex items-center justify-center mx-auto border border-[#D9D9D9]">
              <Search size={24} />
            </div>
            <h3 className="text-base font-bold text-[#0B0B0B]">
              {isEn ? 'No products found' : 'No se encontraron productos'}
            </h3>
            <p className="text-xs text-[#6B6762]">
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
              className="px-5 py-2.5 bg-[#0B0B0B] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs transition-colors cursor-pointer"
            >
              {isEn ? 'Reset All Filters' : 'Restablecer Filtros'}
            </button>
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar */}
      {(orderCount > 0 || sampleCount > 0) && (
        <div className="fixed bottom-5 right-5 z-40 animate-in slide-in-from-bottom duration-200">
          <button
            onClick={() => setIsOrderDrawerOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0B0B0B] hover:bg-[#262626] text-white font-extrabold text-xs sm:text-sm shadow-2xl border border-white/20 transition transform hover:scale-105 cursor-pointer"
          >
            <ShoppingCart size={18} className="text-white" />
            <span>{isEn ? 'View Quote' : 'Ver Pedido'} ({orderCount + sampleCount})</span>
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeDetailProduct && (
        <ProductDetailModal
          product={activeDetailProduct}
          initialColor={activeDetailColor}
          onClose={() => setActiveDetailProduct(null)}
          onOpenVisualizer={() => openRoomVisualizer()}
          onAddSample={(prod, color) => handleAddSample(prod, color)}
          onAddToOrder={(prod, color, qty, unit, sqft, notes) => {
            handleAddToOrder(prod, color, qty, unit, sqft, notes);
          }}
        />
      )}

      {/* Google Sheets Database Sync Modal */}
      {isGoogleSheetsOpen && (
        <GoogleSheetsModal
          onClose={() => setIsGoogleSheetsOpen(false)}
          onSyncComplete={() => {
            setCatalogVersion((v) => v + 1);
            showToast(isEn ? 'Catalog refreshed from database' : 'Catálogo actualizado desde la base de datos');
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={baseProducts}
        onSelectProduct={(prod, color) => {
          setActiveDetailProduct(prod);
          setActiveDetailColor(color || prod.colors[0]);
        }}
        onSelectCategory={setSelectedCategory}
        currentSearchQuery={searchQuery}
        onSetSearchQuery={setSearchQuery}
      />

      {/* Printable Sheet for printing / PDF */}
      <PrintQuoteSheet orderItems={orderItems} clientInfo={clientInfo} />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenVisualizer={openRoomVisualizer}
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
