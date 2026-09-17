export interface ScheduleSession {
    id: string;
    title: string;
    timeSlot: string; // e.g. "06:00 AM - 08:30 AM"
    startTime: string; // "06:00 AM"
    period: "morning" | "afternoon" | "evening";
    date: string; // "2026-10-12"
    dayLabel: string; // "Oct 12"
    dayOfWeek: string; // "Monday"
    description: string;
    venue: string;
  }
  
  export const COMMON_VENUE = "MIV Word House Auditorium, Samonda, Ibadan";
  
  export const SCHEDULE_DAYS = [
    { date: "2026-10-12", label: "Oct 12", day: "Monday", count: 1 },
    { date: "2026-10-13", label: "Oct 13", day: "Tuesday", count: 5 },
    { date: "2026-10-14", label: "Oct 14", day: "Wednesday", count: 5 },
    { date: "2026-10-15", label: "Oct 15", day: "Thursday", count: 5 },
    { date: "2026-10-16", label: "Oct 16", day: "Friday", count: 5 },
  ];
  
  export const SCHEDULE_SESSIONS: ScheduleSession[] = [
    // --- OCT 12 (MONDAY) ---
    {
      id: "oct12-influence-night",
      title: "Influence Night",
      timeSlot: "05:30 PM - 09:00 PM",
      startTime: "05:30 PM",
      period: "evening",
      date: "2026-10-12",
      dayLabel: "Oct 12",
      dayOfWeek: "Monday",
      venue: COMMON_VENUE,
      description:
        "Opening movement of the convocation. A sacred assembly for encounter, worship, and establishing spiritual posture for the week.",
    },
  
    // --- OCT 13 (TUESDAY) ---
    {
      id: "oct13-shiftings-turnings",
      title: "Shiftings & Turnings",
      timeSlot: "06:00 AM - 08:30 AM",
      startTime: "06:00 AM",
      period: "morning",
      date: "2026-10-13",
      dayLabel: "Oct 13",
      dayOfWeek: "Tuesday",
      venue: COMMON_VENUE,
      description:
        "Early-morning encounter designed to recalibrate vision, strengthen conviction, and break internal limitations.",
    },
    {
      id: "oct13-certificated-training",
      title: "Certificated Training",
      timeSlot: "11:00 AM - 01:00 PM",
      startTime: "11:00 AM",
      period: "morning",
      date: "2026-10-13",
      dayLabel: "Oct 13",
      dayOfWeek: "Tuesday",
      venue: COMMON_VENUE,
      description:
        "Focused practical session giving structural frameworks, principles, and execution strategy.",
    },
    {
      id: "oct13-school-of-ministry",
      title: "School of Ministry",
      timeSlot: "01:30 PM - 03:30 PM",
      startTime: "01:30 PM",
      period: "afternoon",
      date: "2026-10-13",
      dayLabel: "Oct 13",
      dayOfWeek: "Tuesday",
      venue: COMMON_VENUE,
      description:
        "Concentrated environment for spiritual formation, leadership development, and structural maturity.",
    },
    {
      id: "oct13-exhibition-hub",
      title: "Exhibition Hub",
      timeSlot: "04:00 PM - 05:15 PM",
      startTime: "04:00 PM",
      period: "afternoon",
      date: "2026-10-13",
      dayLabel: "Oct 13",
      dayOfWeek: "Tuesday",
      venue: COMMON_VENUE,
      description:
        "Interactive marketplace and engagement hub connecting organizations, initiatives, and expressions.",
    },
    {
      id: "oct13-influence-night",
      title: "Influence Night",
      timeSlot: "05:30 PM - 09:00 PM",
      startTime: "05:30 PM",
      period: "evening",
      date: "2026-10-13",
      dayLabel: "Oct 13",
      dayOfWeek: "Tuesday",
      venue: COMMON_VENUE,
      description:
        "Evening convocation centered on high-impact teaching, prophetic direction, and corporate prayer.",
    },
  
    // --- OCT 14 (WEDNESDAY) ---
    {
      id: "oct14-shiftings-turnings",
      title: "Shiftings & Turnings",
      timeSlot: "06:00 AM - 08:30 AM",
      startTime: "06:00 AM",
      period: "morning",
      date: "2026-10-14",
      dayLabel: "Oct 14",
      dayOfWeek: "Wednesday",
      venue: COMMON_VENUE,
      description:
        "Morning prayer and alignment session building upon spiritual momentum.",
    },
    {
      id: "oct14-certificated-training",
      title: "Certificated Training",
      timeSlot: "11:00 AM - 01:00 PM",
      startTime: "11:00 AM",
      period: "morning",
      date: "2026-10-14",
      dayLabel: "Oct 14",
      dayOfWeek: "Wednesday",
      venue: COMMON_VENUE,
      description:
        "Part two of leadership and execution training with practical application models.",
    },
    {
      id: "oct14-school-of-ministry",
      title: "School of Ministry",
      timeSlot: "01:30 PM - 03:30 PM",
      startTime: "01:30 PM",
      period: "afternoon",
      date: "2026-10-14",
      dayLabel: "Oct 14",
      dayOfWeek: "Wednesday",
      venue: COMMON_VENUE,
      description:
        "Deep dive into ministry responsibility, character formation, and spiritual authority.",
    },
    {
      id: "oct14-exhibition-hub",
      title: "Exhibition Hub",
      timeSlot: "04:00 PM - 05:15 PM",
      startTime: "04:00 PM",
      period: "afternoon",
      date: "2026-10-14",
      dayLabel: "Oct 14",
      dayOfWeek: "Wednesday",
      venue: COMMON_VENUE,
      description:
        "Networking and platform exhibition showcasing innovation and strategic projects.",
    },
    {
      id: "oct14-influence-night",
      title: "Influence Night",
      timeSlot: "05:30 PM - 09:00 PM",
      startTime: "05:30 PM",
      period: "evening",
      date: "2026-10-14",
      dayLabel: "Oct 14",
      dayOfWeek: "Wednesday",
      venue: COMMON_VENUE,
      description:
        "Corporate gathering with focused word, worship, and spiritual impartation.",
    },
  
    // --- OCT 15 (THURSDAY) ---
    {
      id: "oct15-shiftings-turnings",
      title: "Shiftings & Turnings",
      timeSlot: "06:00 AM - 08:30 AM",
      startTime: "06:00 AM",
      period: "morning",
      date: "2026-10-15",
      dayLabel: "Oct 15",
      dayOfWeek: "Thursday",
      venue: COMMON_VENUE,
      description:
        "Morning intercession and alignment ahead of peak strategic sessions.",
    },
    {
      id: "oct15-certificated-training",
      title: "Certificated Training",
      timeSlot: "11:00 AM - 01:00 PM",
      startTime: "11:00 AM",
      period: "morning",
      date: "2026-10-15",
      dayLabel: "Oct 15",
      dayOfWeek: "Thursday",
      venue: COMMON_VENUE,
      description:
        "Strategic leadership module focusing on institutional building and legacy.",
    },
    {
      id: "oct15-school-of-ministry",
      title: "School of Ministry",
      timeSlot: "01:30 PM - 03:30 PM",
      startTime: "01:30 PM",
      period: "afternoon",
      date: "2026-10-15",
      dayLabel: "Oct 15",
      dayOfWeek: "Thursday",
      venue: COMMON_VENUE,
      description:
        "Advanced training on ministering with clarity, authority, and accountability.",
    },
    {
      id: "oct15-exhibition-hub",
      title: "Exhibition Hub",
      timeSlot: "04:00 PM - 05:15 PM",
      startTime: "04:00 PM",
      period: "afternoon",
      date: "2026-10-15",
      dayLabel: "Oct 15",
      dayOfWeek: "Thursday",
      venue: COMMON_VENUE,
      description:
        "Exhibition and collaborative connection session for attendees and exhibitors.",
    },
    {
      id: "oct15-influence-night",
      title: "Influence Night",
      timeSlot: "05:30 PM - 09:00 PM",
      startTime: "05:30 PM",
      period: "evening",
      date: "2026-10-15",
      dayLabel: "Oct 15",
      dayOfWeek: "Thursday",
      venue: COMMON_VENUE,
      description:
        "Penultimate evening general assembly for encounter and high-level commissioning.",
    },
  
    // --- OCT 16 (FRIDAY) ---
    {
      id: "oct16-shiftings-turnings",
      title: "Shiftings & Turnings",
      timeSlot: "06:00 AM - 08:30 AM",
      startTime: "06:00 AM",
      period: "morning",
      date: "2026-10-16",
      dayLabel: "Oct 16",
      dayOfWeek: "Friday",
      venue: COMMON_VENUE,
      description:
        "Final morning session dedicated to thanksgiving, sealings, and prophetic prayers.",
    },
    {
      id: "oct16-certificated-training",
      title: "Certificated Training",
      timeSlot: "11:00 AM - 01:00 PM",
      startTime: "11:00 AM",
      period: "morning",
      date: "2026-10-16",
      dayLabel: "Oct 16",
      dayOfWeek: "Friday",
      venue: COMMON_VENUE,
      description:
        "Concluding session, certification overview, and practical deployment roadmap.",
    },
    {
      id: "oct16-school-of-ministry",
      title: "School of Ministry",
      timeSlot: "01:30 PM - 03:30 PM",
      startTime: "01:30 PM",
      period: "afternoon",
      date: "2026-10-16",
      dayLabel: "Oct 16",
      dayOfWeek: "Friday",
      venue: COMMON_VENUE,
      description:
        "School of Ministry closing session and practical sending-forth directives.",
    },
    {
      id: "oct16-exhibition-hub",
      title: "Exhibition Hub",
      timeSlot: "04:00 PM - 05:15 PM",
      startTime: "04:00 PM",
      period: "afternoon",
      date: "2026-10-16",
      dayLabel: "Oct 16",
      dayOfWeek: "Friday",
      venue: COMMON_VENUE,
      description:
        "Final exhibition showcase and networking wrap-up.",
    },
    {
      id: "oct16-influence-night",
      title: "Influence Night (Grand Finale)",
      timeSlot: "05:30 PM - 09:30 PM",
      startTime: "05:30 PM",
      period: "evening",
      date: "2026-10-16",
      dayLabel: "Oct 16",
      dayOfWeek: "Friday",
      venue: COMMON_VENUE,
      description:
        "Grand Finale of Salt & Light '26. A powerful climax of worship, word, impartation, and global sending.",
    },
  ];