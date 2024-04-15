import { useState, useEffect } from "react";
import { listArticles } from "../services/Api";
import ArticlePreview from "./ArticlePreview";
import { Link } from "react-router-dom";

const ArticleList = ({
  favorited,
  username,
  currentTag,
  currentPage,
  setCurrentPage,
  loggedIn,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (currentTag) {
          response = await listArticles(
            currentTag,
            null,
            null,
            10,
            (currentPage - 1) * 10
          );
        } else if (username) {
          response = await listArticles(
            null,
            username,
            null,
            10,
            (currentPage - 1) * 10
          );
        } else if (favorited) {
          response = await listArticles(
            null,
            null,
            favorited,
            10,
            (currentPage - 1) * 10
          );
        } else {
          response = await listArticles(
            null,
            null,
            null,
            10,
            (currentPage - 1) * 10
          );
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
  }, [currentPage, currentTag, username, favorited]);

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
  );
};

export default ArticleList;
