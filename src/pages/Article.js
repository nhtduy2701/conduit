import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getArticle } from "../services/Api";
import { useAuth } from "../services/AuthContext";
import CommentList from "../components/CommentList";
import ArticleMeta from "../components/ArticleMeta";
import ArticleTags from "../components/ArticleTags";
import { useQuery } from "@tanstack/react-query";

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { loggedIn, user } = useAuth();

  const { data, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(slug),
  });

  useEffect(() => {
    if (isError) {
      navigate("*");
    }
  }, [isError, navigate]);

  return (
    <>
      {data && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{data.title}</h1>
              <ArticleMeta
                slug={slug}
                article={data}
                loggedIn={loggedIn}
                user={user}
              />
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                {data.body.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <ArticleTags article={data} />
              </div>
            </div>
            <hr />

            <div className="article-actions">
              <ArticleMeta
                slug={slug}
                article={data}
                loggedIn={loggedIn}
                user={user}
              />
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {loggedIn ? (
                  <>
                    <CommentList user={user} slug={slug} loggedIn={loggedIn} />
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
