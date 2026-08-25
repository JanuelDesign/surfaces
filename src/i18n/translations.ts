export type Language = 'en' | 'es';

export interface Translations {
  nav: {
    brand: string;
    phoneAssistance: string;
    searchPlaceholder: string;
    stairsGuide: string;
    visualizer: string;
    myQuote: string;
    samplesShort: string;
    languageToggle: string;
    langEn: string;
    langEs: string;
  };
  hero: {
    badgeOfficial: string;
    badgeWaterproof: string;
    title1: string;
    titleHighlight: string;
    subtitle: string;
    btnVisualizer: string;
    btnSamples: string;
    cardSpcTitle: string;
    cardSpcBadge: string;
    cardSpcDesc: string;
    cardSpcUse: string;
    cardUltraTitle: string;
    cardUltraBadge: string;
    cardUltraDesc: string;
    cardUltraUse: string;
    cardTileTitle: string;
    cardTileBadge: string;
    cardTileDesc: string;
    cardTileUse: string;
    cardWallTitle: string;
    cardWallBadge: string;
    cardWallDesc: string;
    cardWallUse: string;
    viewModels: string;
    viewDesigns: string;
    viewOptions: string;
  };
  filters: {
    allCategories: string;
    allProducts: string;
    showing: string;
    products: string;
    filterWearLayer: string;
    filterAllWear: string;
    onlySamples: string;
    clearFilters: string;
    noProductsFound: string;
    tryAdjusting: string;
    activeFilters: string;
    category: string;
  };
  productCard: {
    samplesAvailable: string;
    view3D: string;
    viewDetails: string;
    orderSample: string;
    sampleAdded: string;
    requestSample: string;
    colorsAvailable: string;
    thickness: string;
    wearLayer: string;
    sqftBox: string;
    origin: string;
    viewInVisualizer: string;
    addToQuote: string;
  };
  detailModal: {
    specifications: string;
    calculatorTitle: string;
    roomArea: string;
    wasteMargin: string;
    calculatedBoxes: string;
    totalAreaWithWaste: string;
    applyToOrder: string;
    selectColor: string;
    colorDetails: string;
    certifications: string;
    recommendedUse: string;
    orderQuantity: string;
    orderNotes: string;
    notesPlaceholder: string;
    addToQuoteBtn: string;
    addedToQuoteSuccess: string;
    orderSampleBtn: string;
    sampleSuccess: string;
    openIn3D: string;
    features: string;
    warrantyResidential: string;
    warrantyCommercial: string;
    installationSystem: string;
    plankDimensions: string;
    coreMaterial: string;
    integratedPadding: string;
    edgeProfile: string;
    abrasionClass: string;
    boxSqft: string;
    piecesBox: string;
    wearLayer: string;
  };
  visualizer: {
    title: string;
    tagline: string;
    compareMode: string;
    lighting: string;
    daylight: string;
    warm: string;
    studio: string;
    selectCollection: string;
    activeTone: string;
    secondaryTone: string;
    coverage: string;
    wearLayer: string;
    thickness: string;
    requestSampleOf: string;
    sampleAdded: string;
    addThisFloorToOrder: string;
    roomNames: Record<string, string>;
    roomSubtitles: Record<string, string>;
  };
  stairsGuide: {
    badge: string;
    title: string;
    subtitle: string;
    tabStairs: string;
    tabMoldings: string;
    tabBaseboards: string;
    tabWpc: string;
    addTreadSample: string;
    addMolding: string;
    addBaseboard: string;
    addWpcSample: string;
    stairProfileTitle: string;
    stairProfileDesc: string;
    moldingTitle: string;
    moldingDesc: string;
    baseboardTitle: string;
    baseboardDesc: string;
  };
  drawer: {
    title: string;
    subtitle: string;
    tabItems: string;
    tabClient: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreBtn: string;
    productsList: string;
    samplesList: string;
    boxes: string;
    sqft: string;
    linearFt: string;
    pieces: string;
    sampleUnits: string;
    totalBoxes: string;
    totalSqft: string;
    totalSamples: string;
    totalItems: string;
    clearCart: string;
    continueBtn: string;
    fullName: string;
    phone: string;
    email: string;
    companyRole: string;
    city: string;
    address: string;
    projectType: string;
    projectTypes: {
      residential: string;
      commercial: string;
      contractor: string;
      design: string;
      other: string;
    };
    deliveryTime: string;
    timeframes: {
      immediate: string;
      oneTwoWeeks: string;
      oneMonth: string;
      quoteOnly: string;
    };
    includeInstallation: string;
    installationDesc: string;
    notes: string;
    notesPlaceholder: string;
    submitWhatsApp: string;
    printPDF: string;
    copySummary: string;
    summaryCopied: string;
  };
  orderDrawer: {
    title: string;
    summary: string;
    emptyTitle: string;
    emptyDesc: string;
    productsList: string;
    samplesList: string;
    boxes: string;
    sqft: string;
    linearFt: string;
    pieces: string;
    sampleUnits: string;
    clientInfoTitle: string;
    fullName: string;
    companyOrRole: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    projectType: string;
    projectTypes: {
      residential: string;
      commercial: string;
      contractor: string;
      design: string;
      other: string;
    };
    deliveryTime: string;
    timeframes: {
      immediate: string;
      oneTwoWeeks: string;
      oneMonth: string;
      quoteOnly: string;
    };
    installationLabel: string;
    installationDesc: string;
    additionalNotes: string;
    notesPlaceholder: string;
    exportPdf: string;
    sendWhatsApp: string;
    totalItems: string;
    totalBoxes: string;
    totalEstSqft: string;
    clearList: string;
  };
  printQuote: {
    quoteTitle: string;
    date: string;
    ref: string;
    clientData: string;
    client: string;
    company: string;
    phone: string;
    email: string;
    city: string;
    projectType: string;
    deliveryTimeframe: string;
    installationService: string;
    requestedInstallation: string;
    materialsOnly: string;
    productsTable: string;
    samplesTable: string;
    colProduct: string;
    colColor: string;
    colQuantity: string;
    colUnit: string;
    colArea: string;
    colNotes: string;
    totalBoxes: string;
    totalArea: string;
    legalDisclaimer: string;
  };
  footer: {
    description: string;
    collections: string;
    technicalResources: string;
    contactTitle: string;
    specSheets: string;
    installationGuides: string;
    warranty30Years: string;
    floorScoreCert: string;
    commercialInquiries: string;
    copyright: string;
    helpSpecialist: string;
  };
  toast: {
    sampleAlreadyInList: string;
    sampleAdded: string;
    itemsAddedToOrder: string;
    itemAddedToOrder: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brand: 'SURFACES',
      phoneAssistance: 'Specialist Assistance',
      searchPlaceholder: 'Search collection, color, thickness or category...',
      stairsGuide: 'Stairs & Moldings Guide',
      visualizer: '3D Visualizer',
      myQuote: 'My Quote / Samples',
      samplesShort: 'Samples',
      languageToggle: 'Language',
      langEn: 'EN',
      langEs: 'ES',
    },
    hero: {
      badgeOfficial: 'OFFICIAL 2026 COLLECTION',
      badgeWaterproof: '100% Waterproof & AC6',
      title1: 'Engineered Surfaces &',
      titleHighlight: 'High-Performance Flooring',
      subtitle:
        'Explore our comprehensive range of SPC Rigid Core, Ultra Mineral Core, European Finsa waterproof laminates, rectified porcelain tiles, and precision stair profiles.',
      btnVisualizer: 'Launch 3D Visualizer',
      btnSamples: 'Order Free Samples',
      cardSpcTitle: 'PULSESelect & XL',
      cardSpcBadge: 'SPC RIGID CORE',
      cardSpcDesc: '5.5mm to 8mm thickness with 20 to 22 Mil wear layer and acoustic IXPE backing.',
      cardSpcUse: 'Residential / Commercial',
      cardUltraTitle: 'UltraPULSE 10mm',
      cardUltraBadge: 'MINERAL CORE',
      cardUltraDesc: '8mm mineral core + 2mm IXPE, AC5 commercial rating with superior scratch resistance.',
      cardUltraUse: 'Heavy Commercial AC5',
      cardTileTitle: 'TilePULSE 24"x48"',
      cardTileBadge: 'PORCELAIN TILES',
      cardTileDesc: 'Rectified edges in Satin, Glossy, and Matte Makrana finishes for walls and floors.',
      cardTileUse: 'Marble & Stone Finish',
      cardWallTitle: 'WPC Slat Panels',
      cardWallBadge: 'WALLS & ACOUSTICS',
      cardWallDesc: 'Decorative acoustic interior slats and UV-resistant exterior architectural cladding.',
      cardWallUse: 'Acoustic Absorption',
      viewModels: 'View Models →',
      viewDesigns: 'View Designs →',
      viewOptions: 'View Options →',
    },
    filters: {
      allCategories: 'All',
      allProducts: 'All Products',
      showing: 'Showing',
      products: 'products',
      filterWearLayer: 'Wear Layer',
      filterAllWear: 'All Wear Layers',
      onlySamples: 'Samples Available Only',
      clearFilters: 'Clear Filters',
      noProductsFound: 'No products match your search criteria.',
      tryAdjusting: 'Try adjusting your search terms or category filters.',
      activeFilters: 'Active Filters:',
      category: 'Category',
    },
    productCard: {
      samplesAvailable: 'Samples Available',
      view3D: '3D View',
      viewDetails: 'View Specs',
      orderSample: 'Sample',
      sampleAdded: 'Sample Added',
      requestSample: 'Order Hand Sample',
      colorsAvailable: 'Available Colors',
      thickness: 'Thickness',
      wearLayer: 'Wear Layer',
      sqftBox: 'Sq.Ft./Box',
      origin: 'Origin',
      viewInVisualizer: 'Test in 3D Visualizer',
      addToQuote: 'Add to Quote',
    },
    detailModal: {
      specifications: 'Technical Specifications',
      calculatorTitle: 'Box & Square Footage Calculator',
      roomArea: 'Room / Project Area:',
      wasteMargin: 'Waste & Cut Margin:',
      calculatedBoxes: 'Required Boxes',
      totalAreaWithWaste: 'Total Area with Margin',
      applyToOrder: 'Apply Calculated Boxes to Order',
      selectColor: 'Select Color & Finish',
      colorDetails: 'Color & Texture Details',
      certifications: 'Certifications & Compliance',
      recommendedUse: 'Recommended Applications',
      orderQuantity: 'Order Quantity (Boxes)',
      orderNotes: 'Project Notes / Custom Specifications',
      notesPlaceholder: 'e.g., Delivery to unit 4B, needs moisture barrier...',
      addToQuoteBtn: 'Add to Quote / Order List',
      addedToQuoteSuccess: 'Added to Order List!',
      orderSampleBtn: 'Request Hand Sample',
      sampleSuccess: 'Sample Added!',
      openIn3D: 'Open in 3D Visualizer',
      features: 'Key Features',
      warrantyResidential: 'Residential Warranty',
      warrantyCommercial: 'Commercial Warranty',
      installationSystem: 'Installation System',
      plankDimensions: 'Plank Dimensions',
      coreMaterial: 'Core Material',
      integratedPadding: 'Integrated Padding',
      edgeProfile: 'Edge Profile',
      abrasionClass: 'Abrasion Class',
      boxSqft: 'Sq.Ft. per Box',
      piecesBox: 'Pieces / Box',
      wearLayer: 'Wear Layer',
    },
    visualizer: {
      title: '3D Floor & Room Visualizer',
      tagline: 'Seeing is Believing!',
      compareMode: 'Compare Colors (Split View)',
      lighting: 'Lighting:',
      daylight: 'Daylight',
      warm: 'Warm Light',
      studio: 'Studio',
      selectCollection: 'SURFACES Collection:',
      activeTone: 'Active Tone:',
      secondaryTone: 'Compare Tone (B):',
      coverage: 'Coverage:',
      wearLayer: 'Wear Layer:',
      thickness: 'Thickness:',
      requestSampleOf: 'Request Sample of',
      sampleAdded: 'Sample Added',
      addThisFloorToOrder: 'Add this Floor to Order',
      roomNames: {
        'living-room': 'Living Room',
        'modern-kitchen': 'Modern Kitchen',
        'master-bedroom': 'Master Bedroom',
        'commercial-office': 'Commercial Office',
        'luxury-lobby': 'Luxury Lobby',
      },
      roomSubtitles: {
        'living-room': 'Minimalist High-Contrast Living Room',
        'modern-kitchen': 'Contemporary Kitchen Island & Cabinets',
        'master-bedroom': 'Warm Cozy Suite with Ambient Lighting',
        'commercial-office': 'High-Traffic Executive Workspace',
        'luxury-lobby': 'Hospitality Reception & Grand Entrance',
      },
    },
    stairsGuide: {
      badge: 'Technical Finishes & Trim Guide',
      title: 'SURFACES Stair Steps, Moldings & Baseboards',
      subtitle:
        'Complete technical profiles, dimensions, and seamless matching solutions for staircases, perimeter joints, and transitions.',
      tabStairs: 'Stair Steps (Full / Regular)',
      tabMoldings: 'Transition Moldings',
      tabBaseboards: 'Baseboards & Trims',
      tabWpc: 'WPC Slat Wall Panels',
      addTreadSample: 'Add Stair Tread to List',
      addMolding: 'Add 5 pcs to Order',
      addBaseboard: 'Add 10 pcs to Order',
      addWpcSample: 'Add WPC Sample to List',
      stairProfileTitle: 'Stair Tread Technical Profile',
      stairProfileDesc: 'Integrated bullnose and square edge options matching SPC and laminate collections.',
      moldingTitle: 'Molding Profiles & Assembly',
      moldingDesc: 'T-Molding, Reducer, and End Cap for smooth level and subfloor transitions.',
      baseboardTitle: 'Solid Pine & Waterproof Baseboards',
      baseboardDesc: 'Primed Finger-Joint Pine and EPS Waterproof Quarter Round profiles.',
    },
    drawer: {
      title: 'Quote & Sample Request',
      subtitle: 'Review your selected materials, requested hand samples, and project specifications.',
      tabItems: '1. Selected Materials & Samples',
      tabClient: '2. Project & Contact Information',
      emptyTitle: 'Your quote list is empty',
      emptyDesc: 'Explore our catalog and add flooring materials, accessories, or free hand samples.',
      exploreBtn: 'Explore Catalog',
      productsList: 'Products & Flooring Materials',
      samplesList: 'Hand Samples (Free Samples)',
      boxes: 'Boxes',
      sqft: 'Sq. Ft.',
      linearFt: 'Linear Ft.',
      pieces: 'Pieces',
      sampleUnits: 'Samples',
      totalBoxes: 'Total Boxes',
      totalSqft: 'Estimated Total Sq. Ft.',
      totalSamples: 'Hand Samples',
      totalItems: 'Total Items',
      clearCart: 'Clear List',
      continueBtn: 'Continue to Contact Details',
      fullName: 'Full Name / Contact Person',
      phone: 'Phone / WhatsApp Number',
      email: 'Email Address',
      companyRole: 'Company / Role (Architect, Contractor, Homeowner)',
      city: 'City / Region',
      address: 'Delivery / Jobsite Address',
      projectType: 'Project Type',
      projectTypes: {
        residential: 'Residential',
        commercial: 'Commercial',
        contractor: 'Contractor / Builder',
        design: 'Interior Design / Architecture',
        other: 'Other',
      },
      deliveryTime: 'Delivery Timeframe',
      timeframes: {
        immediate: 'Immediate (In Stock)',
        oneTwoWeeks: '1 - 2 Weeks',
        oneMonth: '1 Month',
        quoteOnly: 'Budget Quote Only',
      },
      includeInstallation: 'I would like to include SURFACES Professional Installation',
      installationDesc:
        'Our certified installation teams handle moisture barrier testing, leveling, precision layout, and final trims.',
      notes: 'Additional Instructions / Floor Prep Notes',
      notesPlaceholder: 'e.g., Deliver to 3rd floor with elevator, moisture barrier needed...',
      submitWhatsApp: 'Submit Request via WhatsApp',
      printPDF: 'Print / Export PDF Quote',
      copySummary: 'Copy Order Summary',
      summaryCopied: 'Order summary copied to clipboard!',
    },
    orderDrawer: {
      title: 'Quote & Sample Request',
      summary: 'Review your selected materials, requested hand samples, and project specifications.',
      emptyTitle: 'Your list is empty',
      emptyDesc: 'Explore our catalog and add products, colors, or free hand samples.',
      productsList: 'Products & Flooring Materials',
      samplesList: 'Hand Samples (Free Samples)',
      boxes: 'Boxes',
      sqft: 'Sq. Ft.',
      linearFt: 'Linear Ft.',
      pieces: 'Pieces',
      sampleUnits: 'Samples',
      clientInfoTitle: 'Project & Contact Information',
      fullName: 'Full Name / Contact Person',
      companyOrRole: 'Company / Role (Architect, Contractor, Homeowner)',
      phone: 'Phone / WhatsApp Number',
      email: 'Email Address',
      city: 'City / Region',
      address: 'Delivery / Jobsite Address',
      projectType: 'Project Type',
      projectTypes: {
        residential: 'Residential',
        commercial: 'Commercial',
        contractor: 'Contractor / Builder',
        design: 'Interior Design / Architecture',
        other: 'Other',
      },
      deliveryTime: 'Delivery Timeframe',
      timeframes: {
        immediate: 'Immediate (In Stock)',
        oneTwoWeeks: '1 - 2 Weeks',
        oneMonth: '1 Month',
        quoteOnly: 'Budget Quote Only',
      },
      installationLabel: 'I would like to include SURFACES Professional Installation',
      installationDesc:
        'Our certified installation teams handle moisture barrier testing, leveling, precision layout, and final trims.',
      additionalNotes: 'Additional Instructions / Floor Prep Notes',
      notesPlaceholder: 'e.g., Deliver to 3rd floor with elevator, moisture barrier needed...',
      exportPdf: 'Print / Export PDF Quote',
      sendWhatsApp: 'Submit via WhatsApp to Specialist',
      totalItems: 'Total Items',
      totalBoxes: 'Total Boxes',
      totalEstSqft: 'Estimated Total Sq. Ft.',
      clearList: 'Clear All Items',
    },
    printQuote: {
      quoteTitle: 'PURCHASE ORDER REQUEST / QUOTATION',
      date: 'Date:',
      ref: 'Ref:',
      clientData: 'CLIENT & PROJECT INFORMATION',
      client: 'Client:',
      company: 'Company / Role:',
      phone: 'Phone:',
      email: 'Email:',
      city: 'City / Address:',
      projectType: 'Project Type:',
      deliveryTimeframe: 'Timeframe:',
      installationService: 'Installation:',
      requestedInstallation: 'Professional Installation Requested',
      materialsOnly: 'Materials Supply Only',
      productsTable: 'ORDERED MATERIALS & PRODUCTS',
      samplesTable: 'REQUESTED HAND SAMPLES',
      colProduct: 'Product / Collection',
      colColor: 'Color / Code',
      colQuantity: 'Qty',
      colUnit: 'Unit',
      colArea: 'Est. Sq. Ft.',
      colNotes: 'Notes / Specifications',
      totalBoxes: 'Total Boxes',
      totalArea: 'Estimated Total Area',
      legalDisclaimer: 'Official document generated by SURFACES Interactive Platform. Factory warranty up to 30 years.',
    },
    footer: {
      description:
        'High-performance engineered flooring solutions, SPC rigid core, mineral core, rectified porcelain tiles, architectural wall panels, and precision stair profiles.',
      collections: 'Catalog Collections',
      technicalResources: 'Technical Resources',
      contactTitle: 'Sales & Specialist Inquiries',
      specSheets: 'Technical Spec Sheets',
      installationGuides: 'Click Installation Guidelines',
      warranty30Years: '30-Year Factory Warranty',
      floorScoreCert: 'FloorScore & CE Certified',
      commercialInquiries: 'Commercial Project Inquiries',
      copyright: '© 2026 SURFACES. Interactive Product Catalog.',
      helpSpecialist: 'Chat with Specialist',
    },
    toast: {
      sampleAlreadyInList: 'You already have the sample of {color} in your list',
      sampleAdded: '✓ Sample of {color} added to your list',
      itemsAddedToOrder: 'Added +{quantity} {unit} of {color} to your order',
      itemAddedToOrder: 'Added {color} to your order',
    },
  },
  es: {
    nav: {
      brand: 'SURFACES',
      phoneAssistance: 'Atención Especialistas',
      searchPlaceholder: 'Buscar colección, color, espesor o categoría...',
      stairsGuide: 'Guía de Gradas & Molduras',
      visualizer: 'Visualizador 3D',
      myQuote: 'Mi Cotización / Muestras',
      samplesShort: 'Muestras',
      languageToggle: 'Idioma',
      langEn: 'EN',
      langEs: 'ES',
    },
    hero: {
      badgeOfficial: 'COLECCIÓN OFICIAL 2026',
      badgeWaterproof: '100% Waterproof & AC6',
      title1: 'Superficies y Pisos de',
      titleHighlight: 'Alta Ingeniería',
      subtitle:
        'Explora nuestra gama de pisos SPC Rigid Core, Ultra Mineral Core, laminados europeos Finsa, porcelanatos rectificados y gradas de precisión.',
      btnVisualizer: 'Ver en Visualizador 3D',
      btnSamples: 'Solicitar Muestras Gratis',
      cardSpcTitle: 'PULSESelect & XL',
      cardSpcBadge: 'SPC RIGID CORE',
      cardSpcDesc: '5.5mm a 8mm de espesor con capa de uso de 20 a 22 Mil y base IXPE acústica.',
      cardSpcUse: 'Residencial / Comercial',
      cardUltraTitle: 'UltraPULSE 10mm',
      cardUltraBadge: 'MINERAL CORE',
      cardUltraDesc: 'Núcleo mineral de 8mm + 2mm IXPE, clasificación AC5 y resistencia superior a rayaduras.',
      cardUltraUse: 'Tráfico Pesado AC5',
      cardTileTitle: 'TilePULSE 24"x48"',
      cardTileBadge: 'PORCELANATOS',
      cardTileDesc: 'Bordes rectificados en acabados Satin, Glossy y Matte Makrana para muros y pisos.',
      cardTileUse: 'Acabado Mármol & Piedra',
      cardWallTitle: 'Paneles WPC Slat',
      cardWallBadge: 'MUROS & ACÚSTICA',
      cardWallDesc: 'Listones decorativos acústicos para interiores y revestimiento exterior resistente a UV.',
      cardWallUse: 'Absorción Acústica',
      viewModels: 'Ver Modelos →',
      viewDesigns: 'Ver Diseños →',
      viewOptions: 'Ver Opciones →',
    },
    filters: {
      allCategories: 'Todas',
      allProducts: 'Todos los Productos',
      showing: 'Mostrando',
      products: 'productos',
      filterWearLayer: 'Capa de Uso',
      filterAllWear: 'Todas las Capas',
      onlySamples: 'Solo con Muestras Disponibles',
      clearFilters: 'Limpiar Filtros',
      noProductsFound: 'No se encontraron productos con estos criterios de búsqueda.',
      tryAdjusting: 'Intenta ajustar el término de búsqueda o la categoría seleccionada.',
      activeFilters: 'Filtros Activos:',
      category: 'Categoría',
    },
    productCard: {
      samplesAvailable: 'Muestras Disponibles',
      view3D: 'Ver 3D',
      viewDetails: 'Ver Ficha',
      orderSample: 'Muestra',
      sampleAdded: 'Muestra Agregada',
      requestSample: 'Pedir Muestra de Mano',
      colorsAvailable: 'Colores Disponibles',
      thickness: 'Espesor',
      wearLayer: 'Capa Uso',
      sqftBox: 'Sqft/Caja',
      origin: 'Origen',
      viewInVisualizer: 'Probar en Visualizador 3D',
      addToQuote: 'Cotizar',
    },
    detailModal: {
      specifications: 'Especificaciones Técnicas',
      calculatorTitle: 'Calculadora de Cajas y Metraje',
      roomArea: 'Área del Proyecto / Habitación:',
      wasteMargin: 'Margen de Desperdicio y Cortes:',
      calculatedBoxes: 'Cajas Requeridas',
      totalAreaWithWaste: 'Área Total con Margen',
      applyToOrder: 'Aplicar Cajas Calculadas al Pedido',
      selectColor: 'Seleccionar Tono y Acabado',
      colorDetails: 'Detalles de Tono y Textura',
      certifications: 'Certificaciones de Calidad',
      recommendedUse: 'Usos Recomendados',
      orderQuantity: 'Cantidad de Cajas',
      orderNotes: 'Notas del Proyecto / Especificaciones',
      notesPlaceholder: 'ej., Entrega en piso 4, requiere barrera de humedad...',
      addToQuoteBtn: 'Agregar a Lista de Cotización',
      addedToQuoteSuccess: '¡Agregado a la Lista!',
      orderSampleBtn: 'Solicitar Muestra Física',
      sampleSuccess: '¡Muestra Agregada!',
      openIn3D: 'Abrir en Visualizador 3D',
      features: 'Características Clave',
      warrantyResidential: 'Garantía Residencial',
      warrantyCommercial: 'Garantía Comercial',
      installationSystem: 'Sistema de Instalación',
      plankDimensions: 'Medidas del Tablón',
      coreMaterial: 'Material del Núcleo',
      integratedPadding: 'Pad Acústico Integrado',
      edgeProfile: 'Perfil de Borde',
      abrasionClass: 'Clase de Abrasión',
      boxSqft: 'Sq.Ft. por Caja',
      piecesBox: 'Piezas / Caja',
      wearLayer: 'Capa de Uso',
    },
    visualizer: {
      title: 'Visualizador 3D de Ambientes',
      tagline: 'Seeing is Believing!',
      compareMode: 'Comparar Colores (Divisor)',
      lighting: 'Iluminación:',
      daylight: 'Luz Día',
      warm: 'Luz Cálida',
      studio: 'Estudio',
      selectCollection: 'Colección SURFACES:',
      activeTone: 'Tono Activo:',
      secondaryTone: 'Segundo Color a Comparar (B):',
      coverage: 'Rendimiento:',
      wearLayer: 'Capa de Uso:',
      thickness: 'Espesor:',
      requestSampleOf: 'Pedir Muestra de',
      sampleAdded: 'Muestra Agregada',
      addThisFloorToOrder: 'Agregar este Piso al Pedido',
      roomNames: {
        'living-room': 'Sala Principal',
        'modern-kitchen': 'Cocina Moderna',
        'master-bedroom': 'Dormitorio Principal',
        'commercial-office': 'Oficina Comercial',
        'luxury-lobby': 'Lobby & Recepción',
      },
      roomSubtitles: {
        'living-room': 'Sala Minimalista de Alto Contraste',
        'modern-kitchen': 'Cocina Contemporánea con Isla',
        'master-bedroom': 'Suite Acogedora con Luz Cálida',
        'commercial-office': 'Espacio de Trabajo de Tráfico Intenso',
        'luxury-lobby': 'Entrada Principal y Recepción de Hotel',
      },
    },
    stairsGuide: {
      badge: 'Guía Técnica de Acabados',
      title: 'Gradas, Molduras & Zócalos SURFACES',
      subtitle:
        'Perfiles técnicos, medidas y soluciones a juego para gradas, juntas perimetrales y transiciones.',
      tabStairs: 'Gradas & Treads (Full / Regular)',
      tabMoldings: 'Molduras de Transición',
      tabBaseboards: 'Zócalos & Rodapiés',
      tabWpc: 'Paneles de Pared WPC Slat',
      addTreadSample: 'Agregar Grada a Lista',
      addMolding: 'Agregar 5 pzas a Pedido',
      addBaseboard: 'Agregar 10 pzas a Pedido',
      addWpcSample: 'Agregar Muestra WPC a Lista',
      stairProfileTitle: 'Perfil Técnico de Grada (Stair Tread)',
      stairProfileDesc: 'Opciones de nariz redondeada (Double Rounded) y canto recto (Square Step) a juego con SPC y laminados.',
      moldingTitle: 'Perfiles de Moldura & Ensamble',
      moldingDesc: 'T-Molding, Reducer y End Cap para transiciones suaves de nivel y piso.',
      baseboardTitle: 'Zócalos en Pino y Quarter Round Impermeable',
      baseboardDesc: 'Perfiles de pino finger-joint con imprimación blanca y Quarter Round EPS 100% impermeable.',
    },
    drawer: {
      title: 'Cotización y Pedido',
      subtitle: 'Revisa tus productos seleccionados, muestras de mano y datos del proyecto.',
      tabItems: '1. Materiales Seleccionados & Muestras',
      tabClient: '2. Datos del Proyecto y Contacto',
      emptyTitle: 'Tu lista de cotización está vacía',
      emptyDesc: 'Explora nuestro catálogo y agrega materiales, accesorios o muestras gratuitas.',
      exploreBtn: 'Explorar Catálogo',
      productsList: 'Pisos y Materiales',
      samplesList: 'Muestras de Mano Físicas',
      boxes: 'Cajas',
      sqft: 'Sq. Ft.',
      linearFt: 'Pies Lineales',
      pieces: 'Piezas',
      sampleUnits: 'Muestras',
      totalBoxes: 'Total Cajas',
      totalSqft: 'Metraje Estimado Total',
      totalSamples: 'Muestras Físicas',
      totalItems: 'Total Ítems',
      clearCart: 'Vaciar Lista',
      continueBtn: 'Continuar a Datos de Contacto',
      fullName: 'Nombre Completo / Contacto',
      phone: 'Teléfono / WhatsApp',
      email: 'Correo Electrónico',
      companyRole: 'Empresa o Rol (Arquitecto, Contratista, Propietario)',
      city: 'Ciudad / Región',
      address: 'Dirección del Proyecto / Envío',
      projectType: 'Tipo de Proyecto',
      projectTypes: {
        residential: 'Residencial',
        commercial: 'Comercial',
        contractor: 'Contratista / Constructor',
        design: 'Diseño / Arquitectura',
        other: 'Otro',
      },
      deliveryTime: 'Tiempo Estimado de Entrega',
      timeframes: {
        immediate: 'Inmediato (En Stock)',
        oneTwoWeeks: '1 - 2 Semanas',
        oneMonth: '1 Mes',
        quoteOnly: 'Solo Cotización Presupuestaria',
      },
      includeInstallation: 'Deseo incluir el servicio de instalación SURFACES',
      installationDesc:
        'Nuestros técnicos certificados realizarán la nivelación, colocación, barrera de humedad y terminaciones.',
      notes: 'Instrucciones Adicionales / Notas de Obra',
      notesPlaceholder: 'ej., Entrega en piso 4 con elevador, requiere barrera acústica...',
      submitWhatsApp: 'Enviar Solicitud por WhatsApp',
      printPDF: 'Imprimir / Guardar en PDF',
      copySummary: 'Copiar Resumen del Pedido',
      summaryCopied: '¡Resumen copiado al portapapeles!',
    },
    orderDrawer: {
      title: 'Cotización y Pedido',
      summary: 'Revisa tus productos seleccionados, muestras de mano y datos del proyecto.',
      emptyTitle: 'Tu lista de cotización está vacía',
      emptyDesc: 'Explora nuestro catálogo y agrega productos, tonos o muestras de mano.',
      productsList: 'Pisos y Materiales',
      samplesList: 'Muestras de Mano Físicas',
      boxes: 'Cajas',
      sqft: 'Sq. Ft.',
      linearFt: 'Pies Lineales',
      pieces: 'Piezas',
      sampleUnits: 'Muestras',
      clientInfoTitle: 'Datos del Cliente y Proyecto',
      fullName: 'Nombre Completo / Contacto',
      companyOrRole: 'Empresa o Rol (Arquitecto, Contratista, Propietario)',
      phone: 'Teléfono / WhatsApp',
      email: 'Correo Electrónico',
      city: 'Ciudad / Región',
      address: 'Dirección del Proyecto / Envío',
      projectType: 'Tipo de Proyecto',
      projectTypes: {
        residential: 'Residencial',
        commercial: 'Comercial',
        contractor: 'Contratista / Constructor',
        design: 'Diseño / Arquitectura',
        other: 'Otro',
      },
      deliveryTime: 'Tiempo Estimado de Entrega',
      timeframes: {
        immediate: 'Inmediato (En Stock)',
        oneTwoWeeks: '1 - 2 Semanas',
        oneMonth: '1 Mes',
        quoteOnly: 'Solo Cotización Presupuestaria',
      },
      installationLabel: 'Deseo incluir el servicio de instalación SURFACES',
      installationDesc:
        'Nuestros técnicos certificados realizarán la nivelación, colocación, barrera de humedad y terminaciones.',
      additionalNotes: 'Instrucciones Adicionales / Notas de Obra',
      notesPlaceholder: 'ej., Entrega en piso 4 con elevador, requiere barrera acústica...',
      exportPdf: 'Imprimir / Guardar en PDF',
      sendWhatsApp: 'Enviar Solicitud por WhatsApp al Especialista',
      totalItems: 'Total Ítems',
      totalBoxes: 'Total Cajas',
      totalEstSqft: 'Metraje Estimado Total',
      clearList: 'Vaciar Lista',
    },
    printQuote: {
      quoteTitle: 'SOLICITUD DE PEDIDO / COTIZACIÓN',
      date: 'Fecha:',
      ref: 'Ref:',
      clientData: 'DATOS DEL CLIENTE Y PROYECTO',
      client: 'Cliente:',
      company: 'Empresa / Rol:',
      phone: 'Teléfono:',
      email: 'Email:',
      city: 'Ciudad / Dirección:',
      projectType: 'Tipo de Proyecto:',
      deliveryTimeframe: 'Tiempo Estimado:',
      installationService: 'Instalación:',
      requestedInstallation: 'Servicio de Instalación Solicitado',
      materialsOnly: 'Solo Suministro de Materiales',
      productsTable: 'MATERIALES Y PRODUCTOS SOLICITADOS',
      samplesTable: 'MUESTRAS FÍSICAS SOLICITADAS',
      colProduct: 'Producto / Colección',
      colColor: 'Color / Código',
      colQuantity: 'Cant.',
      colUnit: 'Unidad',
      colArea: 'Metraje Estimado',
      colNotes: 'Notas / Especificaciones',
      totalBoxes: 'Total Cajas',
      totalArea: 'Total Área Estimada',
      legalDisclaimer: 'Documento oficial generado por SURFACES Interactivo. Garantía de fábrica hasta 30 años.',
    },
    footer: {
      description:
        'Soluciones de pisos de alta ingeniería, SPC rigid core, mineral core, porcelanatos rectificados, paneles arquitectónicos y gradas a medida.',
      collections: 'Colecciones del Catálogo',
      technicalResources: 'Recursos Técnicos',
      contactTitle: 'Ventas y Consultas',
      specSheets: 'Fichas Técnicas & Capas',
      installationGuides: 'Guías de Instalación Click',
      warranty30Years: 'Garantía de Fábrica 30 Años',
      floorScoreCert: 'Certificación FloorScore & CE',
      commercialInquiries: 'Asesoría para Proyectos',
      copyright: '© 2026 SURFACES. Catálogo Interactivo.',
      helpSpecialist: 'Consultar Especialista',
    },
    toast: {
      sampleAlreadyInList: 'Ya tienes la muestra de {color} en tu lista',
      sampleAdded: '✓ Muestra de {color} agregada a tu lista',
      itemsAddedToOrder: 'Se agregaron +{quantity} {unit} de {color} a tu pedido',
      itemAddedToOrder: 'Se agregó {color} a tu pedido',
    },
  },
};
