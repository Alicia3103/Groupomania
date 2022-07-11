import React from "react";



const Post = ({ post }) => {

  return (
    <div className="post">
      <h2>{post.Title}</h2>
      <img
        src={post.ImageUrl}
        className="post-img"
        id={post.Id}
        height={75}
        alt="img-post"
      />
    <p>{post.Content}</p>
      <div className="author">
        <h5>{post.UserId}</h5>
      </div>
    </div>
  );
};

export default Post;
