// High-fidelity image assets and rendering engines for Planks, Room Scenes, Steps, Moldings, and Baseboards

export interface ProductVisuals {
  plankImage: string;
  roomImage: string;
  thumbnail: string;
  patternType: 'wood' | 'marble' | 'stone' | 'slat' | 'molding' | 'baseboard' | 'step';
}

// Generate realistic SVG-based high-res plank texture data URI
export function generatePlankSVG(
  primaryColor: string,
  secondaryColor: string,
  grainDarkness: string = 'rgba(0,0,0,0.18)',
  woodType: 'wood' | 'marble' | 'stone' | 'slat' = 'wood'
): string {
  if (woodType === 'marble') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
      <defs>
        <radialGradient id="bg" cx="40%" cy="30%" r="80%">
          <stop offset="0%" stop-color="${encodeURIComponent(primaryColor)}"/>
          <stop offset="100%" stop-color="${encodeURIComponent(secondaryColor)}"/>
        </radialGradient>
        <filter id="marbleVein">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.008" numOctaves="4" result="noise"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="veins"/>
          <feBlend mode="multiply" in="SourceGraphic" in2="veins"/>
        </filter>
      </defs>
      <rect width="800" height="400" fill="url(%23bg)"/>
      <path d="M-50,80 Q200,120 400,60 T850,150" stroke="rgba(190,160,110,0.45)" stroke-width="6" fill="none" filter="blur(2px)"/>
      <path d="M-50,220 Q300,180 500,280 T850,210" stroke="rgba(140,145,150,0.35)" stroke-width="4" fill="none" filter="blur(1.5px)"/>
      <path d="M100,-20 Q350,200 650,420" stroke="rgba(100,105,110,0.25)" stroke-width="3" fill="none" filter="blur(1px)"/>
      <rect width="800" height="400" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="4"/>
    </svg>`;
  }

  if (woodType === 'slat') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
      <defs>
        <pattern id="slatPattern" width="40" height="400" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="28" height="400" fill="${encodeURIComponent(primaryColor)}"/>
          <rect x="26" y="0" width="2" height="400" fill="${encodeURIComponent(secondaryColor)}"/>
          <rect x="28" y="0" width="12" height="400" fill="#141416"/>
        </pattern>
      </defs>
      <rect width="800" height="400" fill="url(%23slatPattern)"/>
      <rect width="800" height="400" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    </svg>`;
  }

  if (woodType === 'stone') {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
      <defs>
        <linearGradient id="stoneBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${encodeURIComponent(primaryColor)}"/>
          <stop offset="100%" stop-color="${encodeURIComponent(secondaryColor)}"/>
        </linearGradient>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0"/>
          <feBlend mode="multiply" in="SourceGraphic" in2="noise"/>
        </filter>
      </defs>
      <rect width="800" height="400" fill="url(%23stoneBg)" filter="url(%23noise)"/>
      <rect width="800" height="400" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="4"/>
    </svg>`;
  }

  // Realistic wood grain plank with micro-bevel and grain rings
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="320" viewBox="0 0 900 320">
    <defs>
      <linearGradient id="plankGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${encodeURIComponent(primaryColor)}"/>
        <stop offset="25%" stop-color="${encodeURIComponent(secondaryColor)}"/>
        <stop offset="50%" stop-color="${encodeURIComponent(primaryColor)}"/>
        <stop offset="75%" stop-color="${encodeURIComponent(secondaryColor)}"/>
        <stop offset="100%" stop-color="${encodeURIComponent(primaryColor)}"/>
      </linearGradient>
      <radialGradient id="knot1" cx="30%" cy="45%" r="20%">
        <stop offset="0%" stop-color="${encodeURIComponent(secondaryColor)}"/>
        <stop offset="60%" stop-color="${encodeURIComponent(primaryColor)}"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
      <radialGradient id="knot2" cx="72%" cy="60%" r="25%">
        <stop offset="0%" stop-color="${encodeURIComponent(secondaryColor)}"/>
        <stop offset="50%" stop-color="${encodeURIComponent(primaryColor)}"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
    </defs>
    <!-- Base Wood Plank -->
    <rect width="900" height="320" fill="url(%23plankGrad)"/>
    <rect width="900" height="320" fill="url(%23knot1)" opacity="0.6"/>
    <rect width="900" height="320" fill="url(%23knot2)" opacity="0.4"/>
    <!-- Grain Curves -->
    <path d="M0,60 C250,50 400,90 900,65 M0,120 C300,140 600,100 900,130 M0,180 C200,170 500,210 900,190 M0,240 C350,220 700,260 900,245" stroke="${encodeURIComponent(grainDarkness)}" stroke-width="1.8" fill="none" opacity="0.55"/>
    <path d="M0,90 C320,110 580,70 900,95 M0,150 C220,130 480,170 900,160 M0,210 C280,230 620,190 900,220 M0,270 C310,250 640,290 900,280" stroke="${encodeURIComponent(grainDarkness)}" stroke-width="1.2" fill="none" opacity="0.45"/>
    <circle cx="280" cy="140" r="14" fill="${encodeURIComponent(secondaryColor)}" opacity="0.7"/>
    <circle cx="680" cy="180" r="18" fill="${encodeURIComponent(secondaryColor)}" opacity="0.6"/>
    <!-- Micro Bevel Plank Edge -->
    <rect x="2" y="2" width="896" height="316" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
    <rect x="0" y="0" width="900" height="320" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="3"/>
  </svg>`;
}

// Generate realistic architectural room scene rendering with the chosen floor
export function generateRoomSceneSVG(
  floorColorPrimary: string,
  floorColorSecondary: string,
  sceneType: 'living' | 'kitchen' | 'dining' | 'lobby' | 'exterior' = 'living'
): string {
  const floorPattern = generatePlankSVG(floorColorPrimary, floorColorSecondary, 'rgba(0,0,0,0.25)');

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600">
    <defs>
      <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#edf1f7"/>
        <stop offset="100%" stop-color="#dbe2ea"/>
      </linearGradient>
      <linearGradient id="windowSunlight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.85)"/>
        <stop offset="40%" stop-color="rgba(255,250,230,0.3)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </linearGradient>
      <linearGradient id="floorDepth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(0,0,0,0.35)"/>
        <stop offset="30%" stop-color="rgba(0,0,0,0.05)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.1)"/>
      </linearGradient>
      <linearGradient id="floorPlankBase" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${encodeURIComponent(floorColorPrimary)}"/>
        <stop offset="100%" stop-color="${encodeURIComponent(floorColorSecondary)}"/>
      </linearGradient>
    </defs>
    
    <!-- Background Architectural Wall -->
    <rect width="960" height="340" fill="url(%23wallGrad)"/>
    
    <!-- Large Scenic Window on the Left -->
    <rect x="60" y="40" width="220" height="260" fill="#c4d8e8" rx="8"/>
    <rect x="60" y="40" width="220" height="260" fill="none" stroke="#ffffff" stroke-width="10" rx="8"/>
    <line x1="170" y1="40" x2="170" y2="300" stroke="#ffffff" stroke-width="6"/>
    <line x1="60" y1="170" x2="280" y2="170" stroke="#ffffff" stroke-width="6"/>
    
    <!-- Baseboard Wall Line -->
    <rect x="0" y="325" width="960" height="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
    
    <!-- Perspective Floor Plane -->
    <polygon points="0,340 960,340 960,600 0,600" fill="url(%23floorPlankBase)"/>
    
    <!-- Perspective Flooring Lines -->
    <g stroke="rgba(0,0,0,0.22)" stroke-width="1.8">
      <line x1="480" y1="340" x2="120" y2="600"/>
      <line x1="480" y1="340" x2="320" y2="600"/>
      <line x1="480" y1="340" x2="520" y2="600"/>
      <line x1="480" y1="340" x2="720" y2="600"/>
      <line x1="480" y1="340" x2="920" y2="600"/>
      <!-- Staggered horizontal plank lines -->
      <line x1="0" y1="375" x2="960" y2="375" opacity="0.3"/>
      <line x1="0" y1="420" x2="960" y2="420" opacity="0.4"/>
      <line x1="0" y1="480" x2="960" y2="480" opacity="0.5"/>
      <line x1="0" y1="550" x2="960" y2="550" opacity="0.6"/>
    </g>

    <!-- Floor Depth & Ambient Shadow -->
    <polygon points="0,340 960,340 960,600 0,600" fill="url(%23floorDepth)"/>

    <!-- Sunlight Ray across Floor -->
    <polygon points="60,40 280,40 680,600 120,600" fill="url(%23windowSunlight)"/>

    <!-- Modern Minimalist Designer Sofa / Furniture -->
    <!-- Sofa Base Shadow -->
    <ellipse cx="640" cy="460" rx="200" ry="25" fill="rgba(0,0,0,0.3)" filter="blur(6px)"/>
    <!-- Sofa Body -->
    <rect x="460" y="320" width="360" height="90" rx="16" fill="#2d3748"/>
    <rect x="440" y="360" width="400" height="70" rx="14" fill="#3a475a"/>
    <!-- Cushions -->
    <rect x="470" y="340" width="160" height="75" rx="12" fill="#4a5568"/>
    <rect x="650" y="340" width="160" height="75" rx="12" fill="#4a5568"/>
    <circle cx="530" cy="380" r="18" fill="#f1b94c" opacity="0.9"/>
    
    <!-- Modern Coffee Table -->
    <ellipse cx="440" cy="490" rx="90" ry="28" fill="rgba(0,0,0,0.2)" filter="blur(4px)"/>
    <ellipse cx="440" cy="480" rx="80" ry="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <line x1="390" y1="485" x2="385" y2="510" stroke="#0f172a" stroke-width="4"/>
    <line x1="490" y1="485" x2="495" y2="510" stroke="#0f172a" stroke-width="4"/>
    
    <!-- Indoor Botanical Planter -->
    <ellipse cx="880" cy="380" rx="35" ry="12" fill="rgba(0,0,0,0.25)" filter="blur(3px)"/>
    <polygon points="855,270 905,270 895,370 865,370" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M880,270 Q860,210 830,190 M880,270 Q900,200 930,180 M880,270 Q880,180 885,160" stroke="#15803d" stroke-width="8" fill="none" stroke-linecap="round"/>
    
    <!-- Room Tag Header Overlay -->
    <rect x="24" y="24" width="220" height="34" rx="17" fill="rgba(10,22,128,0.85)" backdrop-filter="blur(8px)"/>
    <text x="44" y="46" fill="#fbedb0" font-size="12" font-weight="bold" font-family="sans-serif" letter-spacing="1">SURFACES • 3D ROOM SCENE</text>
  </svg>`;
}

/// Dedicated Profiles & Renderings for Baseboards (All Complete Catalog Models)
export const BASEBOARD_IMAGES: Record<string, { profileSvg: string; photoUrl: string; description: string; thickness: string; height: string; length: string }> = {
  'BB1x6-14mm': {
    description: 'BB1x6 White Primed Pine (14mm / 9/16")',
    thickness: '14 mm (9/16")',
    height: '5 1/2" x 1/2"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <!-- Grid -->
      <line x1="20" y1="190" x2="320" y2="190" stroke="#334155" stroke-width="2"/>
      <!-- Cross Section Profile -->
      <polygon points="60,30 110,30 110,190 50,190 50,55 60,30" fill="#f8fafc" stroke="#38bdf8" stroke-width="2"/>
      <line x1="125" y1="30" x2="125" y2="190" stroke="#f1b94c" stroke-width="1.5"/>
      <text x="135" y="48" fill="#fbedb0" font-size="13" font-weight="bold">BB1x6 Pine (14mm)</text>
      <text x="135" y="70" fill="#93b2f8" font-size="11">Height: 5 1/2" (139.7mm)</text>
      <text x="135" y="92" fill="#e2e8f0" font-size="11">Thickness: 14mm (9/16")</text>
      <text x="135" y="114" fill="#38bdf8" font-size="11">Length: 16 ft (4.88m)</text>
      <text x="135" y="136" fill="#94a3b8" font-size="10">Finger-Joint Primed White</text>
      <text x="135" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-1X6-14</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <defs>
        <linearGradient id="bbWall1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#334155"/><stop offset="100%" stop-color="#1e293b"/></linearGradient>
        <linearGradient id="bbFloor1" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#d4b896"/><stop offset="50%" stop-color="#b89368"/><stop offset="100%" stop-color="#9a7448"/></linearGradient>
        <linearGradient id="bbWood1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="10%" stop-color="#f8fafc"/><stop offset="90%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#cbd5e1"/></linearGradient>
      </defs>
      <!-- Wall Background -->
      <rect width="340" height="135" fill="url(%23bbWall1)"/>
      <!-- Floor with Perspective Planks -->
      <polygon points="0,135 340,135 340,220 0,220" fill="url(%23bbFloor1)"/>
      <line x1="60" y1="135" x2="20" y2="220" stroke="#785328" stroke-width="1.5" opacity="0.6"/>
      <line x1="150" y1="135" x2="130" y2="220" stroke="#785328" stroke-width="1.5" opacity="0.6"/>
      <line x1="240" y1="135" x2="250" y2="220" stroke="#785328" stroke-width="1.5" opacity="0.6"/>
      <!-- BB1x6 Baseboard Body -->
      <polygon points="0,75 340,75 340,135 0,135" fill="url(%23bbWood1)"/>
      <!-- Top Bevel Edge Highlight -->
      <line x1="0" y1="75" x2="340" y2="75" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="77" x2="340" y2="77" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Bottom Shadow line on Floor -->
      <line x1="0" y1="135" x2="340" y2="135" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Photo Badge -->
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (5-1/2")</text>
    </svg>`,
  },
  'BB1x6-18mm': {
    description: 'BB1x6 White Primed Pine Heavy-Duty (18mm / 11/16")',
    thickness: '18 mm (11/16")',
    height: '5 1/2" x 3/4"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <polygon points="65,30 125,30 125,190 50,190 50,55 65,30" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="140" y="48" fill="#fbedb0" font-size="13" font-weight="bold">BB1x6 Pine (18mm Heavy)</text>
      <text x="140" y="70" fill="#93b2f8" font-size="11">Height: 5 1/2" x 3/4"</text>
      <text x="140" y="92" fill="#e2e8f0" font-size="11">Thickness: 18mm (11/16")</text>
      <text x="140" y="114" fill="#38bdf8" font-size="11">Length: 16 ft</text>
      <text x="140" y="136" fill="#94a3b8" font-size="10">Extra Robust Thickness</text>
      <text x="140" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-1X6-18</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <defs>
        <linearGradient id="bbWall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
        <linearGradient id="bbFloor2" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#8b5a2b"/><stop offset="50%" stop-color="#6e431f"/><stop offset="100%" stop-color="#4a2c11"/></linearGradient>
        <linearGradient id="bbWood2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="10%" stop-color="#f1f5f9"/><stop offset="90%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#94a3b8"/></linearGradient>
      </defs>
      <rect width="340" height="130" fill="url(%23bbWall2)"/>
      <polygon points="0,130 340,130 340,220 0,220" fill="url(%23bbFloor2)"/>
      <!-- Deep 18mm Baseboard with prominent top reveal -->
      <polygon points="0,68 340,68 340,130 0,130" fill="url(%23bbWood2)"/>
      <line x1="0" y1="68" x2="340" y2="68" stroke="#ffffff" stroke-width="4"/>
      <line x1="0" y1="130" x2="340" y2="130" stroke="#000000" stroke-width="3"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (18mm Heavy)</text>
    </svg>`,
  },
  'BB1x4-14mm': {
    description: 'BB1x4 White Primed Pine (14mm / 9/16")',
    thickness: '14 mm (9/16")',
    height: '3 1/2" x 1/2"',
    length: '17 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <polygon points="60,75 110,75 110,190 50,190 50,95 60,75" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
      <text x="125" y="80" fill="#fbedb0" font-size="13" font-weight="bold">BB1x4 Pine (14mm)</text>
      <text x="125" y="102" fill="#93b2f8" font-size="11">Height: 3 1/2" (88.9mm)</text>
      <text x="125" y="124" fill="#e2e8f0" font-size="11">Thickness: 14mm (9/16")</text>
      <text x="125" y="146" fill="#38bdf8" font-size="11">Length: 17 ft (5.18m)</text>
      <text x="125" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-1X4-14</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <defs>
        <linearGradient id="bbWall3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#475569"/><stop offset="100%" stop-color="#334155"/></linearGradient>
        <linearGradient id="bbFloor3" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#dfc39a"/><stop offset="100%" stop-color="#b89368"/></linearGradient>
      </defs>
      <rect width="340" height="150" fill="url(%23bbWall3)"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="url(%23bbFloor3)"/>
      <!-- BB1x4 (3.5 inch height) -->
      <polygon points="0,105 340,105 340,150 0,150" fill="#ffffff"/>
      <line x1="0" y1="105" x2="340" y2="105" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#0f172a" stroke-width="2"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (3-1/2")</text>
    </svg>`,
  },
  'BB1x4-18mm': {
    description: 'BB1x4 White Primed Pine Thick (18mm / 11/16")',
    thickness: '18 mm (11/16")',
    height: '3 1/2" x 3/4"',
    length: '17 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <polygon points="65,75 125,75 125,190 50,190 50,100 65,75" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="140" y="80" fill="#fbedb0" font-size="13" font-weight="bold">BB1x4 Pine (18mm Thick)</text>
      <text x="140" y="102" fill="#93b2f8" font-size="11">Height: 3 1/2" x 3/4"</text>
      <text x="140" y="124" fill="#e2e8f0" font-size="11">Thickness: 18mm (11/16")</text>
      <text x="140" y="146" fill="#38bdf8" font-size="11">Length: 17 ft</text>
      <text x="140" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-1X4-18</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#a98f65"/>
      <polygon points="0,105 340,105 340,150 0,150" fill="#f8fafc"/>
      <line x1="0" y1="105" x2="340" y2="105" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#000000" stroke-width="2.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED (18mm Thick)</text>
    </svg>`,
  },
  'BB1x3': {
    description: 'BB1x3 White Primed Pine (18mm)',
    thickness: '18 mm (11/16")',
    height: '1 1/2" & 2 1/2"',
    length: '17 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <polygon points="65,115 125,115 125,190 50,190 50,130 65,115" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
      <text x="140" y="105" fill="#fbedb0" font-size="13" font-weight="bold">BB1x3 Pine (18mm)</text>
      <text x="140" y="125" fill="#93b2f8" font-size="11">Height: 1 1/2" & 2 1/2"</text>
      <text x="140" y="145" fill="#e2e8f0" font-size="11">Thickness: 18mm • 17 ft</text>
      <text x="140" y="165" fill="#94a3b8" font-size="10">Low-Profile Contemporary</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="165" fill="#334155"/>
      <polygon points="0,165 340,165 340,220 0,220" fill="#b89368"/>
      <!-- Low profile BB1x3 -->
      <polygon points="0,135 340,135 340,165 0,165" fill="#ffffff"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#ffffff" stroke-width="2"/>
      <line x1="0" y1="165" x2="340" y2="165" stroke="#0f172a" stroke-width="2"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (Low 1x3)</text>
    </svg>`,
  },
  'BB5180': {
    description: 'BB5180 Molded Colonial Pine (14mm x 5 1/4" x 16ft)',
    thickness: '14 mm (9/16")',
    height: '5 1/4" x 9/16"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <path d="M70,35 Q50,60 60,80 Q50,100 50,190 L110,190 L110,35 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
      <text x="125" y="50" fill="#fbedb0" font-size="13" font-weight="bold">BB5180 Molded Colonial</text>
      <text x="125" y="72" fill="#93b2f8" font-size="11">Height: 5 1/4" (133.3mm)</text>
      <text x="125" y="94" fill="#e2e8f0" font-size="11">Thickness: 14mm • 16 ft</text>
      <text x="125" y="116" fill="#38bdf8" font-size="10">Decorative Colonial Bead</text>
      <text x="125" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-5180</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <defs>
        <linearGradient id="bbWallCol" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2d3748"/><stop offset="100%" stop-color="#1a202c"/></linearGradient>
        <linearGradient id="bbFloorCol" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#c7a372"/><stop offset="100%" stop-color="#8b5a2b"/></linearGradient>
      </defs>
      <rect width="340" height="135" fill="url(%23bbWallCol)"/>
      <polygon points="0,135 340,135 340,220 0,220" fill="url(%23bbFloorCol)"/>
      <!-- Colonial Molded Curves -->
      <polygon points="0,75 340,75 340,135 0,135" fill="#f8fafc"/>
      <line x1="0" y1="75" x2="340" y2="75" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="88" x2="340" y2="88" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="0" y1="92" x2="340" y2="92" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#000000" stroke-width="2.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (Colonial)</text>
    </svg>`,
  },
  'BB618': {
    description: 'BB618 Curved Top Pine (14mm x 5 1/2" x 16ft)',
    thickness: '14 mm (9/16")',
    height: '5 1/2" x 9/16"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <path d="M75,30 Q50,70 50,190 L110,190 L110,30 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
      <text x="125" y="50" fill="#fbedb0" font-size="13" font-weight="bold">BB618 Curved Profile</text>
      <text x="125" y="72" fill="#93b2f8" font-size="11">Height: 5 1/2" (139.7mm)</text>
      <text x="125" y="94" fill="#e2e8f0" font-size="11">Thickness: 14mm • 16 ft</text>
      <text x="125" y="116" fill="#38bdf8" font-size="10">Smooth Architectural Arc</text>
      <text x="125" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-618</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="135" fill="#1e293b"/>
      <polygon points="0,135 340,135 340,220 0,220" fill="#dfc39a"/>
      <polygon points="0,75 340,75 340,135 0,135" fill="#f8fafc"/>
      <line x1="0" y1="75" x2="340" y2="75" stroke="#ffffff" stroke-width="4"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#0f172a" stroke-width="2"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (BB618)</text>
    </svg>`,
  },
  'BB620': {
    description: 'BB620 Pine Baseboard (18mm x 3 1/4" x 16ft)',
    thickness: '18 mm (11/16")',
    height: '3 1/4" x 9/16"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <path d="M75,80 Q50,110 50,190 L120,190 L120,80 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
      <text x="135" y="80" fill="#fbedb0" font-size="13" font-weight="bold">BB620 Profile Pine</text>
      <text x="135" y="102" fill="#93b2f8" font-size="11">Height: 3 1/4" (82.5mm)</text>
      <text x="135" y="124" fill="#e2e8f0" font-size="11">Thickness: 18mm • 16 ft</text>
      <text x="135" y="180" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC BB-620</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#334155"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#c7a372"/>
      <polygon points="0,110 340,110 340,150 0,150" fill="#ffffff"/>
      <line x1="0" y1="110" x2="340" y2="110" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#000000" stroke-width="2.5"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (BB620)</text>
    </svg>`,
  },
  'QuarterRound-EPS': {
    description: 'Quarter Round EPS 100% Waterproof (12 ft)',
    thickness: '3/4" x 3/4"',
    height: '3/4"',
    length: '12 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <path d="M60,105 L140,105 L140,185 A80,80 0 0,1 60,105 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="40" y="45" fill="#fbedb0" font-size="13" font-weight="bold">Quarter Round EPS Waterproof</text>
      <text x="40" y="68" fill="#93b2f8" font-size="11">100% Polymer Waterproof • 12 ft</text>
      <text x="40" y="90" fill="#e2e8f0" font-size="10">For Bathrooms, Kitchens & Base Gaps</text>
      <text x="40" y="205" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC QR-EPS12</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#b89368"/>
      <!-- Wall Baseboard -->
      <rect x="0" y="90" width="340" height="60" fill="#f1f5f9"/>
      <!-- Quarter Round Shoe -->
      <polygon points="0,135 340,135 340,150 0,150" fill="#ffffff"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#38bdf8" stroke-width="1.5"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#000000" stroke-width="2"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED VIEW (EPS Shoe)</text>
    </svg>`,
  },
  'QuarterRound-Pine': {
    description: 'Quarter Round Pine / MDF (16 ft)',
    thickness: '3/4" x 3/4"',
    height: '3/4"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <path d="M60,105 L140,105 L140,185 A80,80 0 0,1 60,105 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
      <text x="40" y="45" fill="#fbedb0" font-size="13" font-weight="bold">Quarter Round Pine Pre-primed</text>
      <text x="40" y="68" fill="#93b2f8" font-size="11">Natural Finger-Joint Pine • 16 ft</text>
      <text x="40" y="205" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC QR-PINE16</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#334155"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#a98f65"/>
      <rect x="0" y="90" width="340" height="60" fill="#ffffff"/>
      <polygon points="0,135 340,135 340,150 0,150" fill="#f8fafc"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#ffffff" stroke-width="2"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED (Pine Round)</text>
    </svg>`,
  },
  'Square1x1-MDF': {
    description: 'Square 1x1 MDF Waterproof Base Shoe (8 ft)',
    thickness: '1" x 1"',
    height: '1"',
    length: '8 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#09132e"/>
      <rect x="60" y="110" width="75" height="75" fill="#ffffff" stroke="#38bdf8" stroke-width="2"/>
      <text x="40" y="45" fill="#fbedb0" font-size="13" font-weight="bold">Square 1x1 MDF Waterproof</text>
      <text x="40" y="68" fill="#93b2f8" font-size="11">Clean 90° Modern Shoe Trim • 8 ft</text>
      <text x="40" y="205" fill="#fbedb0" font-size="10" font-family="monospace">CAD BLUEPRINT • SPEC SQ-MDF08</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#dfc39a"/>
      <rect x="0" y="80" width="340" height="70" fill="#ffffff"/>
      <rect x="0" y="130" width="340" height="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED (Square 1x1)</text>
    </svg>`,
  },
};

// Dedicated Profiles & Renderings for Moldings (All Complete Catalog Models)
export const MOLDING_IMAGES: Record<string, { profileSvg: string; photoUrl: string; description: string; dimensions: string }> = {
  'CM-TMolding': {
    dimensions: '1-3/4” x 3/8”',
    description: 'CM T-Molding - Flush level floor transition with expansion track',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="240" y="55" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">1-3/4" (44.5 mm)</text>
      <!-- T-Molding Profile -->
      <path d="M 120 75 L 360 75 Q 365 75 365 85 L 365 95 Q 365 102 355 102 L 255 102 L 255 160 L 225 160 L 225 102 L 125 102 Q 115 102 115 95 L 115 85 Q 115 75 120 75 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="380" y="93" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">3/8" (9.5mm)</text>
      <text x="240" y="185" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Expansion Stem</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <defs>
        <linearGradient id="tmFloorL" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#dfc39a"/><stop offset="100%" stop-color="#c7a372"/></linearGradient>
        <linearGradient id="tmFloorR" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#b89368"/><stop offset="100%" stop-color="#8b5a2b"/></linearGradient>
        <linearGradient id="tmCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fbedb0"/><stop offset="50%" stop-color="#f1b94c"/><stop offset="100%" stop-color="#b8831f"/></linearGradient>
      </defs>
      <rect width="340" height="220" fill="#0f172a"/>
      <polygon points="0,0 155,0 155,220 0,220" fill="url(%23tmFloorL)"/>
      <line x1="40" y1="0" x2="30" y2="220" stroke="#785328" stroke-width="1.5" opacity="0.6"/>
      <polygon points="185,0 340,0 340,220 185,220" fill="url(%23tmFloorR)"/>
      <line x1="240" y1="0" x2="250" y2="220" stroke="#4a2c11" stroke-width="1.5" opacity="0.6"/>
      <polygon points="150,0 190,0 190,220 150,220" fill="url(%23tmCap)" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D INSTALLED TRANSITION</text>
    </svg>`,
  },
  'CM-Reducer': {
    dimensions: '1-3/4” x 3/8”',
    description: 'CM Reducer - Smooth bevel transition to lower tile, vinyl or concrete',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="240" y="55" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">1-3/4" (44.5 mm)</text>
      <!-- Sloped Reducer Profile -->
      <path d="M 120 75 L 240 75 L 360 120 L 360 135 L 255 135 L 255 160 L 225 160 L 225 102 L 125 102 Q 115 102 115 95 L 115 85 Q 115 75 120 75 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="380" y="110" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">3/8" (9.5mm)</text>
      <text x="240" y="185" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Sloped Transition</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <polygon points="0,0 155,0 155,220 0,220" fill="#c7a372"/>
      <polygon points="190,0 340,0 340,220 190,220" fill="#94a3b8"/>
      <polygon points="150,0 190,0 190,220 150,220" fill="#f1b94c" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D STEP-DOWN TO TILE</text>
    </svg>`,
  },
  'Standard-TMolding': {
    dimensions: '1-3/4” x 1/4”',
    description: 'Standard T-Molding - Low profile expansion joiner for equal floors',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="240" y="60" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">1-3/4" (44.5 mm)</text>
      <path d="M 125 80 L 355 80 L 355 98 L 250 98 L 250 155 L 230 155 L 230 98 L 125 98 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="375" y="93" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">1/4"</text>
      <text x="240" y="180" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Low Profile Floor Joiner</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#1e293b"/>
      <polygon points="0,0 160,0 160,220 0,220" fill="#dfc39a"/>
      <polygon points="180,0 340,0 340,220 180,220" fill="#c7b28e"/>
      <polygon points="155,0 185,0 185,220 155,220" fill="#dfc39a" stroke="#ffffff" stroke-width="1"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D STANDARD T-MOLDING</text>
    </svg>`,
  },
  'Standard-Reducer': {
    dimensions: '1-3/4” x 3/8”',
    description: 'Standard Reducer - Versatile step-down transition profile',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="240" y="55" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">1-3/4" (44.5 mm)</text>
      <path d="M 125 78 L 230 78 L 355 125 L 355 140 L 250 140 L 250 160 L 230 160 L 230 100 L 125 100 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="375" y="112" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">3/8"</text>
      <text x="240" y="185" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Step-Down Transition</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <polygon points="0,0 155,0 155,220 0,220" fill="#b89368"/>
      <polygon points="185,0 340,0 340,220 185,220" fill="#64748b"/>
      <polygon points="150,0 185,0 185,220 150,220" fill="#dfc39a" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D STANDARD REDUCER</text>
    </svg>`,
  },
  'EndCap': {
    dimensions: '1-3/8” x 3/8”',
    description: 'End Cap / Square Nose - Clean vertical stop against sliding doors & carpet',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="220" y="55" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">1-3/8" (35 mm)</text>
      <!-- End Cap Profile -->
      <path d="M 130 80 L 320 80 L 320 155 L 285 155 L 285 105 L 130 105 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="miter"/>
      <text x="340" y="122" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">3/8"</text>
      <text x="220" y="185" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Vertical Stop / Slider Edge</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#0f172a"/>
      <polygon points="0,0 200,0 200,220 0,220" fill="#c7a372"/>
      <rect x="230" y="0" width="110" height="220" fill="rgba(147,178,248,0.25)" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="195,0 230,0 230,220 195,220" fill="#f1b94c" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D PATIO DOOR END CAP</text>
    </svg>`,
  },
  'QuarterRound-Trim': {
    dimensions: '3/4” x 3/4” x 12ft/16ft',
    description: 'Quarter Round Perimeter Shoe - Conceals baseboard expansion gap',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="240" y="55" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">3/4" (19 mm)</text>
      <!-- Quarter Round Arc Profile -->
      <path d="M 190 75 L 290 75 L 290 155 A 80 80 0 0 1 190 75 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="310" y="120" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">3/4"</text>
      <text x="240" y="185" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Perimeter Base Shoe</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#dfc39a"/>
      <rect x="0" y="100" width="340" height="50" fill="#ffffff"/>
      <polygon points="0,140 340,140 340,150 0,150" fill="#f1b94c"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D QUARTER ROUND SHOE</text>
    </svg>`,
  },
  'Universal-Threshold': {
    dimensions: '2” x 3/8”',
    description: 'Universal Threshold - Entryway transition between different flooring heights',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="240" y="60" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">2" (50.8 mm)</text>
      <polygon points="120,85 360,85 330,135 150,135" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="380" y="115" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif">3/8"</text>
      <text x="240" y="175" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Universal Bridge Transition</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#0f172a"/>
      <polygon points="0,0 140,0 140,220 0,220" fill="#c7a372"/>
      <polygon points="200,0 340,0 340,220 200,220" fill="#475569"/>
      <polygon points="135,0 205,0 205,220 135,220" fill="#f1b94c" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(10,22,128,0.85)"/>
      <text x="18" y="27" fill="#fbedb0" font-size="10" font-weight="bold">3D THRESHOLD BRIDGE</text>
    </svg>`,
  },
};

// Dedicated Detailed Technical CAD Vector Blueprints for Stairs / Steps
export const STAIR_PROFILES: Record<string, { profileSvg: string; photoUrl: string; description: string; dimensions: string; features: string[] }> = {
  'DoubleRounded': {
    dimensions: '1-3/4" Height x 1-1/2" Nose x 7/8" Thickness',
    description: 'Double Rounded Bullnose (SPC Flooring) - Smooth dual radius on top and bottom front edge for ergonomic touch, safety and traditional luxury.',
    features: ['Top & Bottom Dual Radius', 'Color-matched with SPC Collections', 'Anti-Slip Certified Texture', 'High Impact Core'],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="210" y="70" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Custom Length</text>
      <!-- Double rounded profile path -->
      <path d="M 130 90 L 305 90 C 335 90 335 155 305 155 L 285 155 L 285 118 L 130 118 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="355" y="128" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif">1-1/2"</text>
      <text x="290" y="178" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif">7/8"</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <defs>
        <linearGradient id="drStepWood" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stop-color="#dfc39a"/><stop offset="50%" stop-color="#c7a372"/><stop offset="100%" stop-color="#a88251"/>
        </linearGradient>
      </defs>
      <rect width="480" height="300" fill="#0f172a"/>
      <rect x="150" y="50" width="280" height="35" rx="8" fill="url(%23drStepWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <rect x="150" y="85" width="280" height="40" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <rect x="100" y="125" width="330" height="38" rx="10" fill="url(%23drStepWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <rect x="100" y="163" width="330" height="42" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <rect x="50" y="205" width="380" height="45" rx="12" fill="url(%23drStepWood)" stroke="#fbedb0" stroke-width="2"/>
      <rect x="50" y="250" width="380" height="45" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <path d="M50,225 Q50,205 70,205 L410,205 Q430,205 430,225 Q430,250 410,250 L70,250 Q50,250 50,225 Z" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(10,22,128,0.85)"/>
      <text x="30" y="37" fill="#fbedb0" font-size="11" font-weight="bold">3D INSTALLED DOUBLE ROUNDED</text>
    </svg>`,
  },
  'SquareStep': {
    dimensions: '1-3/4" Height x 1-3/8" Nose x 7/8" Thickness',
    description: 'Square Step Modern 90° Edge (SPC & Laminate) - Crisp architectural squared profile with precision mitered joint for luxury modern design.',
    features: ['Crisp 90° Mitered Edge', 'Available for SPC & Laminate', 'Contemporary Sharp Line', 'Seamless Click Integration'],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="210" y="70" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Custom Length</text>
      <!-- Square 90 degree step profile path -->
      <path d="M 130 90 L 330 90 L 330 155 L 305 155 L 305 118 L 130 118 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="miter"/>
      <text x="345" y="128" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif">1-3/8"</text>
      <text x="312" y="178" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif">7/8"</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <defs>
        <linearGradient id="sqStepWood" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stop-color="#c7b28e"/><stop offset="50%" stop-color="#a98f65"/><stop offset="100%" stop-color="#7a623c"/>
        </linearGradient>
      </defs>
      <rect width="480" height="300" fill="#0f172a"/>
      <polygon points="150,50 430,50 430,85 150,85" fill="url(%23sqStepWood)" stroke="#fbedb0" stroke-width="1"/>
      <polygon points="150,85 430,85 430,120 150,120" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <polygon points="100,120 430,120 430,158 100,158" fill="url(%23sqStepWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <polygon points="100,158 430,158 430,198 100,198" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <polygon points="50,198 430,198 430,245 50,245" fill="url(%23sqStepWood)" stroke="#fbedb0" stroke-width="2"/>
      <polygon points="50,245 430,245 430,295 50,295" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <line x1="50" y1="198" x2="430" y2="198" stroke="#ffffff" stroke-width="2.5"/>
      <line x1="50" y1="245" x2="430" y2="245" stroke="#ffffff" stroke-width="2"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(10,22,128,0.85)"/>
      <text x="30" y="37" fill="#fbedb0" font-size="11" font-weight="bold">3D INSTALLED SQUARE 90° STEP</text>
    </svg>`,
  },
  'FullStep': {
    dimensions: 'Custom Lengths (48", 60", 72") x 12" Full Depth',
    description: 'Full Step Tread (One-Piece Seamless Monolithic) - A continuous unbroken 12" depth surface with integrated front nosing for cantilever, floating or premium staircases.',
    features: ['100% Monolithic Single Piece', 'No Seams Across Tread Depth', 'Available with Left/Right Miter Returns', 'Compatible with LED Channels'],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="210" y="65" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">12" Full Depth Continuous Slab</text>
      <!-- Full Monolithic Tread -->
      <path d="M 60 85 L 360 85 L 360 150 L 330 150 L 330 115 L 60 115 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5" stroke-linejoin="miter"/>
      <text x="375" y="125" fill="#64748b" font-size="13" font-family="system-ui, -apple-system, sans-serif">1-1/2"</text>
      <text x="210" y="175" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Seamless One-Piece Fabrication</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
      <defs>
        <linearGradient id="fullWood" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#dfc39a"/><stop offset="100%" stop-color="#a88251"/></linearGradient>
      </defs>
      <rect width="480" height="280" fill="#09132e"/>
      <rect x="180" y="50" width="260" height="32" rx="4" fill="url(%23fullWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <rect x="120" y="115" width="300" height="35" rx="4" fill="url(%23fullWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <rect x="60" y="180" width="340" height="38" rx="4" fill="url(%23fullWood)" stroke="#fbedb0" stroke-width="2"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(10,22,128,0.85)"/>
      <text x="30" y="37" fill="#fbedb0" font-size="11" font-weight="bold">3D SEAMLESS FULL STEP TREADS</text>
    </svg>`,
  },
  'RegularStep': {
    dimensions: 'Nosing Profile + Interlocking Planks + Matching/White Riser',
    description: 'Regular Step Assembly (Modular Field Build) - Standard precision front nose piece coupled with standard flooring plank and vertical riser for flexible on-site stairs.',
    features: ['Field Modular Assembly', 'Economical and Versatile', 'Matches Standard Flooring Boxes', 'Standard Riser Integration'],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="220" viewBox="0 0 480 220" fill="none">
      <text x="140" y="65" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Standard Plank</text>
      <text x="320" y="65" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Step Nose</text>
      <!-- Plank + Nosing Joint -->
      <rect x="60" y="85" width="160" height="25" fill="#e2e8f7" stroke="#0a1680" stroke-width="2"/>
      <path d="M 225 85 L 360 85 L 360 150 L 330 150 L 330 110 L 225 110 Z" fill="#e2e8f7" stroke="#0a1680" stroke-width="2.5"/>
      <!-- Click Seam indicator -->
      <line x1="222" y1="80" x2="222" y2="115" stroke="#f1b94c" stroke-width="2" stroke-dasharray="3 3"/>
      <text x="210" y="175" fill="#64748b" font-size="12" font-family="system-ui, -apple-system, sans-serif" text-anchor="middle">Modular Plank + Bullnose Click Joint</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
      <rect width="480" height="280" fill="#09132e"/>
      <polygon points="120,60 420,60 420,95 120,95" fill="#c7b28e"/>
      <rect x="120" y="95" width="300" height="40" fill="#ffffff"/>
      <polygon points="80,135 420,135 420,175 80,175" fill="#c7b28e"/>
      <rect x="80" y="175" width="340" height="40" fill="#ffffff"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(10,22,128,0.85)"/>
      <text x="30" y="37" fill="#fbedb0" font-size="11" font-weight="bold">3D MODULAR RISER + TREAD</text>
    </svg>`,
  },
};

// 4 Rich Step Application & Example Visual Cards (As specifically requested by user)
export const STAIR_EXAMPLE_CARDS = [
  {
    id: 'floating-cantilever',
    titleEn: 'Floating Cantilever Stairs with Integrated LED',
    titleEs: 'Escalera Flotante Volada con Iluminación LED Integrada',
    category: 'Full Step Monolithic',
    subtitleEn: 'Seamless one-piece continuous treads anchored to steel or concrete stringers with concealed under-tread LED channel.',
    subtitleEs: 'Peldaños continuos sin uniones fijados sobre estructura de acero o muro lateral con canal difusor LED cálido.',
    dimensions: '48" / 60" / 72" x 12" Full Tread',
    tags: ['Full Step', 'Floating Look', 'LED Channel Ready', 'Luxury Modern'],
    imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <defs>
        <linearGradient id="wallBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <linearGradient id="stepWood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#dfc39a"/>
          <stop offset="50%" stop-color="#c7a372"/>
          <stop offset="100%" stop-color="#a88251"/>
        </linearGradient>
        <filter id="ledGlow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="600" height="380" fill="url(%23wallBg)"/>
      <!-- Glass Railing Standoffs & Glass Pane -->
      <polygon points="120,40 560,40 560,340 120,340" fill="rgba(147,178,248,0.12)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      <line x1="120" y1="40" x2="560" y2="40" stroke="#f1b94c" stroke-width="4"/>

      <!-- Floating Step 3 -->
      <rect x="260" y="80" width="280" height="34" rx="4" fill="url(%23stepWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <ellipse cx="400" cy="118" rx="140" ry="12" fill="rgba(241,185,76,0.6)" filter="url(%23ledGlow)"/>

      <!-- Floating Step 2 -->
      <rect x="180" y="160" width="280" height="34" rx="4" fill="url(%23stepWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <ellipse cx="320" cy="198" rx="140" ry="12" fill="rgba(241,185,76,0.6)" filter="url(%23ledGlow)"/>

      <!-- Floating Step 1 (Bottom) -->
      <rect x="100" y="240" width="280" height="34" rx="4" fill="url(%23stepWood)" stroke="#fbedb0" stroke-width="1.5"/>
      <ellipse cx="240" cy="278" rx="140" ry="12" fill="rgba(241,185,76,0.6)" filter="url(%23ledGlow)"/>

      <!-- Steel Standoff Brackets -->
      <circle cx="130" cy="257" r="6" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <circle cx="210" cy="177" r="6" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <circle cx="290" cy="97" r="6" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      
      <!-- Label Overlay -->
      <rect x="20" y="20" width="200" height="28" rx="6" fill="rgba(10,22,128,0.85)" stroke="#93b2f8" stroke-width="1"/>
      <text x="32" y="38" fill="#fbedb0" font-size="11" font-weight="bold" font-family="sans-serif">FLOATING MONOLITHIC + LED</text>
    </svg>`,
  },
  {
    id: 'miter-returns',
    titleEn: 'Open-End Miter Return Steps (Left / Right Finished)',
    titleEs: 'Gradas con Retorno Miter Lateral (Izquierda / Derecha)',
    category: 'Open-Stringer Staircase',
    subtitleEn: 'Pre-mitered 45° factory-finished side returns that wrap around open stair stringers with crisp architectural detail.',
    subtitleEs: 'Terminales laterales biselados en fábrica a 45° que rematan de forma limpia los extremos abiertos con barandas.',
    dimensions: 'Left Return, Right Return or Both Sides Open',
    tags: ['45° Factory Miter', 'Open End Cap', 'Clean Spindle Mount', 'SPC / Laminate'],
    imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <rect width="600" height="380" fill="#0f172a"/>
      <!-- Perspective 3D Step with Miter Corner -->
      <!-- Step Top Surface -->
      <polygon points="120,180 480,140 540,200 180,240" fill="#c7b28e" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Front Nosing Drop -->
      <polygon points="180,240 540,200 540,230 180,270" fill="#a98f65" stroke="#f1b94c" stroke-width="2"/>
      <!-- Left Finished Side Miter Return -->
      <polygon points="120,180 180,240 180,270 120,210" fill="#8f744b" stroke="#f1b94c" stroke-width="2"/>
      <!-- Miter 45 Seam -->
      <line x1="180" y1="240" x2="180" y2="270" stroke="#fbedb0" stroke-width="2.5"/>

      <!-- Iron Baluster Spindles -->
      <line x1="150" y1="210" x2="150" y2="40" stroke="#000000" stroke-width="6"/>
      <circle cx="150" cy="210" r="8" fill="#1e293b" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="220" y1="190" x2="220" y2="40" stroke="#000000" stroke-width="6"/>
      <circle cx="220" cy="190" r="8" fill="#1e293b" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="100" y1="40" x2="300" y2="40" stroke="#a88251" stroke-width="10"/>

      <rect x="20" y="20" width="220" height="28" rx="6" fill="rgba(10,22,128,0.85)" stroke="#93b2f8" stroke-width="1"/>
      <text x="30" y="38" fill="#fbedb0" font-size="11" font-weight="bold" font-family="sans-serif">FACTORY MITER RETURN DETAIL</text>
    </svg>`,
  },
  {
    id: 'white-riser-classic',
    titleEn: 'Classic Closed Staircase with Crisp White Risers',
    titleEs: 'Escalera Cerrada Clásica con Contrahuellas Blancas',
    category: 'Regular / Modular Steps',
    subtitleEn: 'High-contrast luxury design combining rich warm wood-toned SPC treads with moisture-proof primed white vertical risers.',
    subtitleEs: 'Diseño de alto contraste combinando la calidez del peldaño de madera con contrahuellas blancas luminosas.',
    dimensions: 'Standard 7" Riser x 11" Tread Run',
    tags: ['High-Contrast', 'White Primed Riser', 'Easy Cleaning', 'Residential Standard'],
    imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <rect width="600" height="380" fill="#1e293b"/>
      <!-- Step 3 -->
      <rect x="180" y="60" width="340" height="40" fill="#dfc39a" stroke="#fbedb0" stroke-width="2"/>
      <rect x="180" y="100" width="340" height="45" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Step 2 -->
      <rect x="130" y="145" width="390" height="40" fill="#dfc39a" stroke="#fbedb0" stroke-width="2"/>
      <rect x="130" y="185" width="390" height="50" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Step 1 -->
      <rect x="80" y="235" width="440" height="40" fill="#dfc39a" stroke="#fbedb0" stroke-width="2"/>
      <rect x="80" y="275" width="440" height="55" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      
      <!-- Baseboard along stair skirtboard -->
      <polygon points="50,30 80,30 520,310 490,310" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>

      <rect x="20" y="20" width="220" height="28" rx="6" fill="rgba(10,22,128,0.85)" stroke="#93b2f8" stroke-width="1"/>
      <text x="32" y="38" fill="#fbedb0" font-size="11" font-weight="bold" font-family="sans-serif">CLOSED STAIRS + WHITE RISER</text>
    </svg>`,
  },
  {
    id: 'commercial-landing',
    titleEn: 'Grand Landings & Heavy Commercial Stair Treads',
    titleEs: 'Descansos / Plataformas y Gradas de Tráfico Comercial',
    category: 'Commercial Heavy Traffic',
    subtitleEn: 'Oversized transition platforms and landing bullnoses with certified AC5/22 Mil wear rating for hotels, retail, and offices.',
    subtitleEs: 'Plataformas de descanso amplias con capa de uso 22 Mil / AC5 para centros comerciales, oficinas y hoteles.',
    dimensions: 'Custom Landing Slabs up to 96" x 48"',
    tags: ['AC5 Wear Layer', '22 Mil Rated', 'Grand Landing', 'Commercial Intense'],
    imageSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <rect width="600" height="380" fill="#09132e"/>
      <!-- Large Landing Platform -->
      <polygon points="100,120 500,80 560,180 160,220" fill="#c7b28e" stroke="#f1b94c" stroke-width="2"/>
      <polygon points="160,220 560,180 560,205 160,245" fill="#a98f65" stroke="#ffffff" stroke-width="1"/>
      <!-- Lower flight steps -->
      <polygon points="60,260 360,220 380,250 80,290" fill="#c7b28e" stroke="#ffffff" stroke-width="1"/>
      <polygon points="80,290 380,250 380,270 80,310" fill="#8f744b"/>
      <!-- Stainless Steel Posts -->
      <line x1="120" y1="120" x2="120" y2="20" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="520" y1="80" x2="520" y2="0" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="120" y1="20" x2="520" y2="0" stroke="#38bdf8" stroke-width="5"/>

      <rect x="20" y="20" width="220" height="28" rx="6" fill="rgba(10,22,128,0.85)" stroke="#93b2f8" stroke-width="1"/>
      <text x="32" y="38" fill="#fbedb0" font-size="11" font-weight="bold" font-family="sans-serif">GRAND LANDINGS & PLATFORMS</text>
    </svg>`,
  },
];
