// Gotra Database Table Configuration & Dynamic Persistence
export interface GotraRecord {
  id: string;
  name: string; // Gotra name in English
  hindiName?: string; // Gotra name in Hindi
  isPopular?: boolean;
  isRecentlyUsed?: boolean;
  isCustom?: boolean;
}

const DEFAULT_GOTRAS: GotraRecord[] = [
  { id: "g-1", name: "Gehlot", hindiName: "गहलोत", isPopular: true },
  { id: "g-2", name: "Kachhawaha", hindiName: "कछवाहा", isPopular: true },
  { id: "g-3", name: "Saini", hindiName: "सैनी", isPopular: true },
  { id: "g-4", name: "Solanki", hindiName: "सोलंकी", isPopular: true },
  { id: "g-5", name: "Tak", hindiName: "टांक", isPopular: true },
  { id: "g-6", name: "Tanwar", hindiName: "तंवर", isPopular: true },
  { id: "g-7", name: "Sankhla", hindiName: "सांखला", isPopular: false },
  { id: "g-8", name: "Panwar", hindiName: "पंवार", isPopular: false },
  { id: "g-9", name: "Deora", hindiName: "देवड़ा", isPopular: false },
  { id: "g-10", name: "Singhal", hindiName: "सिंघल", isPopular: false },
  { id: "g-11", name: "Parihar", hindiName: "पड़िहार", isPopular: false },
  { id: "g-12", name: "Chauhan", hindiName: "चौहान", isPopular: false },
  { id: "g-13", name: "Borana", hindiName: "बोराणा", isPopular: false },
  { id: "g-14", name: "Rathore", hindiName: "राठौड़", isPopular: false },
  { id: "g-15", name: "Bhati", hindiName: "भाटी", isPopular: false },
  { id: "g-16", name: "Khichi", hindiName: "खींची", isPopular: false },
  { id: "g-17", name: "Goyal", hindiName: "गोयल", isPopular: false }
];

export const gotraDb = {
  // Simulate loading from a dedicated database table (backed by localStorage)
  getAll: (): GotraRecord[] => {
    const stored = localStorage.getItem('mali_samaj_gotras');
    if (!stored) {
      localStorage.setItem('mali_samaj_gotras', JSON.stringify(DEFAULT_GOTRAS));
      return DEFAULT_GOTRAS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_GOTRAS;
    }
  },

  // Save a new custom gotra, simulating INSERT INTO gotras TABLE
  insert: (name: string, hindiName?: string): GotraRecord => {
    if (!name || !name.trim()) {
      return DEFAULT_GOTRAS[0];
    }
    const list = gotraDb.getAll();
    const cleanName = name.trim();
    // Prevent duplicate entries (case-insensitive)
    const existing = list.find(g => g.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) {
      return existing;
    }

    const newGotra: GotraRecord = {
      id: `g-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: cleanName,
      hindiName: hindiName || cleanName,
      isPopular: false,
      isRecentlyUsed: true,
      isCustom: true
    };

    const updated = [...list, newGotra];
    localStorage.setItem('mali_samaj_gotras', JSON.stringify(updated));
    return newGotra;
  },

  // Track recently used gotras for UI list assistance
  markRecentlyUsed: (name: string) => {
    const list = gotraDb.getAll();
    const cleanName = name.trim();
    const updated = list.map(g => {
      if (g.name.toLowerCase() === cleanName.toLowerCase()) {
        return { ...g, isRecentlyUsed: true };
      }
      return g;
    });
    localStorage.setItem('mali_samaj_gotras', JSON.stringify(updated));
  }
};
