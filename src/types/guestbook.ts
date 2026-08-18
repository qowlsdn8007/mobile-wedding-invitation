export interface GuestbookEntry {
  id: string;
  sender: string;
  message: string;
  createdAt: number;
  date: string;
  /** SHA-256 hex 해시 */
  password: string;
}
