export interface TrainingProgram {
  id: string;
  slug: string;
  title: string;
  institution: string;
  logo: string;
  badge?: string;
  price: string;
  priceNote?: string;
  certificatesCount?: string;
  summary: string;
  isFree?: boolean;
  perks?: string[];
  features: string[];
  bonus?: string;
  idealFor?: string[];
  volunteerOpportunities?: string;
  certificationTracks?: string[];
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "integrated-ai",
    slug: "integrated-workforce-ai",
    title: "Integrated Workforce AI Management",
    institution: "TRANSATLANTIC SCHOOL OF MANAGEMENT",
    logo: "https://mytsmedu.com/wp-content/uploads/2022/04/TSM-Edu-Logo-1-420x105.png",
    badge: "Discounted Rate",
    price: "₦46,300",
    certificatesCount: "1 Program · 6 Globally Recognised Certificates",
    summary:
      "Master modern AI integration, workflow automation, and capstone command systems for enterprise leadership.",
    perks: [
      "4 Additional Globally recognized Certifications in Data Analytics",
      "Postgraduate Scholarship Guides & Opportunities",
      "Personality Assessment with Expert Report",
      "Free CV Evaluation among others"
    ],
    features: [
      "5 Modules",
      "Career Command File",
      "AI Workflow Playbooks & Templates",
      "Capstone Command Plan Engine",
      "Professional Impact Dashboard",
      "Complimentary AI Self-Study Courses + Certifications",
      "1 Comprehensive Training Manual",
      "AI Software/Tools Access",
      "Presentation Deck",
      "Career Development Group"
    ],
    bonus: "Full Scholarship Degree in Data Science (Global Institution)"
  },
  {
    id: "data-analysis",
    slug: "data-analysis",
    title: "Data Analysis",
    institution: "TRANSATLANTIC SCHOOL OF MANAGEMENT",
    logo: "https://mytsmedu.com/wp-content/uploads/2022/04/TSM-Edu-Logo-1-420x105.png",
    badge: "Discounted Rate",
    price: "₦25,000",
    certificatesCount: "1 Program · 6 Globally Recognised Certificates",
    summary:
      "Acquire hands-on expertise in data visualization, business intelligence tools, case-study analytics, and reporting.",
    perks: [
      "4 Additional Globally recognized Certifications in Data Analytics",
      "Postgraduate Scholarship Guides & Opportunities",
      "Personality Assessment with Expert Report",
      "Free CV Evaluation among others"
    ],
    features: [
      "6 Modules",
      "7 Real-Life Case Studies",
      "6 Presentation Slides",
      "21 E-Books",
      "14 Tools & Templates",
      "24 Hours (1 Month - 8 Lectures) Intensive Expert-Led Sessions",
      "4 Complimentary Self-Study Courses",
      "1 Comprehensive Training Manual",
      "Practical Assessments",
      "10 Video Links & Guides",
      "5 Certificates Included"
    ],
    bonus: "Full Scholarship Degree in Data Science (Global Institution)"
  },
  {
    id: "project-management",
    slug: "project-management",
    title: "Project Management",
    institution: "TRANSATLANTIC SCHOOL OF MANAGEMENT",
    logo: "https://mytsmedu.com/wp-content/uploads/2022/04/TSM-Edu-Logo-1-420x105.png",
    badge: "Discounted Rate",
    price: "₦25,000",
    certificatesCount: "1 Program · 6 Globally Recognised Certificates",
    summary:
      "Execute high-impact projects using industry-standard agile frameworks, software tools, and executive templates.",
    perks: [
      "4 Additional Globally recognized Certifications in Data Analytics",
      "Postgraduate Scholarship Guides & Opportunities",
      "Personality Assessment with Expert Report",
      "Free CV Evaluation among others"
    ],
    features: [
      "6 Modules",
      "8 Real-Life Case Studies",
      "6 Presentation Slides",
      "27 Project Management E-Books",
      "64 Project Management Templates",
      "(4 Weeks - 8 Lectures) Intensive Expert-Led Sessions",
      "4 Complimentary Project Mgt Self-Study Courses + Certifications",
      "1 Comprehensive Training Manual",
      "Project Management Software Suite",
      "Career Development Group"
    ],
    bonus: "Full Scholarship Degree in Data Science (Global Institution)"
  },
  {
    id: "general-certified",
    slug: "general-certified",
    title: "General Certified Program",
    institution: "TRANSATLANTIC SCHOOL OF MANAGEMENT",
    logo: "https://mytsmedu.com/wp-content/uploads/2022/04/TSM-Edu-Logo-1-420x105.png",
    badge: "Discounted Rate",
    price: "₦25,000",
    summary:
      "A comprehensive certification track combining foundational tools across top enterprise disciplines.",
    certificationTracks: [
      "Project Management (PMP)",
      "Data Analysis",
      "Human Resource Management (HRM)",
      "Integrated Workforce AI Management"
    ],
    features: [
      "Multi-Track Core Certifications",
      "Comprehensive Study Materials",
      "Professional Development Mentorship",
      "Exam & Assessment Guidance"
    ]
  },
  {
    id: "global-missions",
    slug: "global-missions",
    title: "Global Missions",
    institution: "THE MEN OF ISSACHAR VISION INC. SCHOOL OF MISSIONS",
    logo: "https://menofissacharvision.com/assets/MIVlogo.svg",
    badge: "Free Tuition",
    isFree: true,
    price: "FREE",
    priceNote: "₦2,000 for materials · Optional ₦5,000 for certificate",
    summary:
      "An internationally recognized professional certificate program designed to equip believers, leaders, and missionaries for effective cross-cultural and intercontinental ministry.",
    features: [
      "Introduction to Global Missions",
      "Cross-Cultural perspectives in missions",
      "Contextualised Evangelism and Follow-up strategies",
      "5 Fold missions ministry",
      "Task Remaining",
      "Globalised Need-Based Discipleship",
      "Missions globalization",
      "Tent making and Professionals in missions",
      "Spiritual Mapping",
      "Contextualised Guidance and Counselling",
      "Biblical Leadership",
      "Specialized missions ministry"
    ],
    idealFor: [
      "Christian students",
      "Serving corps members",
      "Graduates & professionals",
      "All believers with a call to the nations"
    ],
    volunteerOpportunities:
      "A fully sponsored volunteer missionary service opportunity at home and abroad."
  }
];
