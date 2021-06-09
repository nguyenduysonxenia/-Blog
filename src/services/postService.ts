export default interface TypePost {
  authors_id: string;
  categories_id: number | string;
  title: string;
  content: string;
  likes?: [number];
  views?: number;
  comments?: [number];
  deleted?: boolean;
  actived?: boolean;
  author:Object
  getPostList(): [TypePost];
  findOnePost(): TypePost;
  createPost(): TypePost;
  updatePost(): TypePost;
  deletePost(): TypePost;
}
