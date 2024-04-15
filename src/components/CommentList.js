import { useState, useEffect } from "react";
import { getCommentsFromArticle } from "../services/Api";
import { Link } from "react-router-dom";
import DeleteComment from "./DeleteComment";
import CommentForm from "../components/CommentForm";

const CommentList = ({ slug, user }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsFromArticle(slug);
        setComments(response.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [slug]);

  const updateCommentsList = async () => {
    try {
      const response = await getCommentsFromArticle(slug);
      setComments(response.comments);
    } catch (error) {
      console.error("Error updating comments list:", error);
    }
  };

  return (
    <>
      <CommentForm
        user={user}
        slug={slug}
        updateCommentsList={updateCommentsList}
      />
      {comments.map((comment) => (
        <div className="card" key={comment.id}>
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              <img
                src={comment.author.image}
                className="comment-author-img"
                alt={comment.author.username}
              />
            </Link>
            &nbsp;
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              {comment.author.username}
            </Link>
            <time className="date-posted" dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toDateString()}
            </time>
            <DeleteComment
              slug={slug}
              commentId={comment.id}
              updateCommentsList={updateCommentsList}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
