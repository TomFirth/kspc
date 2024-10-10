export interface RowType {
  uuid: string;
  username: string;
  key: string;
  read: boolean;
  createdAt: Date;
}

export interface UserType {
  uuid: string;
  username: string;
}

export interface MessageBubbleType {
  message: MessageType;
  fromUser: boolean;
}

interface MessageType {
  message: string;
  timestamp: string;
}