// import React from "react";

import PostSummaryModel from "../../models/PostSummary";

import PostSummary from "./PostSummary";

export default function PostList(posts: PostSummaryModel[]) {
  return posts.map((post) => PostSummary(post));
}
