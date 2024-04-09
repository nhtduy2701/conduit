import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ArticlesByFavorited = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;
  let { username } = useParams();

  useEffect(() => {
    const fetchArticlesByFavorited = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles?author=${username}&limit=${perPage}&offset=${
            (page - 1) * perPage
          }&favorited=${username}`
        );
        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.articlesCount / perPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    if (username) {
      fetchArticlesByFavorited();
    }
  }, [username, page]);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="article-list">
        {loading ? (
          <div className="article-preview">
            <p>Loading Articles...</p>
          </div>
        ) : (
          <>
            {articles.length > 0 ? (
              <>
                {articles.map((article) => (
                  <div className="article-preview" key={article.slug}>
                    <div className="article-meta" key={article.author.username}>
                      <Link to={`/profile/${article.author.username}`}>
                        <img
                          src={article.author.image}
                          alt={article.author.username}
                        />
                      </Link>
                      <div className="info">
                        <Link
                          to={`/profile/${article.author.username}`}
                          className="author"
                        >
                          {article.author.username}
                        </Link>
                        <time className="date" dateTime={article.createdAt}>
                          {new Date(article.createdAt).toDateString()}
                        </time>
                      </div>
                      <Link to="/register">
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart"></i> {article.favoritesCount}
                        </button>
                      </Link>
                    </div>
                    <Link
                      to={`/article/${article.slug}`}
                      className="preview-link"
                    >
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                      <ul className="tag-list">
                        {article.tagList.map((tag) => (
                          <li
                            key={tag}
                            className="tag-default tag-pill tag-outline"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </div>
                ))}
                <nav>
                  <ul className="pagination">
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          pageNumber + 1 === page ? "active" : ""
                        }`}
                      >
                        <Link
                          to="/"
                          className="page-link"
                          onClick={() => onPageChange(pageNumber + 1)}
                        >
                          {pageNumber + 1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </>
            ) : (
              <div className="article-preview">
                <p>No articles are here... yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

const Favorite = () => {
  const [profile, setProfile] = useState(null);
  let { username } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/profiles/${username}`
        );
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [username]);

  return (
    <>
      {profile && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img
                    src={profile.image}
                    alt={profile.username}
                    className="user-img"
                  />
                  <h4>{profile.username}</h4>
                  <p>{profile.bio}</p>
                  <Link to="/register">
                    {" "}
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-plus-round" />
                      &nbsp; Follow {profile.username}
                    </button>
                  </Link>
                  {/* <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a" />
                    &nbsp; Edit Profile Settings
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link className="nav-link" to={`/${profile.username}`}>
                        My Articles
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        to={`/${profile.username}/favorites`}
                      >
                        Favorited Articles
                      </Link>
                    </li>
                  </ul>
                </div>
                <ArticlesByFavorited />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Favorite;
