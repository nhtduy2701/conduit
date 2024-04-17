import { Link } from "react-router-dom";
const ArticlesToggle = ({
  profile,
  handleMyProfileClick,
  handleFavoriteArticlesClick,
  requestType,
}) => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={!requestType ? "nav-link active" : "nav-link"}
            to={`/profile/${profile.username}`}
            onClick={handleMyProfileClick}
          >
            My Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={requestType ? "nav-link active" : "nav-link"}
            to={`/profile/${profile.username}/favorites`}
            onClick={handleFavoriteArticlesClick}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ArticlesToggle;
