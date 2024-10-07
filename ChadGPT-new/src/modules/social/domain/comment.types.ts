export type BaseComment = {
  commentId: string;
  createdAt: Date;
  content: string;
  userId: string;
  postId: string;
  replyTo?: string;
};

export type RootComment = BaseComment & {
  replies: RootComment[];
};
