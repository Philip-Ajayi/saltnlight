export interface Booth {
    id: string;
    code: string;
    tier: "Standard" | "Premium" | "Anchor";
    dimension: string;
    price: string;
    status: "available" | "reserved" | "occupied";
    position: [number, number, number]; // 3D coordinates [x, y, z]
    mountain: string;
    description: string;
    exhibitorName?: string;
  }
  
  export interface Exhibitor {
    id: string;
    name: string;
    mountain: string;
    boothCode: string;
    category: string;
    logo: string;
    tagline: string;
    description: string;
    website?: string;
    products: string[];
  }
  
  export const EXHIBITION_TIERS = [
    {
      id: "standard",
      name: "Standard Canopy",
      size: "3m × 3m",
      price: "₦150,000",
      features: [
        "Standard 3x3m Booth Frame",
        "Single 13A Power Outlet",
        "2 Exhibitor Passes",
        "Directory Listing on Website & App",
        "Standard Lighting",
      ],
      recommendedFor: "Emerging brands, publishers, non-profits, and boutique services",
    },
    {
      id: "premium",
      name: "Mountain Pavilion",
      size: "6m × 3m",
      price: "₦350,000",
      features: [
        "Double-width Pavilion Shell",
        "Dedicated 2x 13A Outlets + High-speed Wi-Fi",
        "4 Exhibitor Passes",
        "Featured Spotlight in Digital Directory",
        "LED Perimeter Lighting",
        "Access to VIP Networking Lounge",
      ],
      recommendedFor: "Established enterprises, tech innovators, and scaling brands",
    },
    {
      id: "anchor",
      name: "Anchor Space",
      size: "6m × 6m Island",
      price: "₦750,000",
      features: [
        "Prime Central Island Floorplan",
        "3-Phase Custom Power Access",
        "8 Exhibitor Passes + 2 Main Arena VIP Passes",
        "Dedicated Mainstage Shoutout & Video Reel Spot",
        "Private On-site Meeting Lounge Access",
        "Full Custom Branding Wall Authorization",
      ],
      recommendedFor: "Corporate leaders, primary sponsors, and summit partners",
    },
  ];
  
  export const BOOTHS: Booth[] = [
    // Front Row (Anchor / Premium)
    {
      id: "b-01",
      code: "A-01",
      tier: "Anchor",
      dimension: "6m × 6m",
      price: "₦750,000",
      status: "occupied",
      position: [-4.5, 0, -2],
      mountain: "Marketplace",
      description: "Central Island position directly adjacent to the main auditorium atrium.",
      exhibitorName: "Veritas Financial Guild",
    },
    {
      id: "b-02",
      code: "A-02",
      tier: "Anchor",
      dimension: "6m × 6m",
      price: "₦750,000",
      status: "available",
      position: [0, 0, -2],
      mountain: "Media",
      description: "High-visibility central pavilion with panoramic foot-traffic exposure.",
    },
    {
      id: "b-03",
      code: "A-03",
      tier: "Anchor",
      dimension: "6m × 6m",
      price: "₦750,000",
      status: "reserved",
      position: [4.5, 0, -2],
      mountain: "Governance",
      description: "East wing anchor slot next to the leadership breakout suites.",
    },
  
    // Middle Row (Premium)
    {
      id: "b-04",
      code: "P-01",
      tier: "Premium",
      dimension: "6m × 3m",
      price: "₦350,000",
      status: "available",
      position: [-5, 0, 1.5],
      mountain: "Education",
      description: "Double pavilion facing the main gallery concourse.",
    },
    {
      id: "b-05",
      code: "P-02",
      tier: "Premium",
      dimension: "6m × 3m",
      price: "₦350,000",
      status: "occupied",
      position: [-1.8, 0, 1.5],
      mountain: "Arts & Culture",
      description: "Interactive display space with enhanced ceiling height.",
      exhibitorName: "Aethel Studios & Press",
    },
    {
      id: "b-06",
      code: "P-03",
      tier: "Premium",
      dimension: "6m × 3m",
      price: "₦350,000",
      status: "available",
      position: [1.8, 0, 1.5],
      mountain: "Marketplace",
      description: "Concourse booth situated near the hospitality lounge.",
    },
    {
      id: "b-07",
      code: "P-04",
      tier: "Premium",
      dimension: "6m × 3m",
      price: "₦350,000",
      status: "available",
      position: [5, 0, 1.5],
      mountain: "Family",
      description: "Corner position with dual-direction visitor entry.",
    },
  
    // Back Row (Standard)
    {
      id: "b-08",
      code: "S-01",
      tier: "Standard",
      dimension: "3m × 3m",
      price: "₦150,000",
      status: "available",
      position: [-5.2, 0, 4.5],
      mountain: "Marketplace",
      description: "Boutique booth in the high-density trade corridor.",
    },
    {
      id: "b-09",
      code: "S-02",
      tier: "Standard",
      dimension: "3m × 3m",
      price: "₦150,000",
      status: "available",
      position: [-2.6, 0, 4.5],
      mountain: "Education",
      description: "Standard booth optimal for publishing and resource sales.",
    },
    {
      id: "b-10",
      code: "S-03",
      tier: "Standard",
      dimension: "3m × 3m",
      price: "₦150,000",
      status: "occupied",
      position: [0, 0, 4.5],
      mountain: "Church Ministry",
      description: "Standard booth adjacent to ministry networking hub.",
      exhibitorName: "Kinsman Publishing",
    },
    {
      id: "b-11",
      code: "S-04",
      tier: "Standard",
      dimension: "3m × 3m",
      price: "₦150,000",
      status: "available",
      position: [2.6, 0, 4.5],
      mountain: "Arts & Culture",
      description: "Compact gallery booth designed for physical craftsmanship display.",
    },
    {
      id: "b-12",
      code: "S-05",
      tier: "Standard",
      dimension: "3m × 3m",
      price: "₦150,000",
      status: "available",
      position: [5.2, 0, 4.5],
      mountain: "Governance",
      description: "Quiet concourse placement for consultation & policy hubs.",
    },
  ];
  
  export const INITIAL_EXHIBITORS: Exhibitor[] = [
    {
      id: "ex-1",
      name: "Veritas Financial Guild",
      mountain: "Marketplace",
      boothCode: "A-01",
      category: "Financial Tech & Wealth Leadership",
      logo: "/images/exhibitors/veritas.jpg",
      tagline: "Kingdom-aligned venture capital and ethical investment structures.",
      description: "Providing capital, advisory, and governance models for transformative businesses expanding across Africa and international trade corridors.",
      website: "https://example.com/veritas",
      products: ["Ethical Investment Funds", "Venture Advisory", "Marketplace Mentorship"],
    },
    {
      id: "ex-2",
      name: "Aethel Studios & Press",
      mountain: "Arts & Culture",
      boothCode: "P-02",
      category: "Media & Fine Arts Production",
      logo: "/images/exhibitors/aethel.jpg",
      tagline: "Restoring beauty, depth, and sacred narratives to modern cinema.",
      description: "An independent film studio and literary press producing high-concept visual art, books, and cinematic documentary series.",
      website: "https://example.com/aethel",
      products: ["Fine Art Prints", "Documentary Screenings", "Collector's Hardcovers"],
    },
    {
      id: "ex-3",
      name: "Kinsman Publishing",
      mountain: "Church Ministry",
      boothCode: "S-03",
      category: "Literature & Educational Resources",
      logo: "/images/exhibitors/kinsman.jpg",
      tagline: "Discipleship tools for the 21st-century mind.",
      description: "Curating sound theology, leadership manuals, and family devotionals for churches, schools, and personal growth.",
      website: "https://example.com/kinsman",
      products: ["Study Bibles", "Leadership Manuals", "Children's Curriculum"],
    },
  ];