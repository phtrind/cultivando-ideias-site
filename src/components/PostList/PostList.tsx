// import React from "react";

import Post from "../../models/Post";

import PostSummary from "./PostSummary";

export default function PostList(posts: Post[]) {
  return posts.map((post) => PostSummary(post));
}
