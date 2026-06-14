// Rajasthan Districts & Tehsils Database Table Simulation
export interface DistrictRecord {
  id: string;
  name: string;
}

export interface TehsilRecord {
  id: string;
  districtId: string;
  name: string;
}

const DEFAULT_DISTRICTS: DistrictRecord[] = [
  { id: "dist-ajmer", name: "Ajmer" },
  { id: "dist-alwar", name: "Alwar" },
  { id: "dist-anupgarh", name: "Anupgarh" },
  { id: "dist-balotra", name: "Balotra" },
  { id: "dist-banswara", name: "Banswara" },
  { id: "dist-baran", name: "Baran" },
  { id: "dist-barmer", name: "Barmer" },
  { id: "dist-beawar", name: "Beawar" },
  { id: "dist-bharatpur", name: "Bharatpur" },
  { id: "dist-bhilwara", name: "Bhilwara" },
  { id: "dist-bikaner", name: "Bikaner" },
  { id: "dist-bundi", name: "Bundi" },
  { id: "dist-chittorgarh", name: "Chittorgarh" },
  { id: "dist-churu", name: "Churu" },
  { id: "dist-dausa", name: "Dausa" },
  { id: "dist-deeg", name: "Deeg" },
  { id: "dist-dholpur", name: "Dholpur" },
  { id: "dist-didwana-kuchaman", name: "Didwana-Kuchaman" },
  { id: "dist-dungarpur", name: "Dungarpur" },
  { id: "dist-gangapur-city", name: "Gangapur City" },
  { id: "dist-hanumangarh", name: "Hanumangarh" },
  { id: "dist-jaipur", name: "Jaipur" },
  { id: "dist-jaipur-rural", name: "Jaipur Rural" },
  { id: "dist-jaisalmer", name: "Jaisalmer" },
  { id: "dist-jalore", name: "Jalore" },
  { id: "dist-jhalawar", name: "Jhalawar" },
  { id: "dist-jhunjhunu", name: "Jhunjhunu" },
  { id: "dist-jodhpur", name: "Jodhpur" },
  { id: "dist-jodhpur-rural", name: "Jodhpur Rural" },
  { id: "dist-karauli", name: "Karauli" },
  { id: "dist-kekri", name: "Kekri" },
  { id: "dist-khairthal-tijara", name: "Khairthal-Tijara" },
  { id: "dist-kota", name: "Kota" },
  { id: "dist-kotputli-behror", name: "Kotputli-Behror" },
  { id: "dist-nagaur", name: "Nagaur" },
  { id: "dist-neem-ka-thana", name: "Neem Ka Thana" },
  { id: "dist-pali", name: "Pali" },
  { id: "dist-phalodi", name: "Phalodi" },
  { id: "dist-pratapgarh", name: "Pratapgarh" },
  { id: "dist-rajsamand", name: "Rajsamand" },
  { id: "dist-salumber", name: "Salumber" },
  { id: "dist-sanchore", name: "Sanchore" },
  { id: "dist-sawai-madhopur", name: "Sawai Madhopur" },
  { id: "dist-shahpura", name: "Shahpura" },
  { id: "dist-sikar", name: "Sikar" },
  { id: "dist-sirohi", name: "Sirohi" },
  { id: "dist-sri-ganganagar", name: "Sri Ganganagar" },
  { id: "dist-tonk", name: "Tonk" },
  { id: "dist-udaipur", name: "Udaipur" },
  { id: "dist-dudu", name: "Dudu" }
];

const DEFAULT_TEHSILS: TehsilRecord[] = [
  // Ajmer Tehsils
  { id: "teh-aj-1", districtId: "dist-ajmer", name: "Ajmer" },
  { id: "teh-aj-2", districtId: "dist-ajmer", name: "Kishangarh" },
  { id: "teh-aj-3", districtId: "dist-ajmer", name: "Nasirabad" },
  { id: "teh-aj-4", districtId: "dist-ajmer", name: "Pushkar" },
  { id: "teh-aj-5", districtId: "dist-ajmer", name: "Peesangan" },
  { id: "teh-aj-6", districtId: "dist-ajmer", name: "Shrinagar" },

  // Alwar Tehsils
  { id: "teh-al-1", districtId: "dist-alwar", name: "Alwar" },
  { id: "teh-al-2", districtId: "dist-alwar", name: "Ramgarh" },
  { id: "teh-al-3", districtId: "dist-alwar", name: "Rajgarh" },
  { id: "teh-al-4", districtId: "dist-alwar", name: "Lachhmangarh" },
  { id: "teh-al-5", districtId: "dist-alwar", name: "Thanagazi" },
  { id: "teh-al-6", districtId: "dist-alwar", name: "Malakhera" },

  // Anupgarh Tehsils
  { id: "teh-an-1", districtId: "dist-anupgarh", name: "Anupgarh" },
  { id: "teh-an-2", districtId: "dist-anupgarh", name: "Raisinghnagar" },
  { id: "teh-an-3", districtId: "dist-anupgarh", name: "Gharsana" },
  { id: "teh-an-4", districtId: "dist-anupgarh", name: "Rawatla" },
  { id: "teh-an-5", districtId: "dist-anupgarh", name: "Vijaynagar" },
  { id: "teh-an-6", districtId: "dist-anupgarh", name: "Sri Karanpur" },

  // Balotra Tehsils
  { id: "teh-ba-1", districtId: "dist-balotra", name: "Balotra" },
  { id: "teh-ba-2", districtId: "dist-balotra", name: "Siwana" },
  { id: "teh-ba-3", districtId: "dist-balotra", name: "Sindhari" },
  { id: "teh-ba-4", districtId: "dist-balotra", name: "Kalyanpur" },
  { id: "teh-ba-5", districtId: "dist-balotra", name: "Baytu" },
  { id: "teh-ba-6", districtId: "dist-balotra", name: "Patodi" },

  // Banswara Tehsils
  { id: "teh-bas-1", districtId: "dist-banswara", name: "Banswara" },
  { id: "teh-bas-2", districtId: "dist-banswara", name: "Bagidora" },
  { id: "teh-bas-3", districtId: "dist-banswara", name: "Garhi" },
  { id: "teh-bas-4", districtId: "dist-banswara", name: "Ghatol" },
  { id: "teh-bas-5", districtId: "dist-banswara", name: "Kushalgarh" },
  { id: "teh-bas-6", districtId: "dist-banswara", name: "Anandpuri" },

  // Baran Tehsils
  { id: "teh-bar-1", districtId: "dist-baran", name: "Baran" },
  { id: "teh-bar-2", districtId: "dist-baran", name: "Antah" },
  { id: "teh-bar-3", districtId: "dist-baran", name: "Atru" },
  { id: "teh-bar-4", districtId: "dist-baran", name: "Chhabra" },
  { id: "teh-bar-5", districtId: "dist-baran", name: "Mangrol" },
  { id: "teh-bar-6", districtId: "dist-baran", name: "Shahbad" },

  // Barmer Tehsils
  { id: "teh-brm-1", districtId: "dist-barmer", name: "Barmer" },
  { id: "teh-brm-2", districtId: "dist-barmer", name: "Chohtan" },
  { id: "teh-brm-3", districtId: "dist-barmer", name: "Gudamalani" },
  { id: "teh-brm-4", districtId: "dist-barmer", name: "Ramsar" },
  { id: "teh-brm-5", districtId: "dist-barmer", name: "Shiv" },
  { id: "teh-brm-6", districtId: "dist-barmer", name: "Sedwa" },

  // Beawar Tehsils
  { id: "teh-bea-1", districtId: "dist-beawar", name: "Beawar" },
  { id: "teh-bea-2", districtId: "dist-beawar", name: "Jaitaran" },
  { id: "teh-bea-3", districtId: "dist-beawar", name: "Raipur" },
  { id: "teh-bea-4", districtId: "dist-beawar", name: "Masuda" },
  { id: "teh-bea-5", districtId: "dist-beawar", name: "Jawaja" },
  { id: "teh-bea-6", districtId: "dist-beawar", name: "Badnor" },

  // Bharatpur Tehsils
  { id: "teh-bha-1", districtId: "dist-bharatpur", name: "Bharatpur" },
  { id: "teh-bha-2", districtId: "dist-bharatpur", name: "Bayana" },
  { id: "teh-bha-3", districtId: "dist-bharatpur", name: "Kumher" },
  { id: "teh-bha-4", districtId: "dist-bharatpur", name: "Nadbai" },
  { id: "teh-bha-5", districtId: "dist-bharatpur", name: "Nagar" },
  { id: "teh-bha-6", districtId: "dist-bharatpur", name: "Weir" },

  // Bhilwara Tehsils
  { id: "teh-bhi-1", districtId: "dist-bhilwara", name: "Bhilwara" },
  { id: "teh-bhi-2", districtId: "dist-bhilwara", name: "Asind" },
  { id: "teh-bhi-3", districtId: "dist-bhilwara", name: "Mandal" },
  { id: "teh-bhi-4", districtId: "dist-bhilwara", name: "Mandalgarh" },
  { id: "teh-bhi-5", districtId: "dist-bhilwara", name: "Sahara" },
  { id: "teh-bhi-6", districtId: "dist-bhilwara", name: "Kotri" },

  // Bikaner Tehsils
  { id: "teh-bik-1", districtId: "dist-bikaner", name: "Bikaner" },
  { id: "teh-bik-2", districtId: "dist-bikaner", name: "Nokha" },
  { id: "teh-bik-3", districtId: "dist-bikaner", name: "Kolayat" },
  { id: "teh-bik-4", districtId: "dist-bikaner", name: "Lunkaransar" },
  { id: "teh-bik-5", districtId: "dist-bikaner", name: "Sridungargarh" },
  { id: "teh-bik-6", districtId: "dist-bikaner", name: "Khajuwala" },

  // Bundi Tehsils
  { id: "teh-bun-1", districtId: "dist-bundi", name: "Bundi" },
  { id: "teh-bun-2", districtId: "dist-bundi", name: "Hindoli" },
  { id: "teh-bun-3", districtId: "dist-bundi", name: "Keshoraipatan" },
  { id: "teh-bun-4", districtId: "dist-bundi", name: "Nainwa" },
  { id: "teh-bun-5", districtId: "dist-bundi", name: "Talera" },

  // Chittorgarh Tehsils
  { id: "teh-chi-1", districtId: "dist-chittorgarh", name: "Chittorgarh" },
  { id: "teh-chi-2", districtId: "dist-chittorgarh", name: "Begun" },
  { id: "teh-chi-3", districtId: "dist-chittorgarh", name: "Kapasan" },
  { id: "teh-chi-4", districtId: "dist-chittorgarh", name: "Nimbahera" },
  { id: "teh-chi-5", districtId: "dist-chittorgarh", name: "Rashmi" },
  { id: "teh-chi-6", districtId: "dist-chittorgarh", name: "Bari Sadri" },

  // Churu Tehsils
  { id: "teh-chu-1", districtId: "dist-churu", name: "Churu" },
  { id: "teh-chu-2", districtId: "dist-churu", name: "Rajgarh" },
  { id: "teh-chu-3", districtId: "dist-churu", name: "Ratangarh" },
  { id: "teh-chu-4", districtId: "dist-churu", name: "Sardarshahar" },
  { id: "teh-chu-5", districtId: "dist-churu", name: "Sujangarh" },
  { id: "teh-chu-6", districtId: "dist-churu", name: "Taranagar" },

  // Dausa Tehsils
  { id: "teh-dau-1", districtId: "dist-dausa", name: "Dausa" },
  { id: "teh-dau-2", districtId: "dist-dausa", name: "Bandikui" },
  { id: "teh-dau-3", districtId: "dist-dausa", name: "Lalsot" },
  { id: "teh-dau-4", districtId: "dist-dausa", name: "Mahwa" },
  { id: "teh-dau-5", districtId: "dist-dausa", name: "Sikrai" },

  // Deeg Tehsils
  { id: "teh-dee-1", districtId: "dist-deeg", name: "Deeg" },
  { id: "teh-dee-2", districtId: "dist-deeg", name: "Kaman" },
  { id: "teh-dee-3", districtId: "dist-deeg", name: "Nagar" },
  { id: "teh-dee-4", districtId: "dist-deeg", name: "Sikri" },
  { id: "teh-dee-5", districtId: "dist-deeg", name: "Pahari" },

  // Dholpur Tehsils
  { id: "teh-dho-1", districtId: "dist-dholpur", name: "Dholpur" },
  { id: "teh-dho-2", districtId: "dist-dholpur", name: "Bari" },
  { id: "teh-dho-3", districtId: "dist-dholpur", name: "Baseri" },
  { id: "teh-dho-4", districtId: "dist-dholpur", name: "Rajakhera" },
  { id: "teh-dho-5", districtId: "dist-dholpur", name: "Saipau" },

  // Didwana-Kuchaman Tehsils
  { id: "teh-did-1", districtId: "dist-didwana-kuchaman", name: "Didwana" },
  { id: "teh-did-2", districtId: "dist-didwana-kuchaman", name: "Kuchaman City" },
  { id: "teh-did-3", districtId: "dist-didwana-kuchaman", name: "Ladnun" },
  { id: "teh-did-4", districtId: "dist-didwana-kuchaman", name: "Makrana" },
  { id: "teh-did-5", districtId: "dist-didwana-kuchaman", name: "Nawa" },
  { id: "teh-did-6", districtId: "dist-didwana-kuchaman", name: "Parbatsar" },

  // Dungarpur Tehsils
  { id: "teh-dun-1", districtId: "dist-dungarpur", name: "Dungarpur" },
  { id: "teh-dun-2", districtId: "dist-dungarpur", name: "Aspur" },
  { id: "teh-dun-3", districtId: "dist-dungarpur", name: "Sagwara" },
  { id: "teh-dun-4", districtId: "dist-dungarpur", name: "Simalwara" },

  // Gangapur City Tehsils
  { id: "teh-gan-1", districtId: "dist-gangapur-city", name: "Gangapur City" },
  { id: "teh-gan-2", districtId: "dist-gangapur-city", name: "Bamanwas" },
  { id: "teh-gan-3", districtId: "dist-gangapur-city", name: "Wazirpur" },
  { id: "teh-gan-4", districtId: "dist-gangapur-city", name: "Todabhim" },

  // Hanumangarh Tehsils
  { id: "teh-han-1", districtId: "dist-hanumangarh", name: "Hanumangarh" },
  { id: "teh-han-2", districtId: "dist-hanumangarh", name: "Bhadra" },
  { id: "teh-han-3", districtId: "dist-hanumangarh", name: "Nohar" },
  { id: "teh-han-4", districtId: "dist-hanumangarh", name: "Pilibanga" },
  { id: "teh-han-5", districtId: "dist-hanumangarh", name: "Sangaria" },
  { id: "teh-han-6", districtId: "dist-hanumangarh", name: "Rawatsar" },

  // Jaipur Tehsils
  { id: "teh-jai-1", districtId: "dist-jaipur", name: "Jaipur" },
  { id: "teh-jai-2", districtId: "dist-jaipur", name: "Sanganer" },
  { id: "teh-jai-3", districtId: "dist-jaipur", name: "Amer" },

  // Jaipur Rural Tehsils
  { id: "teh-jr-1", districtId: "dist-jaipur-rural", name: "Bassi" },
  { id: "teh-jr-2", districtId: "dist-jaipur-rural", name: "Chomu" },
  { id: "teh-jr-3", districtId: "dist-jaipur-rural", name: "Jamwa Ramgarh" },
  { id: "teh-jr-4", districtId: "dist-jaipur-rural", name: "Chaksu" },
  { id: "teh-jr-5", districtId: "dist-jaipur-rural", name: "Shahpura" },
  { id: "teh-jr-6", districtId: "dist-jaipur-rural", name: "Kotkhawada" },
  { id: "teh-jr-7", districtId: "dist-jaipur-rural", name: "Jobner" },

  // Jaisalmer Tehsils
  { id: "teh-jas-1", districtId: "dist-jaisalmer", name: "Jaisalmer" },
  { id: "teh-jas-2", districtId: "dist-jaisalmer", name: "Pokaran" },
  { id: "teh-jas-3", districtId: "dist-jaisalmer", name: "Bhaniyana" },
  { id: "teh-jas-4", districtId: "dist-jaisalmer", name: "Fatehgarh" },

  // Jalore Tehsils
  { id: "teh-jal-1", districtId: "dist-jalore", name: "Jalore" },
  { id: "teh-jal-2", districtId: "dist-jalore", name: "Ahore" },
  { id: "teh-jal-3", districtId: "dist-jalore", name: "Bhinmal" },
  { id: "teh-jal-4", districtId: "dist-jalore", name: "Sayla" },

  // Jhalawar Tehsils
  { id: "teh-jha-1", districtId: "dist-jhalawar", name: "Jhalawar" },
  { id: "teh-jha-2", districtId: "dist-jhalawar", name: "Jhalrapatan" },
  { id: "teh-jha-3", districtId: "dist-jhalawar", name: "Aklera" },
  { id: "teh-jha-4", districtId: "dist-jhalawar", name: "Khanpur" },
  { id: "teh-jha-5", districtId: "dist-jhalawar", name: "Manohar Thana" },

  // Jhunjhunu Tehsils
  { id: "teh-jhu-1", districtId: "dist-jhunjhunu", name: "Jhunjhunu" },
  { id: "teh-jhu-2", districtId: "dist-jhunjhunu", name: "Chirawa" },
  { id: "teh-jhu-3", districtId: "dist-jhunjhunu", name: "Nawalgarh" },
  { id: "teh-jhu-4", districtId: "dist-jhunjhunu", name: "Buhana" },
  { id: "teh-jhu-5", districtId: "dist-jhunjhunu", name: "Surajgarh" },

  // Jodhpur Tehsils
  { id: "teh-jod-1", districtId: "dist-jodhpur", name: "Jodhpur North" },
  { id: "teh-jod-2", districtId: "dist-jodhpur", name: "Jodhpur South" },

  // Jodhpur Rural Tehsils
  { id: "teh-jr-101", districtId: "dist-jodhpur-rural", name: "Luni" },
  { id: "teh-jr-102", districtId: "dist-jodhpur-rural", name: "Bilara" },
  { id: "teh-jr-103", districtId: "dist-jodhpur-rural", name: "Osian" },
  { id: "teh-jr-104", districtId: "dist-jodhpur-rural", name: "Bhopalgarh" },
  { id: "teh-jr-105", districtId: "dist-jodhpur-rural", name: "Piparcity" },
  { id: "teh-jr-106", districtId: "dist-jodhpur-rural", name: "Shergarh" },
  { id: "teh-jr-107", districtId: "dist-jodhpur-rural", name: "Balesar" },
  { id: "teh-jr-108", districtId: "dist-jodhpur-rural", name: "Tinwari" },

  // Karauli Tehsils
  { id: "teh-kar-1", districtId: "dist-karauli", name: "Karauli" },
  { id: "teh-kar-2", districtId: "dist-karauli", name: "Hindaun" },
  { id: "teh-kar-3", districtId: "dist-karauli", name: "Sapotra" },
  { id: "teh-kar-4", districtId: "dist-karauli", name: "Todabhim" },

  // Kekri Tehsils
  { id: "teh-kek-1", districtId: "dist-kekri", name: "Kekri" },
  { id: "teh-kek-2", districtId: "dist-kekri", name: "Sarwar" },
  { id: "teh-kek-3", districtId: "dist-kekri", name: "Bhinay" },
  { id: "teh-kek-4", districtId: "dist-kekri", name: "Sawar" },

  // Khairthal-Tijara Tehsils
  { id: "teh-kt-1", districtId: "dist-khairthal-tijara", name: "Khairthal" },
  { id: "teh-kt-2", districtId: "dist-khairthal-tijara", name: "Tijara" },
  { id: "teh-kt-3", districtId: "dist-khairthal-tijara", name: "Kishangarh Bas" },
  { id: "teh-kt-4", districtId: "dist-khairthal-tijara", name: "Kotkasim" },
  { id: "teh-kt-5", districtId: "dist-khairthal-tijara", name: "Mundawar" },

  // Kota Tehsils
  { id: "teh-kot-1", districtId: "dist-kota", name: "Ladpura" },
  { id: "teh-kot-2", districtId: "dist-kota", name: "Sangod" },
  { id: "teh-kot-3", districtId: "dist-kota", name: "Digod" },
  { id: "teh-kot-4", districtId: "dist-kota", name: "Ramganj Mandi" },
  { id: "teh-kot-5", districtId: "dist-kota", name: "Pipalda" },

  // Kotputli-Behror Tehsils
  { id: "teh-kb-1", districtId: "dist-kotputli-behror", name: "Kotputli" },
  { id: "teh-kb-2", districtId: "dist-kotputli-behror", name: "Behror" },
  { id: "teh-kb-3", districtId: "dist-kotputli-behror", name: "Neemrana" },
  { id: "teh-kb-4", districtId: "dist-kotputli-behror", name: "Bansur" },

  // Nagaur Tehsils
  { id: "teh-nag-1", districtId: "dist-nagaur", name: "Nagaur" },
  { id: "teh-nag-2", districtId: "dist-nagaur", name: "Jayal" },
  { id: "teh-nag-3", districtId: "dist-nagaur", name: "Khinvsar" },
  { id: "teh-nag-4", districtId: "dist-nagaur", name: "Mundwa" },
  { id: "teh-nag-5", districtId: "dist-nagaur", name: "Merta" },
  { id: "teh-nag-6", districtId: "dist-nagaur", name: "Degana" },

  // Neem Ka Thana Tehsils
  { id: "teh-nt-1", districtId: "dist-neem-ka-thana", name: "Neem Ka Thana" },
  { id: "teh-nt-2", districtId: "dist-neem-ka-thana", name: "Shrimadhopur" },
  { id: "teh-nt-3", districtId: "dist-neem-ka-thana", name: "Patan" },
  { id: "teh-nt-4", districtId: "dist-neem-ka-thana", name: "Khetri" },
  { id: "teh-nt-5", districtId: "dist-neem-ka-thana", name: "Udaipurwati" },

  // Pali Tehsils
  { id: "teh-pal-1", districtId: "dist-pali", name: "Pali" },
  { id: "teh-pal-2", districtId: "dist-pali", name: "Rohat" },
  { id: "teh-pal-3", districtId: "dist-pali", name: "Sojat" },
  { id: "teh-pal-4", districtId: "dist-pali", name: "Marwar Junction" },
  { id: "teh-pal-5", districtId: "dist-pali", name: "Bali" },
  { id: "teh-pal-6", districtId: "dist-pali", name: "Sumerpur" },
  { id: "teh-pal-7", districtId: "dist-pali", name: "Rani" },

  // Phalodi Tehsils
  { id: "teh-pha-1", districtId: "dist-phalodi", name: "Phalodi" },
  { id: "teh-pha-2", districtId: "dist-phalodi", name: "Loha" },
  { id: "teh-pha-3", districtId: "dist-phalodi", name: "Dechu" },
  { id: "teh-pha-4", districtId: "dist-phalodi", name: "Bap" },
  { id: "teh-pha-5", districtId: "dist-phalodi", name: "Baori" },

  // Pratapgarh Tehsils
  { id: "teh-pra-1", districtId: "dist-pratapgarh", name: "Pratapgarh" },
  { id: "teh-pra-2", districtId: "dist-pratapgarh", name: "Arnod" },
  { id: "teh-pra-3", districtId: "dist-pratapgarh", name: "Chhoti Sadri" },
  { id: "teh-pra-4", districtId: "dist-pratapgarh", name: "Dhariawad" },

  // Rajsamand Tehsils
  { id: "teh-raj-1", districtId: "dist-rajsamand", name: "Rajsamand" },
  { id: "teh-raj-2", districtId: "dist-rajsamand", name: "Amet" },
  { id: "teh-raj-3", districtId: "dist-rajsamand", name: "Bhim" },
  { id: "teh-raj-4", districtId: "dist-rajsamand", name: "Deogarh" },
  { id: "teh-raj-5", districtId: "dist-rajsamand", name: "Kumbhalgarh" },
  { id: "teh-raj-6", districtId: "dist-rajsamand", name: "Nathdwara" },

  // Salumber Tehsils
  { id: "teh-sal-1", districtId: "dist-salumber", name: "Salumber" },
  { id: "teh-sal-2", districtId: "dist-salumber", name: "Sarada" },
  { id: "teh-sal-3", districtId: "dist-salumber", name: "Semari" },
  { id: "teh-sal-4", districtId: "dist-salumber", name: "Lasadiya" },

  // Sanchore Tehsils
  { id: "teh-san-1", districtId: "dist-sanchore", name: "Sanchore" },
  { id: "teh-san-2", districtId: "dist-sanchore", name: "Bagoda" },
  { id: "teh-san-3", districtId: "dist-sanchore", name: "Chhitwana" },

  // Sawai Madhopur Tehsils
  { id: "teh-sm-1", districtId: "dist-sawai-madhopur", name: "Sawai Madhopur" },
  { id: "teh-sm-2", districtId: "dist-sawai-madhopur", name: "Bonli" },
  { id: "teh-sm-3", districtId: "dist-sawai-madhopur", name: "Khandar" },
  { id: "teh-sm-4", districtId: "dist-sawai-madhopur", name: "Chauth Ka Barwara" },

  // Shahpura Tehsils
  { id: "teh-sha-1", districtId: "dist-shahpura", name: "Shahpura" },
  { id: "teh-sha-2", districtId: "dist-shahpura", name: "Jahazpur" },
  { id: "teh-sha-3", districtId: "dist-shahpura", name: "Kotri" },
  { id: "teh-sha-4", districtId: "dist-shahpura", name: "Hurda" },

  // Sikar Tehsils
  { id: "teh-sik-1", districtId: "dist-sikar", name: "Sikar" },
  { id: "teh-sik-2", districtId: "dist-sikar", name: "Dantaramgarh" },
  { id: "teh-sik-3", districtId: "dist-sikar", name: "Khandela" },
  { id: "teh-sik-4", districtId: "dist-sikar", name: "Laxmangarh" },
  { id: "teh-sik-5", districtId: "dist-sikar", name: "Fatehpur" },
  { id: "teh-sik-6", districtId: "dist-sikar", name: "Reengus" },

  // Sirohi Tehsils
  { id: "teh-sir-1", districtId: "dist-sirohi", name: "Sirohi" },
  { id: "teh-sir-2", districtId: "dist-sirohi", name: "Abu Road" },
  { id: "teh-sir-3", districtId: "dist-sirohi", name: "Pindwara" },
  { id: "teh-sir-4", districtId: "dist-sirohi", name: "Reodar" },
  { id: "teh-sir-5", districtId: "dist-sirohi", name: "Sheoganj" },

  // Sri Ganganagar Tehsils
  { id: "teh-sg-1", districtId: "dist-sri-ganganagar", name: "Sri Ganganagar" },
  { id: "teh-sg-2", districtId: "dist-sri-ganganagar", name: "Sadulshahar" },
  { id: "teh-sg-3", districtId: "dist-sri-ganganagar", name: "Suratgarh" },
  { id: "teh-sg-4", districtId: "dist-sri-ganganagar", name: "Padampur" },
  { id: "teh-sg-5", districtId: "dist-sri-ganganagar", name: "Karanpur" },

  // Tonk Tehsils
  { id: "teh-ton-1", districtId: "dist-tonk", name: "Tonk" },
  { id: "teh-ton-2", districtId: "dist-tonk", name: "Deoli" },
  { id: "teh-ton-3", districtId: "dist-tonk", name: "Malpura" },
  { id: "teh-ton-4", districtId: "dist-tonk", name: "Newai" },
  { id: "teh-ton-5", districtId: "dist-tonk", name: "Uniara" },

  // Udaipur Tehsils
  { id: "teh-uda-1", districtId: "dist-udaipur", name: "Girwa" },
  { id: "teh-uda-2", districtId: "dist-udaipur", name: "Gogunda" },
  { id: "teh-uda-3", districtId: "dist-udaipur", name: "Jhadol" },
  { id: "teh-uda-4", districtId: "dist-udaipur", name: "Kherwara" },
  { id: "teh-uda-5", districtId: "dist-udaipur", name: "Mavli" },
  { id: "teh-uda-6", districtId: "dist-udaipur", name: "Vallabhnagar" },

  // Dudu Tehsils
  { id: "teh-dud-1", districtId: "dist-dudu", name: "Dudu" },
  { id: "teh-dud-2", districtId: "dist-dudu", name: "Mozamabad" },
  { id: "teh-dud-3", districtId: "dist-dudu", name: "Phagi" }
];

const DEFAULT_VILLAGES_BY_TEHSIL: { [tehsilName: string]: string[] } = {
  "Luni": ["Salawas", "Dhawa", "Doli", "Peesangan", "Satlana", "Boranada", "Kankani", "Nandwan", "Tanawada", "Sarangwas"],
  "Bilara": ["Bilara Town", "Khejarli", "Bala", "Ransigaon", "Borunda", "Pipar", "Kaparda", "Bhavi", "Olvi", "Hariyadhana"],
  "Osian": ["Osian Town", "Tiwri", "Mathania", "Cherai", "Kanasar", "Bheekamkor", "Chadi", "Mandore", "Samrau", "Tiwari"],
  "Bhopalgarh": ["Bhopalgarh Town", "Asop", "Khangta", "Raddod", "Palri", "Basni", "Malar", "Gara", "Kuri"],
  "Sanganer": ["Sanganer Town", "Chatsu", "Watika", "Goner", "Mahapura", "Bhankrota", "Muhana", "Ramchandrapura"],
  "Kishangarh": ["Kishangarh Town", "Harmara", "Rupangarh", "Arain", "Thal", "Karkeri", "Salemabad"],
  "Sikar": ["Sikar Town", "Kudli", "Katrathal", "Piprali", "Harsh", "Dhani", "Khood", "Rashidpura", "Dhadhan"],
  "Sojat": ["Sojat City", "Sojat Road", "Bagri", "Chandawal", "Sanderao", "Kharchi", "Mandla", "Rajnagar"],
  "Jodhpur North": ["Mandore", "Daijar", "Karwar", "Bhadu", "Magra", "Santokhi"],
  "Jodhpur South": ["Salawas", "Sangaria", "Boranada", "Basni", "Pal Road", "Jhalamand"],
  "Ajmer": ["Ajmer Town", "Pushkar Road", "Somarkha", "Gegal", "Ladpura", "Ararka", "Makarwali"],
  "Alwar": ["Alwar Town", "Malakhera City", "Bhadkol", "Macha", "Ond", "Gothri"],
  "Barmer": ["Barmer Town", "Sindhari", "Gudamalani", "Chohtan", "Ramsar", "Shiv"]
};

export const locationDb = {
  // Retrieve all districts from localStorage "table" with defaults
  getDistricts: (): DistrictRecord[] => {
    const stored = localStorage.getItem('mali_samaj_districts');
    if (!stored) {
      localStorage.setItem('mali_samaj_districts', JSON.stringify(DEFAULT_DISTRICTS));
      return DEFAULT_DISTRICTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return DEFAULT_DISTRICTS;
    }
  },

  // Retrieve tehsils associated with a particular district
  getTehsils: (districtId: string | null): TehsilRecord[] => {
    if (!districtId) return [];
    
    const stored = localStorage.getItem('mali_samaj_tehsils');
    let allTehsils = DEFAULT_TEHSILS;
    if (!stored) {
      localStorage.setItem('mali_samaj_tehsils', JSON.stringify(DEFAULT_TEHSILS));
    } else {
      try {
        allTehsils = JSON.parse(stored);
      } catch {
        allTehsils = DEFAULT_TEHSILS;
      }
    }

    return allTehsils.filter(t => t.districtId === districtId);
  },

  // Retrieve tehsils associated with a district name
  getTehsilsByDistrictName: (districtName: string): TehsilRecord[] => {
    if (!districtName || districtName.toLowerCase() === 'all') return [];
    
    const districts = locationDb.getDistricts();
    const found = districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (!found) {
      // Dynamic fallback for custom/newly added districts
      return [];
    }
    return locationDb.getTehsils(found.id);
  },

  // Retrieve villages associated with a tehsil name
  getVillagesByTehsilName: (tehsilName: string): string[] => {
    if (!tehsilName || tehsilName.toLowerCase() === 'all') return [];
    
    // Retrieve standard pre-defined villages
    const standardVillages = DEFAULT_VILLAGES_BY_TEHSIL[tehsilName] || [];
    
    // Merge with any custom villages saved to localStorage
    const saved = localStorage.getItem(`mali_villages_${tehsilName}`);
    if (saved) {
      try {
        const customVillages = JSON.parse(saved);
        return Array.from(new Set([...standardVillages, ...customVillages]));
      } catch {
        return standardVillages;
      }
    }
    return standardVillages;
  },

  // Dynamic custom village registration
  insertVillage: (tehsilName: string, villageName: string): string => {
    const cleanTehsil = tehsilName.trim();
    const cleanVillage = villageName.trim();
    if (!cleanTehsil || !cleanVillage) return "";

    const key = `mali_villages_${cleanTehsil}`;
    let customVillages: string[] = [];
    
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        customVillages = JSON.parse(saved);
      } catch {
        customVillages = [];
      }
    }

    if (!customVillages.includes(cleanVillage)) {
      customVillages.push(cleanVillage);
      localStorage.setItem(key, JSON.stringify(customVillages));
    }
    return cleanVillage;
  },

  // Insert a custom district (INSERT INTO districts TABLE)
  insertDistrict: (name: string): DistrictRecord => {
    const cleanName = name.trim();
    const list = locationDb.getDistricts();
    const existing = list.find(d => d.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) return existing;

    const id = `dist-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const newRecord: DistrictRecord = { id, name: cleanName };
    const updated = [...list, newRecord];
    localStorage.setItem('mali_samaj_districts', JSON.stringify(updated));
    return newRecord;
  },

  // Insert a custom tehsil (INSERT INTO tehsils TABLE)
  insertTehsil: (districtName: string, tehsilName: string): TehsilRecord => {
    const cleanDist = districtName.trim();
    const cleanTeh = tehsilName.trim();

    // Check / Insert district
    const district = locationDb.insertDistrict(cleanDist);
    
    const stored = localStorage.getItem('mali_samaj_tehsils') || JSON.stringify(DEFAULT_TEHSILS);
    let allTehsils: TehsilRecord[] = [];
    try {
      allTehsils = JSON.parse(stored);
    } catch {
      allTehsils = DEFAULT_TEHSILS;
    }

    const existing = allTehsils.find(t => t.districtId === district.id && t.name.toLowerCase() === cleanTeh.toLowerCase());
    if (existing) return existing;

    const newTeh: TehsilRecord = {
      id: `teh-${district.id.replace('dist-', '')}-${Date.now()}`,
      districtId: district.id,
      name: cleanTeh
    };

    allTehsils.push(newTeh);
    localStorage.setItem('mali_samaj_tehsils', JSON.stringify(allTehsils));
    return newTeh;
  }
};
