import Author from "./Author";
import Content from "./Content";

export default interface Post {
  id: string;
  author: Author;
  content: Content;
  datetime: Date;
}
