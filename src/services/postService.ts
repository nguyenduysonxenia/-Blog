export default interface TypePost {
  authors_id: number | string;
  categories_id: number | string;
  title: string;
  content: string;
  likes?: [number];
  views?: number;
  comments?: [number];
  actived?: boolean;
  getPostList(): [TypePost];
  findOnePost(): TypePost;
  createPost(): TypePost;
  updatePost(): TypePost;
  deletePost(): TypePost;
}
