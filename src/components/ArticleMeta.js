import { Link } from "react-router-dom";
import FollowAuthor from "./FollowAuthorButton";
import FavoriteArticle from "./FavoriteArticleButton";
import DeleteArticle from "./DeleteArticleButton";
import EditArticle from "./EditArticleButton";

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
      <FollowAuthor user={user} loggedIn={loggedIn} author={article.author} />
      &nbsp;
      <FavoriteArticle user={user} loggedIn={loggedIn} article={article} />
      &nbsp;
      <DeleteArticle
        slug={slug}
        user={user}
        loggedIn={loggedIn}
        article={article}
      />
      &nbsp;
      <EditArticle
        slug={slug}
        user={user}
        loggedIn={loggedIn}
        article={article}
      />
    </div>
  );
};

export default ArticleMeta;
