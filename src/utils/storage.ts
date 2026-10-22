import type { WishlistItem } from '../types/merch';

const WISHLIST_KEY = 'vybe_user_wishlist_v1';
const ARTISTS_KEY = 'vybe_user_artists_v1';

export function getStoredArtists(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ARTISTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredArtists(artists: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ARTISTS_KEY, JSON.stringify(artists));
    window.dispatchEvent(new Event('vybe-artists-updated'));
  } catch (err) {
    console.warn('Could not save artists to localStorage', err);
  }
}

export function getStoredWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('vybe-wishlist-updated'));
  } catch (err) {
    console.warn('Could not save to localStorage', err);
  }
}

export function addToWishlist(item: Omit<WishlistItem, 'dateAdded'>): WishlistItem[] {
  const current = getStoredWishlist();
  const exists = current.some((i) => i.id === item.id);
  if (exists) return current;

  const newItem: WishlistItem = {
    ...item,
    dateAdded: new Date().toISOString(),
  };

  const updated = [newItem, ...current];
  saveWishlist(updated);
  return updated;
}

export function removeFromWishlist(id: string): WishlistItem[] {
  const current = getStoredWishlist();
  const updated = current.filter((i) => i.id !== id);
  saveWishlist(updated);
  return updated;
}

export function isItemInWishlist(id: string): boolean {
  const current = getStoredWishlist();
  return current.some((i) => i.id === id);
}

export function clearWishlist(): void {
  saveWishlist([]);
}
