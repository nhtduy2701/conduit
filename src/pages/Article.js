import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../services/Api";
import { useAuth } from "../services/AuthContext";
import CommentList from "../components/CommentList";
import ArticleMeta from "../components/ArticleMeta";
import ArticleTags from "../components/ArticleTags";

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const { loggedIn, user } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await getArticle(slug);
      setArticle(response.article);
    };

    fetchArticle();
  }, [slug]);

  return (
    <>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>
              <ArticleMeta
                slug={slug}
                article={article}
                loggedIn={loggedIn}
                user={user}
              />
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                {article.body.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <ArticleTags article={article} />
              </div>
            </div>
            <hr />

            <div className="article-actions">
              <ArticleMeta
                slug={slug}
                article={article}
                loggedIn={loggedIn}
                user={user}
              />
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {loggedIn ? (
                  <>
                    <CommentList user={user} slug={slug} />
                  </>
                ) : (
                  <>
                    <p>
                      <Link to="/login">Sign in</Link> or{" "}
                      <Link to="/register">Sign up</Link> to add comments on
                      this article.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;