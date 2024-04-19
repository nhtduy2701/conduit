import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/Api";
import ArticlePreview from "./ArticlePreview";
import { Link } from "react-router-dom";

const ArticleList = ({
  requestType,
  favorited,
  author,
  currentTag,
  currentPage,
  setCurrentPage,
  loggedIn,
  limit = 10,
  offset = (currentPage - 1) * limit,
}) => {
  const { data, isFetching } = useQuery({
    queryKey: [
      "articles",
      requestType,
      currentTag,
      author,
      favorited,
      currentPage,
    ],
    queryFn: () =>
      getArticles(requestType, currentTag, author, favorited, limit, offset),
    refetchOnWindowFocus: false,
  });

  if (isFetching)
    return (
      <div className="article-preview">
        <p>Loading Articles...</p>
      </div>
    );

  const { articles, articlesCount } = data;

  if (!articles || articles.length === 0)
    return (
      <div className="article-preview">
        <p>No articles are here... yet.</p>
      </div>
    );

  const totalPages = Math.ceil(articlesCount / limit);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
