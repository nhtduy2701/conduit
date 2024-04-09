import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticlesByTag = ({ tag }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchArticlesByTag = async () => {
      try {
        setLoading(true);
        let apiUrl = `https://api.realworld.io/api/articles?limit=${perPage}&offset=${
          (page - 1) * perPage
        }&tag=${tag}`;

        const response = await axios.get(apiUrl);

        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.articlesCount / perPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticlesByTag();
  }, [page, tag]);

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
                      <Link to={`/${article.author.username}`}>
                        <img
                          src={article.author.image}
                          alt={article.author.username}
                        />
                      </Link>
                      <div className="info">
                        <Link
                          to={`/${article.author.username}`}
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
                          to={`/?${tag}`}
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

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let apiUrl = `https://api.realworld.io/api/articles?limit=${perPage}&offset=${
          (page - 1) * perPage
        }`;

        const response = await axios.get(apiUrl);
        setArticles(response.data.articles);
        setTotalPages(Math.ceil(response.data.articlesCount / perPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

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
                      <Link to={`/${article.author.username}`}>
                        <img
                          src={article.author.image}
                          alt={article.author.username}
                        />
                      </Link>
                      <div className="info">
                        <Link
                          to={`/${article.author.username}`}
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

const Home = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("https://api.realworld.io/api/tags");
        setTags(response.data.tags);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tags:", error);
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setIsActive(false);
  };
  const handleFeedClick = () => {
    setSelectedTag(null);
    setIsActive(true);
  };

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {selectedTag ? (
              <>
                <div className="feed-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={handleFeedClick}
                      >
                        Global Feed
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${isActive ? "" : "active"}`}
                        onClick={() => setIsActive(false)}
                      >
                        <i className="ion-pound"></i>
                        &nbsp; {selectedTag}
                      </Link>
                    </li>
                  </ul>
                </div>
                <ArticlesByTag tag={selectedTag} />
              </>
            ) : (
              <>
                <div className="feed-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${isActive ? "active" : ""}`}
                        to="/"
                        onClick={setIsActive}
                      >
                        Global Feed
                      </Link>
                    </li>
                  </ul>
                </div>
                <Articles />
              </>
            )}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {loading ? (
                <div className="tag-list">
                  <p>Loading Tags...</p>
                </div>
              ) : (
                <div className="tag-list">
                  {tags.length > 0 ? (
                    <>
                      {tags.map((tag) => (
                        <Link
                          key={tag}
                          className={`tag-pill tag-default ${
                            tag === selectedTag ? "active" : ""
                          }`}
                          to="/"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <p>No tags are here... yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
