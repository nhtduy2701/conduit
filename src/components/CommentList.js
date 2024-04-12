import { useState, useEffect } from "react";
import { getCommentsFromArticle } from "../services/Api";
import { Link } from "react-router-dom";
import DeleteComment from "./DeleteCommentButton";
import CommentForm from "../components/CommentForm";

const Comments = ({ slug, user }) => {
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

  return (
    <>
      <CommentForm user={user} slug={slug} />
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
            <DeleteComment slug={slug} commentId={comment.id} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
