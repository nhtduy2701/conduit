import { Link } from "react-router-dom";
import ArticleTags from "./ArticleTags";
import FavoriteButton from "./FavoriteArticle";

const ArticlePreview = ({ article, loggedIn }) => {
  return (
    <>
      <div className="article-preview" key={article.slug}>
        <div className="article-meta">
          <Link to={`/profile/${article.author.username}`}>
            <img src={article.author.image} alt={article.author.username} />
          </Link>
          <div className="info">
            <Link to={`/profile/${article.author.username}`} className="author">
              {article.author.username}
            </Link>
            <time className="date" dateTime={article.createdAt}>
              {new Date(article.createdAt).toDateString()}
            </time>
          </div>
          <FavoriteButton loggedIn={loggedIn} article={article} />
        </div>
        <Link to={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <ArticleTags article={article} />
        </Link>
      </div>
    </>
  );
};

export default ArticlePreview;
