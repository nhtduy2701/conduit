import { deleteComment } from "../services/Api";
import { useNavigate } from "react-router-dom";

const DeleteComment = ({ slug, commentId }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteComment(slug, commentId);
    navigate("/");
  };

  return (
    <span className="mod-options" onClick={handleDelete}>
      <i className="ion-trash-a"></i>
    </span>
  );
};

export default DeleteComment;
