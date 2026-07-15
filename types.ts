export interface NavItem {
  label: string;
  path: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface Education {
  degree: string;
  institution: string;
  year?: string;
  description?: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}