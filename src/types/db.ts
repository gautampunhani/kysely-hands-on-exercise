
export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};

export interface Database {
  users: User;
  posts: Post;
}
