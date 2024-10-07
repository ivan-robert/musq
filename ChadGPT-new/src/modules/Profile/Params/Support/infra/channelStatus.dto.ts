import { MessageDTO } from "#modules/Profile/Params/Support/infra/message.dto";

export type ChannelStatusDTO = {
  lastMessage: MessageDTO;
  unreadMessagesCount: number;
};
