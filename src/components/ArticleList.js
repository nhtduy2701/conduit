import { useState, useEffect } from "react";
import { getArticles } from "../services/Api";
import ArticlePreview from "./ArticlePreview";
import { Link } from "react-router-dom";

const ArticleList = ({
  requestType,
  favorited,
  username,
  currentTag,
  currentPage,
  setCurrentPage,
  loggedIn,
  limit = 10,
  offset = (currentPage - 1) * limit,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (currentTag) {
          response = await getArticles(
            null,
            currentTag,
            null,
            null,
            limit,
            offset
          );
        } else if (username) {
          response = await getArticles(
            null,
            null,
            username,
            null,
            limit,
            offset
          );
        } else if (favorited) {
          response = await getArticles(
            null,
            null,
            null,
            favorited,
            limit,
            offset
          );
        } else if (requestType) {
          response = await getArticles(
            requestType,
            null,
            null,
            null,
            limit,
            offset
          );
        } else {
          response = await getArticles(null, null, null, null, limit, offset);
        }
        setTotalPages(Math.ceil(response.articlesCount / 10));
        setArticles(response.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [
    limit,
    offset,
    currentPage,
    currentTag,
    username,
    favorited,
    requestType,
  ]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return (
      <div className="article-preview">
        <p>Loading Articles...</p>
      </div>
    );

  if (articles.length === 0)
    return (
      <div className="article-preview">
        <p>No articles are here... yet.</p>
      </div>
    );

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <p>Loading Articles...</p>
        </div>
      ) : (
        <>
          {articles.map((article) => (
            <ArticlePreview
              key={article.slug}
              article={article}
              loggedIn={loggedIn}
            />
          ))}
          <nav>
            <ul className="pagination">
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${
                    pageNumber + 1 === currentPage ? "active" : ""
                  }`}
                >
                  <Link
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
      )}
    </>
  );
};

export default ArticleList;
