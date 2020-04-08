import React, { FunctionComponent } from "react";

import PostSummaryModel from "../../models/PostSummary";

import PostSummary from "./PostSummary";

type PostListProps = {
  posts: PostSummaryModel[];
};

const PostList: FunctionComponent<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostSummary post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
