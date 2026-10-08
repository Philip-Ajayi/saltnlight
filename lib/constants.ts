export interface Mountain { id: string; name: string; description: string; position: { left: string; top: string }; }
export interface ProgramTrack {
  id: string;
  title: string;
  date: string;
  time: string;
  // Replace single description with structured fields
  lead?: string;
  bullets?: string[];
  description?: string;
}
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
  {
    id: "influence-night",
    title: "Influence Night",
    date: "OCT 12 — 16",
    time: "5:30 PM",
    bullets: [
      "**Daniel's Call**: Marketplace Missions applying salt and light in the workplace.",
      "**Ezekiel's Call**: Word and Miracle Service for transformation and spiritual impartation."
    ]
  },
  {
    id: "shiftings-turnings",
    title: "Shiftings & Turnings",
    date: "OCT 13 — 16",
    time: "6:30 AM",
    lead: "A transformative prayer and prophetic session addressing all spheres of life.",
    bullets: [
      "Intense intercessions and prophetic declarations",
      "Spiritual realignment and breaking strongholds"
    ]
  },
  {
    id: "certificated-training",
    title: "Certificated Training",
    date: "OCT 13 — 16",
    time: "10:00 AM",
    lead: "Discounted, collaborative training with recognized certifying institutions in:",
    bullets: [
      "Project Management (PMP)",
      "Data Analysis",
      "Human Resource Management (HRM)",
      "Integrated Workforce AI Management",
      "Global Missions (A professional Certificate Training)"
    ]
  },
  {
    id: "school-of-ministry",
    title: "School of Ministry",
    date: "OCT 13 — 16",
    time: "1:00 PM",
    lead: "Designed for Pastors, Evangelists, and Ministry Leaders.",
    description: "Blends theology, mentorship, and practical engagement for ministry effectiveness across campus, youth, arts, and media spheres."
  },
  {
    id: "exhibition-hub",
    title: "Exhibition Hub",
    date: "OCT 13 — 16",
    time: "2:30 PM",
    description: "A marketplace of organisations, products, ideas, and expressions building on the mountain."
  }
];

const ministerData: Array<[string, string, string, string, string, string]> = [
  [
    "samson-ajetomobi",
    "Rev. Samson Ajetomobi",
    "Founder / Oversight",
    "Men of Issachar Vision",
    "/images/rev-samson-ajetomobi.jpeg",
    "Rev. Samson Ajetomobi is the President of The Men of Issachar Vision Incorporated (MIV), which commenced in 1989. He is a man called by God with the mandate to reach the unreached at all cost and reawaken the Church to her responsibilities. He is gripped with a great passion for souls in reaching the unreached at all cost. Since the inception of MIV ministry, his strong drive has helped several lives to discover the essence of living for God. \n\nRev. Samson Ajetomobi, an alumnus member of Haggai Institute Maui, USA is the President of Mission and Leadership Academy (MLA), Compact Leadership Training and the coordinator of the ever growing Leadership Update for strategic leaders. A member of NEMA (Nigeria Evangelical Missions Association) and DAI, he chairs, MANI Oyo State and the Pentecostal Fellowship of Nigeria (PFN), Oyo State Chapter. \n\nRev. Ajetomobi also oversees the Redemption Faith Churches and several other networks with missions and leadership thrust. He is much sought after in trainings, conferences, crusades and church revivals across the continents and because of his leadership thrust of over 34 years he is involved with the leadership of several Christian organizations and mission agencies. \n\nHe is married to Rev. Stellamaris and their marriage is blessed with four young adults."
  ],
  [
    "ope-rowland",
    "Pastor Ope Rowland",
    "Resident Pastor",
    "MIV Word House",
    "/images/pastor-ope-rowland.jpeg",
    "Pastor Ope Rowland is a preacher of God's word, public speaker and trainer, consultant and coach, and writer in Nigeria. He believes in the ministry of every saint. Hence, he talks  and writes about believers finding, grooming and operating in their ministries. \n\nHe currently serves as the Personal Assistant to Rev. Samson Ajetomobi (the President of The Men of Issachar Vision Inc. and Chairman of the Oyo State Chapter of the Pentecostal Fellowship of Nigeria). He is also the National Youth Pastor of the Men of Issachar Vision Inc. and the Lead Pastor at MIV Word House, Samonda. Ibadan, Nigeria and he runs an itinerant preaching and teaching ministry across campuses and churches. \n\nIn years past, serving as President of ASF FUTA, President of JCCF FUTA, President of NCCF Enugu, Assistant Pastor of MIV Youth Church (now MIV Harvest House) and other platforms he's been privileged to serve had in no little measure contributed to the hewing of his leadership capacity. \n\nHis marriage to Atinuke Rowland has been a blessing and their children are signs of the wonders to come."
  ],
  [
    "apostle-toluwalogo",
    "Apostle Toluwalogo Agboola",
    "Minister",
    "Salt & Light '26",
    "/images/apostle-toluwalogo.jpeg",
    "Apostle Toluwalogo Oluwapelumi Agboola is the Esteemed Founder of His Worship Christian Network (HWCN Global). He is a Seasoned Teacher of Gospel of Christ, talented song Composer, and a dedicated worshiper of Christ. \n\nIn the year 1990, he made a life-changing decision to commit his life to Christ. He pursued his education and obtained a degree in Chemical Engineering from the Federal University of Technology, Minna. \n\nHe is the spiritual son of the esteemed Apostle Arome Osayi, a revered mentor and spiritual father. Apostle Agboola's connection to his spiritual heritage is deeply rooted, and he honors the fatherhood of distinguished Fathers of faith, including Prophet Michael Olaosebikan Adio: A respected spiritual leader and mentor, known for his wisdom and Prophetic guidance. Apostle Agboola acknowledges the spiritual guidance and support received from various spiritual leaders, fostering his growth and ministry. With a strong foundation in spiritual guidance, Apostle Toluwalogo Agboola continues to inspire and lead others, perpetuating a legacy of faith, wisdom, and compassion. His connection to his spiritual roots is a testament to the significance of mentorship and the impact of spiritual fatherhood in shaping lives and ministries. \n\nApostle Tolu Agboola received a divine commission from God with the powerful mandate to 'Take My Worship to The Ends Of The Earth'. As a result, he now serves as the head of His Worship Christian Network (HWCN Global), which is situated at The Ark of Preservation, Behind Facebook Market, UnderG, in the city of Ogbomoso. His guiding philosophy is deeply rooted in the belief that faith in God forms a solid foundation for the building of destinies. \n\nFurthermore, Apostle Tolu Agboola found love and happiness in marriage with Mrs. Ademidoyin Agboola, and they solemnized their union in November 2019."
  ],
  [
    "apostle-awoyele",
    "Reverend Awoyele",
    "Minister",
    "Salt & Light '26",
    "/images/rev-awoyele.jpeg",
    "Reverend Demola Awoyele is a dynamic pastor, mentor, trainer, and accomplished author. Together with his wife, Pastor Kemi, he serves as the Senior Pastor of Destiny Impact Church (DIC), Akure, Ondo State, a vibrant church with a clear mandate to empower people to fulfill their God-given destiny. He is also the President of Demola Awoyele Ministries International (DAMI), carrying a global vision to disciple the nations. \n\nHis journey, from humble beginnings to transformative leadership, is a powerful testimony of resilience, divine purpose, and impactful decisions. While studying at the Federal University of Technology, Akure (FUTA), he began his pastoral ministry, faithfully leading the Foursquare Students’ Fellowship (FSF) and later serving with the Joint Christian Campus Fellowship (JCCF). He went on to obtain a Master of Science (M.Sc.) degree from the University of Lagos. \n\nA gifted teacher of the Word, Pastor Demola ministers with accuracy, power, and deep life-transforming insight. His passion is to equip people to become all God has ordained them to be, building lasting capacity for life and destiny."
  ],
  [
    "dr-kotila",
    "Dr. Olayinka Kotila",
    "Minister",
    "Salt & Light '26",
    "/images/dr-kotila.jpeg",
    "Dr Olayinka Kotila is a researcher in the field of pharmacokinetics and an excellent lecturer of Pharmaceutical Chemistry in the University of Ibadan. She's happily married to Reverend Gbenga Kotila and together they pastor the Centre for Reality International Church, Ibadan. Dr Olayinka Kotila is a rugged preacher of the undiluted word of God."
  ],
  [
    "mr-sobayo",
    "Mr. Femi Sobayo",
    "Minister",
    "Salt & Light '26",
    "/images/mr-sobayo.jpeg",
    "Olumuyiwa Femi Sobayo is a distinguished finance, strategy, and business intelligence leader with over 15 years of exceptional, cross-functional experience. He has successfully steered financial governance, capital models, and long-term valuation portfolios across high-impact sectors including Banking, FMCG, Pharmaceuticals, Engineering, Agriculture, Trade Development, and top-tier NGOs."
  ],
  [
    "dr-dolapo-awoniyi",
    "Dr. Adedolapo Awoniyi",
    "Minister",
    "Salt & Light '26",
    "/images/dolapo.jpeg",
    "Dr. Adedolapo Awoniyi (known publicly as stylebydolaaapo) is an award-winning Nigerian fashion influencer, content creator, academic, and author. She earned her first degree in Social Studies Education at Obafemi Awolowo University, followed by two Master's degrees—in Industrial Education & Training from the University of Ibadan and Social Studies from Lead City University—and holds a Ph.D. in Industrial Education and Training from the University of Ibadan. She currently serves as a Lecturer of Business Education and Entrepreneurship at a private university in Nigeria, having authored 14 published academic papers alongside organizing academic conferences and seminars.\n\nWith over 60,000 followers across Instagram, TikTok, and YouTube, Dr. Awoniyi has partnered with over 200 fashion brands across Nigeria as well as international brands in China and Turkey. She collaborates with homegrown designers to build awareness, drive sales, and produce engaging, relatable content. She is also the author of the two-volume book 'The Art of Fashion Influencing' and routinely hosts masterclasses on content creation for emerging fashion entrepreneurs.\n\nDeeply invested in community development and sustainable fashion, she has volunteered with initiatives such as the Nigerian Students Fashion and Design Week (NSFDW) and Alimosho Fashion Week in Lagos to support young and rural entrepreneurs. She has also served as a distinguished panelist at OAU Fashion Week 2023 ('Afro Upcycling: Urbanising the Future of African Fashion'), the Sustainable Fashion Webinar ('The Art of Sustainable Fashion'), and Financial Planning for Fashionpreneurs."
  ]
];

export const ministers: Minister[] = ministerData.map(([id, name, role, organization, image, bio]) => ({ id, name, role, organization, image, bio }));

export const archiveImages: ArchiveImage[] = Array.from({ length: 31 }, (_, i) => {
  const year = i < 15 ? 2024 : 2025;
  const number = i < 15 ? i + 1 : i - 14;
  const aspect = ["4 / 5", "16 / 10", "3 / 4", "4 / 5", "16 / 11"][i % 5];
  return { id: `${year}-${String(number).padStart(2, "0")}`, src: `/images/gallery-${year}/${String(number).padStart(2, "0")}.jpeg`, year: year as 2024 | 2025, aspect };
});
