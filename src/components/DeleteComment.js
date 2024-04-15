import { deleteComment } from "../services/Api";

const DeleteComment = ({ slug, commentId, updateCommentsList }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteComment(slug, commentId);
    updateCommentsList();
  };

  return (
    <span className="mod-options" onClick={handleDelete}>
      <i className="ion-trash-a"></i>
    </span>
  );
};

export default DeleteComment;
