import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthUser from "./AuthUser";

const Comments = () => {
  const [comments, setComments] = useState([]);
  let { slug } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}/comments`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [slug]);

  return (
    <>
      {comments.map((comment) => (
        <div className="card">
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              <img
                src={comment.author.image}
                className="comment-author-img"
                alt={comment.author.username}
              />
            </Link>
            &nbsp;
            <Link
              to={`/profile/${comment.author.username}`}
              className="comment-author"
            >
              {comment.authtor.username}
            </Link>
            <time className="date" dateTime={comment.createdAt}>
              {new Date(comment.createdAt).toDateString()}
            </time>
            <span className="mod-options">
              <i className="ion-trash-a"></i>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

const ArticlePage = () => {
  const { loggedIn, user } = AuthUser();
  const [article, setArticle] = useState(null);
  let { slug } = useParams();

  useEffect(() => {
    const fetchArticlePage = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}`
        );
        setArticle(response.data.article);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticlePage();
  }, [slug]);

  return (
    <>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>
              <div className="article-meta">
                <Link to={`/${article.author.username}`}>
                  <img
                    src={article.author.image}
                    alt={article.author.username}
                  />
                </Link>
                <div className="info">
                  <Link to={`/${article.author.username}`} className="author">
                    {article.author.username}
                  </Link>
                  <time className="date" dateTime={article.createdAt}>
                    {new Date(article.createdAt).toDateString()}
                  </time>
                </div>
                <Link to="/resgiter">
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round" />
                    &nbsp; Follow {article.author.username}{" "}
                  </button>
                </Link>
                &nbsp;
                <Link to="/register">
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart" />
                    &nbsp; Favorite Article{" "}
                    <span className="counter">({article.favoritesCount})</span>
                  </button>
                </Link>
                &nbsp;
                {loggedIn && (
                  <>
                    <button className="btn btn-sm btn-outline-warning">
                      <i className="ion-edit"></i>
                      &nbsp; Edit Article
                    </button>
                    &nbsp;
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="ion-trash-a"></i>
                      &nbsp; Delete Article
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                {article.body.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <ul className="tag-list">
                  {article.tagList.map((tag, index) => (
                    <li
                      key={index}
                      className="tag-default tag-pill tag-outline"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <Link to={`/${article.author.username}`}>
                  <img
                    src={article.author.image}
                    alt={article.author.username}
                  />
                </Link>
                <div className="info">
                  <Link to={`/${article.author.username}`} className="author">
                    {article.author.username}
                  </Link>
                  <time className="date" dateTime={article.createdAt}>
                    {new Date(article.createdAt).toDateString()}
                  </time>
                </div>
                <Link to="/register">
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {article.author.username}
                  </button>
                </Link>
                &nbsp;
                <Link to="/register">
                  <button className="btn btn-sm btn-outline-primary">
                    {" "}
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Article{" "}
                    <span className="counter">({article.favoritesCount})</span>
                  </button>
                </Link>
                &nbsp;
                {loggedIn && (
                  <>
                    <button className="btn btn-sm btn-outline-warning">
                      <i className="ion-edit"></i>
                      &nbsp; Edit Article
                    </button>
                    &nbsp;
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="ion-trash-a"></i>
                      &nbsp; Delete Article
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {loggedIn ? (
                  <>
                    <form className="card comment-form">
                      <div className="card-block">
                        <textarea
                          className="form-control"
                          placeholder="Write a comment..."
                          rows="3"
                        ></textarea>
                      </div>
                      <div className="card-footer">
                        <img
                          src={user.image}
                          className="comment-author-img"
                          alt={user.username}
                        />
                        <button className="btn btn-sm btn-primary">
                          Post Comment
                        </button>
                      </div>
                    </form>
                    <Comments />
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
export default ArticlePage;
