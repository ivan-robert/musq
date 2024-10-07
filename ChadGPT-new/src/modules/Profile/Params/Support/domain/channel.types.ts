import { Message } from "#modules/Profile/Params/Support/domain/message.types";

export type ChannelMode = "support" | "chat";

export type Channel = {
  id: string;
  createdAt: Date;
  mode: ChannelMode;
  name: string;
  creatorId: string;
  participants_names: string[];
};

export type ChannelStatus = {
  lastMessage: Message;
  unreadMessagesCount: number;
};
