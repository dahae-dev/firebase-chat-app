import type { Timestamp } from 'firebase/firestore';

export interface IUser {
  id?: string;
  name?: string;
  thumbnail?: string;
}

export interface IMessage {
  id?: string;
  type?: 'text' | 'file';
  content?: string;
  status?: 'sent' | 'received';
  createdAt?: Timestamp;
}

export interface IRoom {
  id?: string;
  displayName?: string;
  thumbnailUrl?: string;
  unreadCount?: number;
  messages?: IMessage[];
}