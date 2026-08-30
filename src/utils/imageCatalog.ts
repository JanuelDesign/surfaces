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
    <rect x="24" y="24" width="220" height="34" rx="17" fill="rgba(11,11,11,0.85)" backdrop-filter="blur(8px)"/>
    <text x="44" y="46" fill="#F5F5F5" font-size="12" font-weight="bold" font-family="sans-serif" letter-spacing="1">SURFACES • 3D ROOM SCENE</text>
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
      <rect width="340" height="220" fill="#FFFFFF"/>
      <line x1="20" y1="190" x2="320" y2="190" stroke="#D9D9D9" stroke-width="1.5"/>
      <polygon points="60,30 110,30 110,190 50,190 50,55 60,30" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <line x1="125" y1="30" x2="125" y2="190" stroke="#6B6762" stroke-width="1.5"/>
      <text x="135" y="48" fill="#0B0B0B" font-size="13" font-weight="bold">BB1x6 Pine (14mm)</text>
      <text x="135" y="70" fill="#6B6762" font-size="11">Height: 5 1/2" (139.7mm)</text>
      <text x="135" y="92" fill="#0B0B0B" font-size="11">Thickness: 14mm (9/16")</text>
      <text x="135" y="114" fill="#6B6762" font-size="11">Length: 16 ft (4.88m)</text>
      <text x="135" y="136" fill="#6B6762" font-size="10">Finger-Joint Primed White</text>
      <text x="135" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-1X6-14</text>
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
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (5-1/2")</text>
    </svg>`,
  },
  'BB1x6-18mm': {
    description: 'BB1x6 White Primed Pine Heavy-Duty (18mm / 11/16")',
    thickness: '18 mm (11/16")',
    height: '5 1/2" x 3/4"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <line x1="20" y1="190" x2="320" y2="190" stroke="#D9D9D9" stroke-width="1.5"/>
      <polygon points="65,30 125,30 125,190 50,190 50,55 65,30" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5"/>
      <text x="140" y="48" fill="#0B0B0B" font-size="13" font-weight="bold">BB1x6 Pine (18mm Heavy)</text>
      <text x="140" y="70" fill="#6B6762" font-size="11">Height: 5 1/2" x 3/4"</text>
      <text x="140" y="92" fill="#0B0B0B" font-size="11">Thickness: 18mm (11/16")</text>
      <text x="140" y="114" fill="#6B6762" font-size="11">Length: 16 ft</text>
      <text x="140" y="136" fill="#6B6762" font-size="10">Extra Robust Thickness</text>
      <text x="140" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-1X6-18</text>
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
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (18mm Heavy)</text>
    </svg>`,
  },
  'BB1x4-14mm': {
    description: 'BB1x4 White Primed Pine (14mm / 9/16")',
    thickness: '14 mm (9/16")',
    height: '3 1/2" x 1/2"',
    length: '17 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <polygon points="60,75 110,75 110,190 50,190 50,95 60,75" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="125" y="80" fill="#0B0B0B" font-size="13" font-weight="bold">BB1x4 Pine (14mm)</text>
      <text x="125" y="102" fill="#6B6762" font-size="11">Height: 3 1/2" (88.9mm)</text>
      <text x="125" y="124" fill="#0B0B0B" font-size="11">Thickness: 14mm (9/16")</text>
      <text x="125" y="146" fill="#6B6762" font-size="11">Length: 17 ft (5.18m)</text>
      <text x="125" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-1X4-14</text>
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
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (3-1/2")</text>
    </svg>`,
  },
  'BB1x4-18mm': {
    description: 'BB1x4 White Primed Pine Thick (18mm / 11/16")',
    thickness: '18 mm (11/16")',
    height: '3 1/2" x 3/4"',
    length: '17 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <polygon points="65,75 125,75 125,190 50,190 50,100 65,75" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5"/>
      <text x="140" y="80" fill="#0B0B0B" font-size="13" font-weight="bold">BB1x4 Pine (18mm Thick)</text>
      <text x="140" y="102" fill="#6B6762" font-size="11">Height: 3 1/2" x 3/4"</text>
      <text x="140" y="124" fill="#0B0B0B" font-size="11">Thickness: 18mm (11/16")</text>
      <text x="140" y="146" fill="#6B6762" font-size="11">Length: 17 ft</text>
      <text x="140" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-1X4-18</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#a98f65"/>
      <polygon points="0,105 340,105 340,150 0,150" fill="#f8fafc"/>
      <line x1="0" y1="105" x2="340" y2="105" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#000000" stroke-width="2.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED (18mm Thick)</text>
    </svg>`,
  },
  'BB1x3': {
    description: 'BB1x3 White Primed Pine (18mm)',
    thickness: '18 mm (11/16")',
    height: '1 1/2" & 2 1/2"',
    length: '17 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <polygon points="65,115 125,115 125,190 50,190 50,130 65,115" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="140" y="105" fill="#0B0B0B" font-size="13" font-weight="bold">BB1x3 Pine (18mm)</text>
      <text x="140" y="125" fill="#6B6762" font-size="11">Height: 1 1/2" & 2 1/2"</text>
      <text x="140" y="145" fill="#0B0B0B" font-size="11">Thickness: 18mm • 17 ft</text>
      <text x="140" y="165" fill="#6B6762" font-size="10">Low-Profile Contemporary</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="165" fill="#334155"/>
      <polygon points="0,165 340,165 340,220 0,220" fill="#b89368"/>
      <!-- Low profile BB1x3 -->
      <polygon points="0,135 340,135 340,165 0,165" fill="#ffffff"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#ffffff" stroke-width="2"/>
      <line x1="0" y1="165" x2="340" y2="165" stroke="#0f172a" stroke-width="2"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (Low 1x3)</text>
    </svg>`,
  },
  'BB5180': {
    description: 'BB5180 Molded Colonial Pine (14mm x 5 1/4" x 16ft)',
    thickness: '14 mm (9/16")',
    height: '5 1/4" x 9/16"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <path d="M70,35 Q50,60 60,80 Q50,100 50,190 L110,190 L110,35 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="125" y="50" fill="#0B0B0B" font-size="13" font-weight="bold">BB5180 Molded Colonial</text>
      <text x="125" y="72" fill="#6B6762" font-size="11">Height: 5 1/4" (133.3mm)</text>
      <text x="125" y="94" fill="#0B0B0B" font-size="11">Thickness: 14mm • 16 ft</text>
      <text x="125" y="116" fill="#6B6762" font-size="10">Decorative Colonial Bead</text>
      <text x="125" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-5180</text>
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
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (Colonial)</text>
    </svg>`,
  },
  'BB618': {
    description: 'BB618 Curved Top Pine (14mm x 5 1/2" x 16ft)',
    thickness: '14 mm (9/16")',
    height: '5 1/2" x 9/16"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <path d="M75,30 Q50,70 50,190 L110,190 L110,30 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="125" y="50" fill="#0B0B0B" font-size="13" font-weight="bold">BB618 Curved Profile</text>
      <text x="125" y="72" fill="#6B6762" font-size="11">Height: 5 1/2" (139.7mm)</text>
      <text x="125" y="94" fill="#0B0B0B" font-size="11">Thickness: 14mm • 16 ft</text>
      <text x="125" y="116" fill="#6B6762" font-size="10">Smooth Architectural Arc</text>
      <text x="125" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-618</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="135" fill="#1e293b"/>
      <polygon points="0,135 340,135 340,220 0,220" fill="#dfc39a"/>
      <polygon points="0,75 340,75 340,135 0,135" fill="#f8fafc"/>
      <line x1="0" y1="75" x2="340" y2="75" stroke="#ffffff" stroke-width="4"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#0f172a" stroke-width="2"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (BB618)</text>
    </svg>`,
  },
  'BB620': {
    description: 'BB620 Pine Baseboard (18mm x 3 1/4" x 16ft)',
    thickness: '18 mm (11/16")',
    height: '3 1/4" x 9/16"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <path d="M75,80 Q50,110 50,190 L120,190 L120,80 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="135" y="80" fill="#0B0B0B" font-size="13" font-weight="bold">BB620 Profile Pine</text>
      <text x="135" y="102" fill="#6B6762" font-size="11">Height: 3 1/4" (82.5mm)</text>
      <text x="135" y="124" fill="#0B0B0B" font-size="11">Thickness: 18mm • 16 ft</text>
      <text x="135" y="180" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC BB-620</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#334155"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#c7a372"/>
      <polygon points="0,110 340,110 340,150 0,150" fill="#ffffff"/>
      <line x1="0" y1="110" x2="340" y2="110" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#000000" stroke-width="2.5"/>
      <rect x="12" y="12" width="160" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (BB620)</text>
    </svg>`,
  },
  'QuarterRound-EPS': {
    description: 'Quarter Round EPS 100% Waterproof (12 ft)',
    thickness: '3/4" x 3/4"',
    height: '3/4"',
    length: '12 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <path d="M60,105 L140,105 L140,185 A80,80 0 0,1 60,105 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5"/>
      <text x="40" y="45" fill="#0B0B0B" font-size="13" font-weight="bold">Quarter Round EPS Waterproof</text>
      <text x="40" y="68" fill="#6B6762" font-size="11">100% Polymer Waterproof • 12 ft</text>
      <text x="40" y="90" fill="#6B6762" font-size="10">For Bathrooms, Kitchens & Base Gaps</text>
      <text x="40" y="205" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC QR-EPS12</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#b89368"/>
      <!-- Wall Baseboard -->
      <rect x="0" y="90" width="340" height="60" fill="#f1f5f9"/>
      <!-- Quarter Round Shoe -->
      <polygon points="0,135 340,135 340,150 0,150" fill="#ffffff"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="0" y1="150" x2="340" y2="150" stroke="#000000" stroke-width="2"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW (EPS Shoe)</text>
    </svg>`,
  },
  'QuarterRound-Pine': {
    description: 'Quarter Round Pine / MDF (16 ft)',
    thickness: '3/4" x 3/4"',
    height: '3/4"',
    length: '16 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <path d="M60,105 L140,105 L140,185 A80,80 0 0,1 60,105 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="40" y="45" fill="#0B0B0B" font-size="13" font-weight="bold">Quarter Round Pine Pre-primed</text>
      <text x="40" y="68" fill="#6B6762" font-size="11">Natural Finger-Joint Pine • 16 ft</text>
      <text x="40" y="205" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC QR-PINE16</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#334155"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#a98f65"/>
      <rect x="0" y="90" width="340" height="60" fill="#ffffff"/>
      <polygon points="0,135 340,135 340,150 0,150" fill="#f8fafc"/>
      <line x1="0" y1="135" x2="340" y2="135" stroke="#ffffff" stroke-width="2"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED (Pine Round)</text>
    </svg>`,
  },
  'Square1x1-MDF': {
    description: 'Square 1x1 MDF Waterproof Base Shoe (8 ft)',
    thickness: '1" x 1"',
    height: '1"',
    length: '8 ft',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#FFFFFF"/>
      <rect x="60" y="110" width="75" height="75" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <text x="40" y="45" fill="#0B0B0B" font-size="13" font-weight="bold">Square 1x1 MDF Waterproof</text>
      <text x="40" y="68" fill="#6B6762" font-size="11">Clean 90° Modern Shoe Trim • 8 ft</text>
      <text x="40" y="205" fill="#0B0B0B" font-size="10" font-family="monospace">SPEC SQ-MDF08</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="150" fill="#1e293b"/>
      <polygon points="0,150 340,150 340,220 0,220" fill="#dfc39a"/>
      <rect x="0" y="80" width="340" height="70" fill="#ffffff"/>
      <rect x="0" y="130" width="340" height="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED (Square 1x1)</text>
    </svg>`,
  },
};

// Dedicated Profiles & Renderings for Moldings (All Complete Catalog Models)
export const MOLDING_IMAGES: Record<string, { profileSvg: string; photoUrl: string; description: string; dimensions: string }> = {
  'CM-TMolding': {
    dimensions: '1-3/4” x 3/8”',
    description: 'Provides a stylish transition between floors, both functional and aesthetically pleasing.',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" fill="none">
      <rect width="500" height="260" fill="#FFFFFF"/>
      <!-- Grid Lines Subtle -->
      <line x1="30" y1="210" x2="470" y2="210" stroke="#E5E5E5" stroke-width="1"/>
      <line x1="30" y1="210" x2="470" y2="210" stroke="#0B0B0B" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Top Dimension Line 1-3/4" -->
      <line x1="90" y1="50" x2="410" y2="50" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="90,50 102,46 102,54" fill="#0B0B0B"/>
      <polygon points="410,50 398,46 398,54" fill="#0B0B0B"/>
      <line x1="90" y1="42" x2="90" y2="75" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="410" y1="42" x2="410" y2="75" stroke="#BCBAB4" stroke-width="1"/>
      <text x="250" y="42" fill="#0B0B0B" font-size="14" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">1-3/4"</text>

      <!-- Height Dimension 3/8" -->
      <line x1="440" y1="75" x2="440" y2="135" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="440,75 436,87 444,87" fill="#0B0B0B"/>
      <polygon points="440,135 436,123 444,123" fill="#0B0B0B"/>
      <line x1="410" y1="75" x2="452" y2="75" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="275" y1="135" x2="452" y2="135" stroke="#BCBAB4" stroke-width="1"/>
      <text x="460" y="110" fill="#0B0B0B" font-size="13" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="start">3/8"</text>

      <!-- CM T-Molding Cross Section Body -->
      <path d="M 90 90 Q 250 62 410 90 L 410 102 Q 380 106 360 115 L 268 115 L 268 190 L 232 190 L 232 115 L 140 115 Q 120 106 90 102 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Center Stem Track Details -->
      <line x1="240" y1="190" x2="260" y2="190" stroke="#0B0B0B" stroke-width="2"/>
      <circle cx="250" cy="180" r="3" fill="#0B0B0B"/>

      <!-- Floor / Subfloor representations -->
      <rect x="30" y="135" width="180" height="75" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="120" y="178" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">FLOOR LEVEL A</text>

      <rect x="290" y="135" width="180" height="75" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="380" y="178" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">FLOOR LEVEL B</text>

      <!-- Technical Callout Label -->
      <text x="250" y="242" fill="#6B6762" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">CM T-MOLDING • SAME LEVEL TRANSITION (1-3/4" x 3/8")</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <defs>
        <linearGradient id="tmFloorL" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#e2d7c8"/><stop offset="100%" stop-color="#c4b39b"/></linearGradient>
        <linearGradient id="tmFloorR" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#c4b39b"/><stop offset="100%" stop-color="#a6947c"/></linearGradient>
        <linearGradient id="tmCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#e5e5e5"/><stop offset="100%" stop-color="#0b0b0b"/></linearGradient>
      </defs>
      <rect width="340" height="220" fill="#141414"/>
      <polygon points="0,0 155,0 155,220 0,220" fill="url(%23tmFloorL)"/>
      <line x1="40" y1="0" x2="30" y2="220" stroke="#785328" stroke-width="1.5" opacity="0.3"/>
      <polygon points="185,0 340,0 340,220 185,220" fill="url(%23tmFloorR)"/>
      <line x1="240" y1="0" x2="250" y2="220" stroke="#4a2c11" stroke-width="1.5" opacity="0.3"/>
      <polygon points="150,0 190,0 190,220 150,220" fill="#262626" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D INSTALLED VIEW</text>
    </svg>`,
  },
  'CM-Reducer': {
    dimensions: '1-3/4” x 3/8”',
    description: 'Ideal for leveling uneven surfaces, combining utility and design.',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" fill="none">
      <rect width="500" height="260" fill="#FFFFFF"/>
      <line x1="30" y1="210" x2="470" y2="210" stroke="#0B0B0B" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Top Dimension Line 1-3/4" -->
      <line x1="90" y1="50" x2="410" y2="50" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="90,50 102,46 102,54" fill="#0B0B0B"/>
      <polygon points="410,50 398,46 398,54" fill="#0B0B0B"/>
      <line x1="90" y1="42" x2="90" y2="75" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="410" y1="42" x2="410" y2="185" stroke="#BCBAB4" stroke-width="1"/>
      <text x="250" y="42" fill="#0B0B0B" font-size="14" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">1-3/4"</text>

      <!-- Height Dimension 3/8" -->
      <line x1="50" y1="75" x2="50" y2="135" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="50,75 46,87 54,87" fill="#0B0B0B"/>
      <polygon points="50,135 46,123 54,123" fill="#0B0B0B"/>
      <line x1="42" y1="75" x2="90" y2="75" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="42" y1="135" x2="90" y2="135" stroke="#BCBAB4" stroke-width="1"/>
      <text x="35" y="110" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="end">3/8"</text>

      <!-- CM Reducer Curved Cross Section -->
      <path d="M 90 75 L 210 75 Q 350 78 410 185 L 390 190 L 268 120 L 268 190 L 232 190 L 232 115 L 140 115 Q 110 106 90 100 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Subfloors representation -->
      <rect x="70" y="135" width="140" height="75" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="140" y="178" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">UPPER FLOOR</text>

      <line x1="290" y1="190" x2="470" y2="190" stroke="#0B0B0B" stroke-width="2"/>
      <text x="390" y="208" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">LOWER LEVEL / SUBFLOOR</text>

      <text x="250" y="242" fill="#6B6762" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">CM REDUCER • UNEVEN SURFACE LEVELER (1-3/4" x 3/8")</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <polygon points="0,0 155,0 155,220 0,220" fill="#c4b39b"/>
      <polygon points="190,0 340,0 340,220 190,220" fill="#6B6762"/>
      <polygon points="150,0 190,0 190,220 150,220" fill="#262626" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D STEP-DOWN TO TILE</text>
    </svg>`,
  },
  'Standard-TMolding': {
    dimensions: '1-3/4” x 1/4”',
    description: 'Perfect for joining different floors, ensuring a smooth transition.',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" fill="none">
      <rect width="500" height="260" fill="#FFFFFF"/>
      <line x1="30" y1="210" x2="470" y2="210" stroke="#0B0B0B" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Top Dimension Line 1-3/4" -->
      <line x1="90" y1="50" x2="410" y2="50" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="90,50 102,46 102,54" fill="#0B0B0B"/>
      <polygon points="410,50 398,46 398,54" fill="#0B0B0B"/>
      <line x1="90" y1="42" x2="90" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="410" y1="42" x2="410" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <text x="250" y="42" fill="#0B0B0B" font-size="14" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">1-3/4"</text>

      <!-- Height Dimension 1/4" -->
      <line x1="440" y1="80" x2="440" y2="125" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="440,80 436,92 444,92" fill="#0B0B0B"/>
      <polygon points="440,125 436,113 444,113" fill="#0B0B0B"/>
      <line x1="410" y1="80" x2="452" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="270" y1="125" x2="452" y2="125" stroke="#BCBAB4" stroke-width="1"/>
      <text x="460" y="107" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="start">1/4"</text>

      <!-- Standard T-Molding Cross Section -->
      <path d="M 90 80 L 410 80 L 410 102 L 265 102 L 265 185 L 235 185 L 235 102 L 90 102 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Floors -->
      <rect x="30" y="125" width="185" height="85" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="122" y="175" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">FLOOR 1</text>

      <rect x="285" y="125" width="185" height="85" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="377" y="175" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">FLOOR 2</text>

      <text x="250" y="242" fill="#6B6762" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">T-MOLDING • STANDARD LEVEL JOINER (1-3/4" x 1/4")</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#141414"/>
      <polygon points="0,0 160,0 160,220 0,220" fill="#dfc39a"/>
      <polygon points="180,0 340,0 340,220 180,220" fill="#c7b28e"/>
      <polygon points="155,0 185,0 185,220 155,220" fill="#262626" stroke="#ffffff" stroke-width="1"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D STANDARD T-MOLDING</text>
    </svg>`,
  },
  'Standard-Reducer': {
    dimensions: '1-3/4” x 3/8”',
    description: 'Facilitates the transition between floors of different heights, practical and versatile.',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" fill="none">
      <rect width="500" height="260" fill="#FFFFFF"/>
      <line x1="30" y1="210" x2="470" y2="210" stroke="#0B0B0B" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Top Dimension Line 1-3/4" -->
      <line x1="90" y1="50" x2="410" y2="50" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="90,50 102,46 102,54" fill="#0B0B0B"/>
      <polygon points="410,50 398,46 398,54" fill="#0B0B0B"/>
      <line x1="90" y1="42" x2="90" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="410" y1="42" x2="410" y2="185" stroke="#BCBAB4" stroke-width="1"/>
      <text x="250" y="42" fill="#0B0B0B" font-size="14" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">1-3/4"</text>

      <!-- Height Dimension 3/8" -->
      <line x1="50" y1="80" x2="50" y2="135" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="50,80 46,92 54,92" fill="#0B0B0B"/>
      <polygon points="50,135 46,123 54,123" fill="#0B0B0B"/>
      <line x1="42" y1="80" x2="90" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="42" y1="135" x2="90" y2="135" stroke="#BCBAB4" stroke-width="1"/>
      <text x="35" y="112" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="end">3/8"</text>

      <!-- Standard Reducer Profile -->
      <path d="M 90 80 L 220 80 L 410 170 L 410 185 L 265 185 L 265 190 L 235 190 L 235 105 L 90 105 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Floors -->
      <rect x="70" y="135" width="145" height="75" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="142" y="178" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">FINISHED FLOOR</text>

      <line x1="280" y1="190" x2="470" y2="190" stroke="#0B0B0B" stroke-width="2"/>
      <text x="380" y="208" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">SUBFLOOR / LOWER FLOOR</text>

      <text x="250" y="242" fill="#6B6762" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">REDUCER • VERSATILE TRANSITION PROFILE (1-3/4" x 3/8")</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <polygon points="0,0 155,0 155,220 0,220" fill="#b89368"/>
      <polygon points="185,0 340,0 340,220 185,220" fill="#64748b"/>
      <polygon points="150,0 185,0 185,220 150,220" fill="#262626" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D STANDARD REDUCER</text>
    </svg>`,
  },
  'EndCap': {
    dimensions: '1-3/8” x 3/8”',
    description: 'Completes your floor installation with an elegant and professional touch.',
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" fill="none">
      <rect width="500" height="260" fill="#FFFFFF"/>
      <line x1="30" y1="210" x2="470" y2="210" stroke="#0B0B0B" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Top Dimension Line 1-3/8" -->
      <line x1="120" y1="50" x2="380" y2="50" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="120,50 132,46 132,54" fill="#0B0B0B"/>
      <polygon points="380,50 368,46 368,54" fill="#0B0B0B"/>
      <line x1="120" y1="42" x2="120" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="380" y1="42" x2="380" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <text x="250" y="42" fill="#0B0B0B" font-size="14" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">1-3/8"</text>

      <!-- Height Dimension 3/8" -->
      <line x1="410" y1="80" x2="410" y2="190" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="410,80 406,92 414,92" fill="#0B0B0B"/>
      <polygon points="410,190 406,178 414,178" fill="#0B0B0B"/>
      <line x1="380" y1="80" x2="422" y2="80" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="340" y1="190" x2="422" y2="190" stroke="#BCBAB4" stroke-width="1"/>
      <text x="430" y="140" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="start">3/8"</text>

      <!-- End Cap Profile Shape -->
      <path d="M 120 80 L 370 80 Q 380 80 380 90 L 380 180 Q 380 190 370 190 L 340 190 L 340 115 L 120 115 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Flooring and Wall / Slider Track -->
      <rect x="30" y="115" width="280" height="95" fill="#FAFAFA" stroke="#D9D9D9" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="170" y="170" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">FLOORING TERMINATION</text>

      <rect x="382" y="50" width="80" height="160" fill="#E5E5E5" stroke="#0B0B0B" stroke-width="1.5"/>
      <text x="422" y="135" fill="#0B0B0B" font-size="10" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle" transform="rotate(90 422 135)">SLIDING DOOR / CARPET</text>

      <text x="250" y="242" fill="#6B6762" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">END CAP • VERTICAL WALL & THRESHOLD STOP (1-3/8" x 3/8")</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="340" height="220" viewBox="0 0 340 220">
      <rect width="340" height="220" fill="#141414"/>
      <polygon points="0,0 200,0 200,220 0,220" fill="#c7a372"/>
      <rect x="230" y="0" width="110" height="220" fill="rgba(255,255,255,0.15)" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="195,0 230,0 230,220 195,220" fill="#262626" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="12" y="12" width="165" height="22" rx="4" fill="rgba(11,11,11,0.9)"/>
      <text x="18" y="27" fill="#F5F5F5" font-size="10" font-weight="bold">3D PATIO DOOR END CAP</text>
    </svg>`,
  },
};

// Dedicated Detailed Technical CAD Vector Blueprints for Stairs / Steps
export const STAIR_PROFILES: Record<string, { profileSvg: string; photoUrl: string; description: string; dimensions: string; features: string[] }> = {
  'DoubleRounded': {
    dimensions: 'Custom Length x 1-3/4" Height x 1-1/2" Nose x 7/8" Thickness',
    description: 'Double Rounded Bullnose - Available in SPC Flooring. Smooth dual radius on top and bottom front edge for ergonomic touch, safety and traditional luxury.',
    features: [
      'Available in SPC Flooring',
      'Dual Bullnose Smooth Radii (Top & Bottom)',
      'Custom Lengths with 7/8" Solid Thickness',
      '1-3/4" Total Outer Height with 1-1/2" Nose Drop',
      '7/8" Bottom Return Lip for perfect riser lock',
    ],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="560" height="300" viewBox="0 0 560 300" fill="none">
      <rect width="560" height="300" fill="#FFFFFF"/>
      
      <!-- Subtitle badge: Available in SPC Flooring -->
      <rect x="180" y="12" width="200" height="24" rx="12" fill="#F5F5F5" stroke="#BCBAB4" stroke-width="1"/>
      <text x="280" y="28" fill="#0B0B0B" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">Available in SPC Flooring</text>

      <!-- Horizontal Run Top Dimension: Custom -->
      <line x1="80" y1="58" x2="380" y2="58" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="80,58 92,54 92,62" fill="#0B0B0B"/>
      <polygon points="380,58 368,54 368,62" fill="#0B0B0B"/>
      <line x1="80" y1="50" x2="80" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="380" y1="50" x2="380" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <text x="230" y="52" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">&lt;--- Custom ---&gt;</text>

      <!-- Thickness Dimension: 7/8" on top slab -->
      <line x1="420" y1="85" x2="420" y2="135" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="420,85 416,97 424,97" fill="#0B0B0B"/>
      <polygon points="420,135 416,123 424,123" fill="#0B0B0B"/>
      <line x1="380" y1="85" x2="435" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="380" y1="135" x2="435" y2="135" stroke="#BCBAB4" stroke-width="1"/>
      <text x="445" y="115" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold">7/8"</text>

      <!-- Left Nose Total Drop Dimension: 1-3/4" -->
      <line x1="40" y1="85" x2="40" y2="235" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="40,85 36,97 44,97" fill="#0B0B0B"/>
      <polygon points="40,235 36,223 44,223" fill="#0B0B0B"/>
      <line x1="32" y1="85" x2="80" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="32" y1="235" x2="80" y2="235" stroke="#BCBAB4" stroke-width="1"/>
      <text x="28" y="165" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="end">1-3/4"</text>

      <!-- Inside Nose Drop Dimension: 1-1/2" -->
      <line x1="160" y1="135" x2="160" y2="235" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="160,135 156,147 164,147" fill="#0B0B0B"/>
      <polygon points="160,235 156,223 164,223" fill="#0B0B0B"/>
      <line x1="125" y1="235" x2="170" y2="235" stroke="#BCBAB4" stroke-width="1"/>
      <text x="175" y="190" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold">1-1/2"</text>

      <!-- Bottom Return Lip Dimension: 7/8" -->
      <line x1="75" y1="260" x2="125" y2="260" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="75,260 87,256 87,264" fill="#0B0B0B"/>
      <polygon points="125,260 113,256 113,264" fill="#0B0B0B"/>
      <line x1="75" y1="235" x2="75" y2="270" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="125" y1="235" x2="125" y2="270" stroke="#BCBAB4" stroke-width="1"/>
      <text x="100" y="280" fill="#0B0B0B" font-size="12" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">7/8"</text>

      <!-- Double Rounded Bullnose Stair Profile Cross-Section -->
      <path d="M 380 85 L 105 85 Q 75 85 75 115 L 75 205 Q 75 235 105 235 L 125 235 L 125 135 L 380 135 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="3" stroke-linejoin="round"/>
      
      <!-- Hatching details -->
      <line x1="100" y1="95" x2="120" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="140" y1="95" x2="160" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="180" y1="95" x2="200" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="220" y1="95" x2="240" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="260" y1="95" x2="280" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="300" y1="95" x2="320" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="340" y1="95" x2="360" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>

      <!-- Blueprint Footer Note -->
      <text x="350" y="275" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">DOUBLE ROUNDED STAIR STEP • ARCHITECTURAL CAD BLUEPRINT</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <defs>
        <linearGradient id="drStepWood" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stop-color="#dfc39a"/><stop offset="50%" stop-color="#c7a372"/><stop offset="100%" stop-color="#a88251"/>
        </linearGradient>
      </defs>
      <rect width="480" height="300" fill="#141414"/>
      <rect x="150" y="50" width="280" height="35" rx="8" fill="url(%23drStepWood)" stroke="#ffffff" stroke-width="1"/>
      <rect x="150" y="85" width="280" height="40" fill="#262626" stroke="#404040" stroke-width="1"/>
      <rect x="100" y="125" width="330" height="38" rx="10" fill="url(%23drStepWood)" stroke="#ffffff" stroke-width="1"/>
      <rect x="100" y="163" width="330" height="42" fill="#262626" stroke="#404040" stroke-width="1"/>
      <rect x="50" y="205" width="380" height="45" rx="12" fill="url(%23drStepWood)" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="50" y="250" width="380" height="45" fill="#262626" stroke="#404040" stroke-width="1"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(11,11,11,0.9)"/>
      <text x="30" y="37" fill="#F5F5F5" font-size="11" font-weight="bold">3D INSTALLED DOUBLE ROUNDED</text>
    </svg>`,
  },
  'SquareStep': {
    dimensions: 'Custom Length x 1-3/4" Height x 1-3/8" Nose x 7/8" Thickness',
    description: 'Square Step Modern 90° Edge - Available in SPC Flooring & Laminate Flooring. Crisp architectural squared profile with precision mitered joint for luxury modern design.',
    features: [
      'Available in SPC Flooring & Laminate Flooring',
      'Crisp 90° Architectural Mitered Edge',
      'Custom Lengths with 7/8" Solid Thickness',
      '1-3/4" Total Outer Height with 1-3/8" Inside Nose Drop',
      '7/8" Bottom Return Lip for interlocking with vertical riser',
    ],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="560" height="300" viewBox="0 0 560 300" fill="none">
      <rect width="560" height="300" fill="#FFFFFF"/>
      
      <!-- Subtitle badge: Available in SPC Flooring & Laminate Flooring -->
      <rect x="130" y="12" width="300" height="24" rx="12" fill="#F5F5F5" stroke="#BCBAB4" stroke-width="1"/>
      <text x="280" y="28" fill="#0B0B0B" font-size="11" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">Available in SPC Flooring &amp; Laminate Flooring</text>

      <!-- Horizontal Run Top Dimension: Custom -->
      <line x1="80" y1="58" x2="380" y2="58" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="80,58 92,54 92,62" fill="#0B0B0B"/>
      <polygon points="380,58 368,54 368,62" fill="#0B0B0B"/>
      <line x1="80" y1="50" x2="80" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="380" y1="50" x2="380" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <text x="230" y="52" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">&lt;--- Custom ---&gt;</text>

      <!-- Thickness Dimension: 7/8" on top slab -->
      <line x1="420" y1="85" x2="420" y2="135" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="420,85 416,97 424,97" fill="#0B0B0B"/>
      <polygon points="420,135 416,123 424,123" fill="#0B0B0B"/>
      <line x1="380" y1="85" x2="435" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="380" y1="135" x2="435" y2="135" stroke="#BCBAB4" stroke-width="1"/>
      <text x="445" y="115" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold">7/8"</text>

      <!-- Left Nose Total Drop Dimension: 1-3/4" -->
      <line x1="40" y1="85" x2="40" y2="235" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="40,85 36,97 44,97" fill="#0B0B0B"/>
      <polygon points="40,235 36,223 44,223" fill="#0B0B0B"/>
      <line x1="32" y1="85" x2="80" y2="85" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="32" y1="235" x2="80" y2="235" stroke="#BCBAB4" stroke-width="1"/>
      <text x="28" y="165" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="end">1-3/4"</text>

      <!-- Inside Nose Drop Dimension: 1-3/8" -->
      <line x1="160" y1="135" x2="160" y2="235" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="160,135 156,147 164,147" fill="#0B0B0B"/>
      <polygon points="160,235 156,223 164,223" fill="#0B0B0B"/>
      <line x1="125" y1="235" x2="170" y2="235" stroke="#BCBAB4" stroke-width="1"/>
      <text x="175" y="190" fill="#0B0B0B" font-size="13" font-family="system-ui, sans-serif" font-weight="bold">1-3/8"</text>

      <!-- Bottom Return Lip Dimension: 7/8" -->
      <line x1="75" y1="260" x2="125" y2="260" stroke="#0B0B0B" stroke-width="1.5"/>
      <polygon points="75,260 87,256 87,264" fill="#0B0B0B"/>
      <polygon points="125,260 113,256 113,264" fill="#0B0B0B"/>
      <line x1="75" y1="235" x2="75" y2="270" stroke="#BCBAB4" stroke-width="1"/>
      <line x1="125" y1="235" x2="125" y2="270" stroke="#BCBAB4" stroke-width="1"/>
      <text x="100" y="280" fill="#0B0B0B" font-size="12" font-family="system-ui, sans-serif" font-weight="bold" text-anchor="middle">7/8"</text>

      <!-- Square 90 Degree Stair Step Cross-Section (Sharp corners) -->
      <path d="M 380 85 L 80 85 L 80 235 L 125 235 L 125 135 L 380 135 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="3" stroke-linejoin="miter"/>
      
      <!-- 90 degree square indicator -->
      <polyline points="80,105 100,105 100,85" fill="none" stroke="#0B0B0B" stroke-width="1.5"/>

      <!-- Hatching details -->
      <line x1="100" y1="95" x2="120" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="140" y1="95" x2="160" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="180" y1="95" x2="200" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="220" y1="95" x2="240" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="260" y1="95" x2="280" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="300" y1="95" x2="320" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>
      <line x1="340" y1="95" x2="360" y2="115" stroke="#D9D9D9" stroke-width="1.5"/>

      <!-- Blueprint Footer Note -->
      <text x="350" y="275" fill="#6B6762" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">SQUARE STEP 90° • ARCHITECTURAL CAD BLUEPRINT</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300">
      <defs>
        <linearGradient id="sqStepWood" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%" stop-color="#c7b28e"/><stop offset="50%" stop-color="#a98f65"/><stop offset="100%" stop-color="#7a623c"/>
        </linearGradient>
      </defs>
      <rect width="480" height="300" fill="#141414"/>
      <polygon points="150,50 430,50 430,85 150,85" fill="url(%23sqStepWood)" stroke="#ffffff" stroke-width="1"/>
      <polygon points="150,85 430,85 430,120 150,120" fill="#262626" stroke="#404040" stroke-width="1"/>
      <polygon points="100,120 430,120 430,158 100,158" fill="url(%23sqStepWood)" stroke="#ffffff" stroke-width="1"/>
      <polygon points="100,158 430,158 430,198 100,198" fill="#262626" stroke="#404040" stroke-width="1"/>
      <polygon points="50,198 430,198 430,245 50,245" fill="url(%23sqStepWood)" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="50,245 430,245 430,295 50,295" fill="#262626" stroke="#404040" stroke-width="1"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(11,11,11,0.9)"/>
      <text x="30" y="37" fill="#F5F5F5" font-size="11" font-weight="bold">3D INSTALLED SQUARE 90° STEP</text>
    </svg>`,
  },
  'FullStep': {
    dimensions: 'Custom Lengths (48", 60", 72") x 12" Full Depth',
    description: 'Full Step Tread (One-Piece Seamless Monolithic) - A continuous unbroken 12" depth surface with integrated front nosing for cantilever, floating or premium staircases.',
    features: ['100% Monolithic Single Piece', 'No Seams Across Tread Depth', 'Available with Left/Right Miter Returns', 'Compatible with LED Channels'],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="220" viewBox="0 0 500 220" fill="none">
      <rect width="500" height="220" fill="#FFFFFF"/>
      <text x="220" y="55" fill="#0B0B0B" font-size="13" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">12" Full Depth Continuous Slab</text>
      <!-- Full Monolithic Tread -->
      <path d="M 60 75 L 380 75 L 380 150 L 345 150 L 345 110 L 60 110 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5" stroke-linejoin="miter"/>
      <text x="395" y="120" fill="#0B0B0B" font-size="13" font-family="system-ui, -apple-system, sans-serif" font-weight="bold">1-1/2"</text>
      <text x="220" y="180" fill="#6B6762" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">Seamless One-Piece Fabrication</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
      <defs>
        <linearGradient id="fullWood" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stop-color="#dfc39a"/><stop offset="100%" stop-color="#a88251"/></linearGradient>
      </defs>
      <rect width="480" height="280" fill="#141414"/>
      <rect x="180" y="50" width="260" height="32" rx="4" fill="url(%23fullWood)" stroke="#ffffff" stroke-width="1"/>
      <rect x="120" y="115" width="300" height="35" rx="4" fill="url(%23fullWood)" stroke="#ffffff" stroke-width="1"/>
      <rect x="60" y="180" width="340" height="38" rx="4" fill="url(%23fullWood)" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(11,11,11,0.9)"/>
      <text x="30" y="37" fill="#F5F5F5" font-size="11" font-weight="bold">3D SEAMLESS FULL STEP TREADS</text>
    </svg>`,
  },
  'RegularStep': {
    dimensions: 'Nosing Profile + Interlocking Planks + Matching/White Riser',
    description: 'Regular Step Assembly (Modular Field Build) - Standard precision front nose piece coupled with standard flooring plank and vertical riser for flexible on-site stairs.',
    features: ['Field Modular Assembly', 'Economical and Versatile', 'Matches Standard Flooring Boxes', 'Standard Riser Integration'],
    profileSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="220" viewBox="0 0 500 220" fill="none">
      <rect width="500" height="220" fill="#FFFFFF"/>
      <text x="140" y="55" fill="#0B0B0B" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">Standard Plank</text>
      <text x="320" y="55" fill="#0B0B0B" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" text-anchor="middle">Step Nose</text>
      <!-- Plank + Nosing Joint -->
      <rect x="60" y="75" width="160" height="28" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2"/>
      <path d="M 225 75 L 360 75 L 360 150 L 330 150 L 330 103 L 225 103 Z" fill="#F5F5F5" stroke="#0B0B0B" stroke-width="2.5"/>
      <line x1="222" y1="70" x2="222" y2="108" stroke="#0B0B0B" stroke-width="2" stroke-dasharray="3 3"/>
      <text x="210" y="180" fill="#6B6762" font-size="12" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">Modular Plank + Bullnose Click Joint</text>
    </svg>`,
    photoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
      <rect width="480" height="280" fill="#141414"/>
      <polygon points="120,60 420,60 420,95 120,95" fill="#c7b28e"/>
      <rect x="120" y="95" width="300" height="40" fill="#ffffff"/>
      <polygon points="80,135 420,135 420,175 80,175" fill="#c7b28e"/>
      <rect x="80" y="175" width="340" height="40" fill="#ffffff"/>
      <rect x="20" y="20" width="220" height="26" rx="6" fill="rgba(11,11,11,0.9)"/>
      <text x="30" y="37" fill="#F5F5F5" font-size="11" font-weight="bold">3D MODULAR RISER + TREAD</text>
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
      <rect x="20" y="20" width="200" height="28" rx="6" fill="rgba(11,11,11,0.9)" stroke="#404040" stroke-width="1"/>
      <text x="32" y="38" fill="#F5F5F5" font-size="11" font-weight="bold" font-family="sans-serif">FLOATING MONOLITHIC + LED</text>
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
      <polygon points="180,240 540,200 540,230 180,270" fill="#a98f65" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Left Finished Side Miter Return -->
      <polygon points="120,180 180,240 180,270 120,210" fill="#8f744b" stroke="#ffffff" stroke-width="1.5"/>
      <!-- Miter 45 Seam -->
      <line x1="180" y1="240" x2="180" y2="270" stroke="#F5F5F5" stroke-width="2.5"/>

      <!-- Iron Baluster Spindles -->
      <line x1="150" y1="210" x2="150" y2="40" stroke="#000000" stroke-width="6"/>
      <circle cx="150" cy="210" r="8" fill="#1e293b" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="220" y1="190" x2="220" y2="40" stroke="#000000" stroke-width="6"/>
      <circle cx="220" cy="190" r="8" fill="#1e293b" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="100" y1="40" x2="300" y2="40" stroke="#a88251" stroke-width="10"/>

      <rect x="20" y="20" width="220" height="28" rx="6" fill="rgba(11,11,11,0.9)" stroke="#404040" stroke-width="1"/>
      <text x="30" y="38" fill="#F5F5F5" font-size="11" font-weight="bold" font-family="sans-serif">FACTORY MITER RETURN DETAIL</text>
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
      <rect x="180" y="60" width="340" height="40" fill="#dfc39a" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="180" y="100" width="340" height="45" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Step 2 -->
      <rect x="130" y="145" width="390" height="40" fill="#dfc39a" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="130" y="185" width="390" height="50" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Step 1 -->
      <rect x="80" y="235" width="440" height="40" fill="#dfc39a" stroke="#ffffff" stroke-width="1.5"/>
      <rect x="80" y="275" width="440" height="55" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      
      <!-- Baseboard along stair skirtboard -->
      <polygon points="50,30 80,30 520,310 490,310" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>

      <rect x="20" y="20" width="220" height="28" rx="6" fill="rgba(11,11,11,0.9)" stroke="#404040" stroke-width="1"/>
      <text x="32" y="38" fill="#F5F5F5" font-size="11" font-weight="bold" font-family="sans-serif">CLOSED STAIRS + WHITE RISER</text>
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
      <rect width="600" height="380" fill="#141414"/>
      <!-- Large Landing Platform -->
      <polygon points="100,120 500,80 560,180 160,220" fill="#c7b28e" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="160,220 560,180 560,205 160,245" fill="#a98f65" stroke="#ffffff" stroke-width="1"/>
      <!-- Lower flight steps -->
      <polygon points="60,260 360,220 380,250 80,290" fill="#c7b28e" stroke="#ffffff" stroke-width="1"/>
      <polygon points="80,290 380,250 380,270 80,310" fill="#8f744b"/>
      <!-- Stainless Steel Posts -->
      <line x1="120" y1="120" x2="120" y2="20" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="520" y1="80" x2="520" y2="0" stroke="#cbd5e1" stroke-width="6"/>
      <line x1="120" y1="20" x2="520" y2="0" stroke="#ffffff" stroke-width="5"/>

      <rect x="20" y="20" width="220" height="28" rx="6" fill="rgba(11,11,11,0.9)" stroke="#404040" stroke-width="1"/>
      <text x="32" y="38" fill="#F5F5F5" font-size="11" font-weight="bold" font-family="sans-serif">GRAND LANDINGS & PLATFORMS</text>
    </svg>`,
  },
];
