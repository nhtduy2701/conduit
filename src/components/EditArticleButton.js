import { Link } from "react-router-dom";
const EditArticle = ({ loggedIn, user, article, slug }) => {
  return (
    <>
      {loggedIn && user.username === article.author.username && (
        <Link to={`/editor/${slug}`}>
          <button className="btn btn-sm btn-outline-warning">
            <i className="ion-edit"></i> Edit Article
          </button>
        </Link>
      )}
    </>
  );
};

export default EditArticle;
