import { deleteComment } from "../services/Api";

const DeleteComment = ({
  slug,
  comment,
  user,
  updateCommentsList,
  loggedIn,
}) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteComment(slug, comment.id);
    updateCommentsList();
  };

  return (
    <>
      {loggedIn && user.username === comment.author.username && (
        <span className="mod-options" onClick={handleDelete}>
          <i className="ion-trash-a"></i>
        </span>
      )}
    </>
  );
};

export default DeleteComment;
