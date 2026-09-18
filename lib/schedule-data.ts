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
    timeSlot: "05:30 PM - 08:30 PM",
    startTime: "05:30 PM",
    period: "evening",
    date: "2026-10-12",
    dayLabel: "Oct 12",
    dayOfWeek: "Monday",
    venue: COMMON_VENUE,
    description:
      "Opening plenary session, marketplace missions, and Word & Miracle service for power, transformation, and divine impact.",
  },

  // --- OCT 13 (TUESDAY) ---
  {
    id: "oct13-shiftings-turnings",
    title: "Shiftings & Turnings",
    timeSlot: "06:30 AM - 07:30 AM",
    startTime: "06:30 AM",
    period: "morning",
    date: "2026-10-13",
    dayLabel: "Oct 13",
    dayOfWeek: "Tuesday",
    venue: COMMON_VENUE,
    description:
      "Transformative morning prayer and prophetic session for spiritual realignment, breaking strongholds, and direction.",
  },
  {
    id: "oct13-certificated-training",
    title: "Certificated Training",
    timeSlot: "10:00 AM - 12:00 PM",
    startTime: "10:00 AM",
    period: "morning",
    date: "2026-10-13",
    dayLabel: "Oct 13",
    dayOfWeek: "Tuesday",
    venue: COMMON_VENUE,
    description:
      "Collaborative training in Project Management, Data Analysis, HR, and AI Management with certifying institutions.",
  },
  {
    id: "oct13-school-of-ministry",
    title: "School of Ministry",
    timeSlot: "01:00 PM - 02:15 PM",
    startTime: "01:00 PM",
    period: "afternoon",
    date: "2026-10-13",
    dayLabel: "Oct 13",
    dayOfWeek: "Tuesday",
    venue: COMMON_VENUE,
    description:
      "Theology, mentorship, and practical leadership training for ministers across church, youth, media, and arts expressions.",
  },
  {
    id: "oct13-exhibition-hub",
    title: "Exhibition Hub",
    timeSlot: "02:30 PM - 03:30 PM",
    startTime: "02:30 PM",
    period: "afternoon",
    date: "2026-10-13",
    dayLabel: "Oct 13",
    dayOfWeek: "Tuesday",
    venue: COMMON_VENUE,
    description:
      "Interactive marketplace showcasing organizations, innovative products, strategic ideas, and kingdom expressions.",
  },
  {
    id: "oct13-influence-night",
    title: "Influence Night",
    timeSlot: "05:30 PM - 08:30 PM",
    startTime: "05:30 PM",
    period: "evening",
    date: "2026-10-13",
    dayLabel: "Oct 13",
    dayOfWeek: "Tuesday",
    venue: COMMON_VENUE,
    description:
      "Plenary marketplace session and Word & Miracle service designed for encounter, impartation, and global influence.",
  },

  // --- OCT 14 (WEDNESDAY) ---
  {
    id: "oct14-shiftings-turnings",
    title: "Shiftings & Turnings",
    timeSlot: "06:30 AM - 07:30 AM",
    startTime: "06:30 AM",
    period: "morning",
    date: "2026-10-14",
    dayLabel: "Oct 14",
    dayOfWeek: "Wednesday",
    venue: COMMON_VENUE,
    description:
      "Transformative morning prayer and prophetic session for spiritual realignment, breaking strongholds, and direction.",
  },
  {
    id: "oct14-certificated-training",
    title: "Certificated Training",
    timeSlot: "10:00 AM - 12:00 PM",
    startTime: "10:00 AM",
    period: "morning",
    date: "2026-10-14",
    dayLabel: "Oct 14",
    dayOfWeek: "Wednesday",
    venue: COMMON_VENUE,
    description:
      "Collaborative training in Project Management, Data Analysis, HR, and AI Management with certifying institutions.",
  },
  {
    id: "oct14-school-of-ministry",
    title: "School of Ministry",
    timeSlot: "01:00 PM - 02:15 PM",
    startTime: "01:00 PM",
    period: "afternoon",
    date: "2026-10-14",
    dayLabel: "Oct 14",
    dayOfWeek: "Wednesday",
    venue: COMMON_VENUE,
    description:
      "Theology, mentorship, and practical leadership training for ministers across church, youth, media, and arts expressions.",
  },
  {
    id: "oct14-exhibition-hub",
    title: "Exhibition Hub",
    timeSlot: "02:30 PM - 03:30 PM",
    startTime: "02:30 PM",
    period: "afternoon",
    date: "2026-10-14",
    dayLabel: "Oct 14",
    dayOfWeek: "Wednesday",
    venue: COMMON_VENUE,
    description:
      "Interactive marketplace showcasing organizations, innovative products, strategic ideas, and kingdom expressions.",
  },
  {
    id: "oct14-influence-night",
    title: "Influence Night",
    timeSlot: "05:30 PM - 08:30 PM",
    startTime: "05:30 PM",
    period: "evening",
    date: "2026-10-14",
    dayLabel: "Oct 14",
    dayOfWeek: "Wednesday",
    venue: COMMON_VENUE,
    description:
      "Plenary marketplace session and Word & Miracle service designed for encounter, impartation, and global influence.",
  },

  // --- OCT 15 (THURSDAY) ---
  {
    id: "oct15-shiftings-turnings",
    title: "Shiftings & Turnings",
    timeSlot: "06:30 AM - 07:30 AM",
    startTime: "06:30 AM",
    period: "morning",
    date: "2026-10-15",
    dayLabel: "Oct 15",
    dayOfWeek: "Thursday",
    venue: COMMON_VENUE,
    description:
      "Transformative morning prayer and prophetic session for spiritual realignment, breaking strongholds, and direction.",
  },
  {
    id: "oct15-certificated-training",
    title: "Certificated Training",
    timeSlot: "10:00 AM - 12:00 PM",
    startTime: "10:00 AM",
    period: "morning",
    date: "2026-10-15",
    dayLabel: "Oct 15",
    dayOfWeek: "Thursday",
    venue: COMMON_VENUE,
    description:
      "Collaborative training in Project Management, Data Analysis, HR, and AI Management with certifying institutions.",
  },
  {
    id: "oct15-school-of-ministry",
    title: "School of Ministry",
    timeSlot: "01:00 PM - 02:15 PM",
    startTime: "01:00 PM",
    period: "afternoon",
    date: "2026-10-15",
    dayLabel: "Oct 15",
    dayOfWeek: "Thursday",
    venue: COMMON_VENUE,
    description:
      "Theology, mentorship, and practical leadership training for ministers across church, youth, media, and arts expressions.",
  },
  {
    id: "oct15-exhibition-hub",
    title: "Exhibition Hub",
    timeSlot: "02:30 PM - 03:30 PM",
    startTime: "02:30 PM",
    period: "afternoon",
    date: "2026-10-15",
    dayLabel: "Oct 15",
    dayOfWeek: "Thursday",
    venue: COMMON_VENUE,
    description:
      "Interactive marketplace showcasing organizations, innovative products, strategic ideas, and kingdom expressions.",
  },
  {
    id: "oct15-influence-night",
    title: "Influence Night",
    timeSlot: "05:30 PM - 08:30 PM",
    startTime: "05:30 PM",
    period: "evening",
    date: "2026-10-15",
    dayLabel: "Oct 15",
    dayOfWeek: "Thursday",
    venue: COMMON_VENUE,
    description:
      "Plenary marketplace session and Word & Miracle service designed for encounter, impartation, and global influence.",
  },

  // --- OCT 16 (FRIDAY) ---
  {
    id: "oct16-shiftings-turnings",
    title: "Shiftings & Turnings",
    timeSlot: "06:30 AM - 07:30 AM",
    startTime: "06:30 AM",
    period: "morning",
    date: "2026-10-16",
    dayLabel: "Oct 16",
    dayOfWeek: "Friday",
    venue: COMMON_VENUE,
    description:
      "Transformative morning prayer and prophetic session for spiritual realignment, breaking strongholds, and direction.",
  },
  {
    id: "oct16-certificated-training",
    title: "Certificated Training",
    timeSlot: "10:00 AM - 12:00 PM",
    startTime: "10:00 AM",
    period: "morning",
    date: "2026-10-16",
    dayLabel: "Oct 16",
    dayOfWeek: "Friday",
    venue: COMMON_VENUE,
    description:
      "Collaborative training in Project Management, Data Analysis, HR, and AI Management with certifying institutions.",
  },
  {
    id: "oct16-school-of-ministry",
    title: "School of Ministry",
    timeSlot: "01:00 PM - 02:15 PM",
    startTime: "01:00 PM",
    period: "afternoon",
    date: "2026-10-16",
    dayLabel: "Oct 16",
    dayOfWeek: "Friday",
    venue: COMMON_VENUE,
    description:
      "Theology, mentorship, and practical leadership training for ministers across church, youth, media, and arts expressions.",
  },
  {
    id: "oct16-exhibition-hub",
    title: "Exhibition Hub",
    timeSlot: "02:30 PM - 03:30 PM",
    startTime: "02:30 PM",
    period: "afternoon",
    date: "2026-10-16",
    dayLabel: "Oct 16",
    dayOfWeek: "Friday",
    venue: COMMON_VENUE,
    description:
      "Interactive marketplace showcasing organizations, innovative products, strategic ideas, and kingdom expressions.",
  },
  {
    id: "oct16-influence-night",
    title: "Influence Night (Grand Finale)",
    timeSlot: "05:30 PM - 08:30 PM",
    startTime: "05:30 PM",
    period: "evening",
    date: "2026-10-16",
    dayLabel: "Oct 16",
    dayOfWeek: "Friday",
    venue: COMMON_VENUE,
    description:
      "Grand Finale plenary session and Word & Miracle service for power, impartation, and global sending.",
  },
];