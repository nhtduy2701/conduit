import { deleteArticle } from "../services/Api";
import { useNavigate } from "react-router-dom";

const DeleteArticle = ({ article, user, loggedIn, slug }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteArticle(slug);
      navigate("/");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <>
      {loggedIn && user.username === article.author.username && (
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleDelete}
        >
          <i className="ion-trash-a"></i>
          &nbsp; Delete Article
        </button>
      )}
    </>
  );
};

export default DeleteArticle;
