import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/Api";
import { Link } from "react-router-dom";
import DeleteComment from "./DeleteComment";
import CommentForm from "../components/CommentForm";

const CommentList = ({ slug, user, loggedIn }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getComments(slug),
  });

  if (isLoading) return <p>Loading comments...</p>;

  const { comments } = data;

  const updateCommentsList = () => {
    refetch();
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
              user={user}
              comment={comment}
              loggedIn={loggedIn}
              updateCommentsList={updateCommentsList}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
