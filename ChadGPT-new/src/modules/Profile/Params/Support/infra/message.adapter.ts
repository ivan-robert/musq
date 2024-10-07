import { Message } from "#modules/Profile/Params/Support/domain/message.types";
import { MessageDTO } from "#modules/Profile/Params/Support/infra/message.dto";
import { timestampzToDate } from "#shared/utils/dateConverter";

export const adaptMessage = (
  message: MessageDTO,
  user_name: string
): Message => {
  const msg = {
    content: message.content,
    creationDate: timestampzToDate(message.created_at),
    userId: message.user_clerk_id,
    userName: user_name,
    messageId: message.message_id,
  };

  return msg;
};
