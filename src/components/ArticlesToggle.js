import { Link } from "react-router-dom";
const ArticlesToggle = ({ profile, active }) => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={`nav-link ${active === "myArticles" ? "active" : ""}`}
            to={`/${profile.username}`}
          >
            My Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              active === "favoritedArticles" ? "active" : ""
            }`}
            to={`/${profile.username}/favorites`}
          >
            Favorited Articles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ArticlesToggle;
