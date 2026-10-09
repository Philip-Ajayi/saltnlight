export interface RegistrationFormData {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    whatsappNumber: string;
    referralSources: string[];
    isMember: boolean;
    certificatedTraining?: "HSE" | "PMP" | "AI" | "DTA" | "GLM" | "NONE";
    isVolunteer: boolean;
    volunteerUnits: string[];
    needsAccommodation: boolean;
    hasConsented: boolean;
  }
  
  export const REFERRAL_OPTIONS = [
    "Social Media (Instagram/X/Facebook)",
    "Friend or Family Member",
    "Church Announcement",
    "Billboard",
    "MIV Word House Website",
    "WhatsApp Broadcast",
    "Hand Bill",
    "Other",
  ];
  
  export const CERTIFICATED_TRAININGS = [
    { id: "NONE", label: "None" },
    { id: "HSE", label: "Human Resource Management (HRM)" },
    { id: "PMP", label: "Project Management Professional (PMP)" },
    { id: "AI", label: "Integrated Workforce AI Management" },
    { id: "DTA", label: "Data Analysis" },
    { id: "GLM", label: "Global Missions (A professional Certificate Training)" },
  ];
  
  export const VOLUNTEER_UNITS = [
    { id: "Ushering", label: "Ushering", description: "Protocol & audience management" },
    { id: "Kitchen", label: "Kitchen", description: "Catering & hospitality support" },
    { id: "Registration unit", label: "Registration Unit", description: "Delegate check-in & assistance" },
    { id: "Media", label: "Media", description: "Photography, videography & live feed" },
    { id: "Publicity", label: "Publicity", description: "Content creation & digital engagement" },
    { id: "Medicals", label: "Medicals", description: "First aid & medical emergency response" },
    { id: "Technicals", label: "Technicals", description: "Sound, lighting, stage & electricals" },
    { id: "Sanitation", label: "Sanitation", description: "Facility maintenance & cleanliness" },
    { id: "Greeters", label: "Greeters", description: "Warm welcome & direction guiding" },
    { id: "ChildrenTeacher", label: "Children Teacher", description: "Kids ministry & fun activities" },
  ];
  
  // Target WhatsApp workforce invitation link
  export const VOLUNTEER_WHATSAPP_GROUP_URL =
    "https://chat.whatsapp.com/ER45aKxd0sjC2SEGrCalZA?s=cl&p=a&mlu=4&ilr=4";
