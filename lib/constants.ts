export interface Mountain { id: string; name: string; description: string; position: { left: string; top: string }; }
export interface ProgramTrack { id: string; title: string; date: string; time: string; description: string; }
export interface Minister { id: string; name: string; role: string; organization: string; image: string; bio: string; }
export interface ArchiveImage { id: string; src: string; year: 2024 | 2025; aspect: string; }

export const mountains: Mountain[] = [
  { id: "governance", name: "Governance", description: "Equipping people who carry responsibility for systems, institutions and public leadership.", position: { left: "50%", top: "3%" } },
  { id: "marketplace", name: "Marketplace", description: "Building businesses, creating value and transforming the spaces where commerce meets calling.", position: { left: "91%", top: "24%" } },
  { id: "media", name: "Media", description: "Shaping narratives, communicating truth and stewarding the channels that form culture.", position: { left: "87%", top: "72%" } },
  { id: "education", name: "Education", description: "Developing minds, raising leaders and transferring wisdom across generations.", position: { left: "50%", top: "97%" } },
  { id: "arts", name: "Arts & Culture", description: "Creating expressions that reveal beauty, carry meaning and influence the imagination of society.", position: { left: "13%", top: "72%" } },
  { id: "family", name: "Family", description: "Strengthening the foundational institution through intentional relationships, values and legacy.", position: { left: "9%", top: "24%" } },
  { id: "church", name: "Church Ministry", description: "Equipping the body of Christ for maturity, service, leadership and mission beyond the walls.", position: { left: "50%", top: "50%" } },
];

export const mountainMatrix = [
  { id: "governance", name: "Governance", challenge: "Systems require people with courage, wisdom and spiritual intelligence." },
  { id: "business", name: "Business", challenge: "The marketplace needs builders who understand value beyond profit." },
  { id: "education", name: "Education", challenge: "The next generation must inherit both knowledge and conviction." },
  { id: "media", name: "Media", challenge: "Stories shape culture long before policy catches up." },
  { id: "arts", name: "Arts / Entertainment", challenge: "Imagination is one of culture's most powerful formation tools." },
  { id: "family", name: "Family", challenge: "Healthy societies are built from healthy foundational relationships." },
  { id: "church", name: "Church Ministry", challenge: "The Church is called to equip saints for influence in every sphere." },
];

export const programTracks: ProgramTrack[] = [
  { id: "influence-night", title: "Influence Night", date: "OCT 12 — 16", time: "5:30 PM", description: "Five evenings. Five encounters. One call to influence. Gather around the word, worship and prophetic perspective." },
  { id: "shiftings-turnings", title: "Shiftings & Turnings", date: "OCT 13 — 16", time: "6:00 AM", description: "Early-morning encounters designed to recalibrate vision, strengthen conviction and prepare you for the day." },
  { id: "certificated-training", title: "Certificated Training", date: "OCT 13 — 16", time: "11:00 AM", description: "Focused learning sessions for people who want practical frameworks for leadership, influence and execution." },
  { id: "school-of-ministry", title: "School of Ministry", date: "OCT 13 — 16", time: "1:30 PM", description: "A concentrated ministry environment for spiritual formation, leadership development and practical service." },
  { id: "exhibition-hub", title: "Exhibition Hub", date: "OCT 13 — 16", time: "4:00 PM", description: "A marketplace of organisations, products, ideas and expressions building on the mountain." },
];

const ministerData: Array<[string,string,string,string,string,string]> = [
  ["samson-ajetomobi","Rev. Samson Ajetomobi","Founder / Oversight","Men of Issachar Vision","/images/rev-samson-ajetomobi.jpeg","Founder and oversight voice of the Men of Issachar Vision, carrying a mandate centred on understanding the times and equipping people to respond with wisdom, conviction and influence."],
  ["ope-rowland","Pastor Ope Rowland","Resident Pastor","MIV Word House","/images/pastor-ope-rowland.jpeg","Resident pastor and teacher committed to building people through sound teaching, spiritual formation and practical expressions of faith."],
  ["apostle-awoyele","Apostle Awoyele","Minister","Salt & Light '26","/images/rev-awoyele.jpeg","A ministry voice contributing to the convocation's emphasis on spiritual maturity, discernment and kingdom influence."],
  ["apostle-toluwalogo","Apostle Toluwalogo","Minister","Salt & Light '26","/images/apostle-toluwalogo.jpeg","Apostolic voice bringing perspective on purpose, leadership and the responsibility of influence."],
  ["dr-kotila","Dr. Kotila","Minister","Salt & Light '26","/images/dr-kotila.jpeg","A voice contributing insight into leadership, development and the practical dimensions of influence."],
  ["mr-sobayo","Mr. Sobayo","Minister","Salt & Light '26","/images/mr-sobayo.jpeg","A marketplace-focused voice exploring excellence, responsibility and purposeful contribution."],
  ["dr-karen","Dr. Karen","Minister","Salt & Light '26","/images/dolapo.jpeg","A voice bringing perspective to the formation, development and deployment of people who influence culture."],
];
export const ministers: Minister[] = ministerData.map(([id,name,role,organization,image,bio]) => ({ id,name,role,organization,image,bio }));

export const archiveImages: ArchiveImage[] = Array.from({ length: 31 }, (_, i) => {
  const year = i < 15 ? 2024 : 2025;
  const number = i < 15 ? i + 1 : i - 14;
  const aspect = ["4 / 5", "16 / 10", "3 / 4", "4 / 5", "16 / 11"][i % 5];
  return { id: `${year}-${String(number).padStart(2, "0")}`, src: `/images/gallery-${year}/${String(number).padStart(2, "0")}.jpeg`, year: year as 2024 | 2025, aspect };
});
