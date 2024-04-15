import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import FavoriteButton from "./FavoriteArticle";
import DeleteButton from "./DeleteArticle";

const ArticleMeta = ({ article, loggedIn, user, slug }) => {
  return (
    <div className="article-meta">
      <Link to={`/${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>
      <div className="info">
        <Link to={`/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <time className="date" dateTime={article.createdAt}>
          {new Date(article.createdAt).toDateString()}
        </time>
      </div>
      <FollowButton user={user} loggedIn={loggedIn} author={article.author} />
      &nbsp;
      <FavoriteButton
        loggedIn={loggedIn}
        article={article}
        type="Favorite"
        showParentheses={true}
      />
      &nbsp;
      <DeleteButton
        slug={slug}
        user={user}
        loggedIn={loggedIn}
        article={article}
      />
      &nbsp;
      {loggedIn && user.username === article.author.username && (
        <Link to={`/editor/${slug}`}>
          <button className="btn btn-sm btn-outline-warning">
            <i className="ion-edit"></i> Edit Article
          </button>
        </Link>
      )}
    </div>
  );
};

export default ArticleMeta;
