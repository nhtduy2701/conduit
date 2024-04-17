import { useState } from "react";
import { addComment } from "../services/Api";

const CommentForm = ({ user, slug, updateCommentsList }) => {
  const [commentData, setCommentData] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(slug, commentData);
    updateCommentsList();
    setCommentData({
      body: "",
    });
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
          name="body"
          value={commentData.body}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={user.image}
          className="comment-author-img"
          alt={user.username}
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
