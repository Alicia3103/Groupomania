import React from "react";



const Post = ({ post }) => {

  return (
    <div className="post">
        {console.log(post)}
      <h2>{post.Title}</h2>
      <img
        src="https://picsum.photos/1500/400"
        className="post-img"
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
