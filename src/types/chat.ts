export interface MerchConcept {
  id: string;
  productName: string;
  type: 'Heavyweight Hoodie' | 'Graphic Tee' | 'Archival Poster' | 'Canvas Tote' | 'Embroidered Cap' | 'Vinyl Art Print';
  demoPriceInr: number;
  designDescription: string;
  colorPalette: { name: string; hex: string }[];
  vibeInspiration: string;
  curatorNote: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'muse';
  text: string;
  timestamp: string;
  concepts?: MerchConcept[];
  quickReplies?: string[];
}
