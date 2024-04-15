import { useState } from "react";
import { favoriteArticle, unfavoriteArticle } from "../services/Api";
import { Link } from "react-router-dom";

const FavoriteButton = ({ article, loggedIn, type, showParentheses }) => {
  const [isFavorited, setIsFavorited] = useState(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

  const handleFavorite = async () => {
    if (isFavorited) {
      await unfavoriteArticle(article.slug);
      setFavoritesCount((prevCount) => prevCount - 1);
      setIsFavorited(false);
    } else {
      await favoriteArticle(article.slug);
      setFavoritesCount((prevCount) => prevCount + 1);
      setIsFavorited(true);
    }
  };

  return (
    <>
      {loggedIn ? (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleFavorite}
        >
          <i className="ion-heart" />
          &nbsp;{type === "Favorite" ? " Favorite Article" : ""}{" "}
          {showParentheses ? (
            `(${favoritesCount})`
          ) : (
            <span className="counter">{favoritesCount}</span>
          )}
        </button>
      ) : (
        <Link to="/register">
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp;{type === "Favorite" ? " Favorite Article" : ""}{" "}
            {showParentheses ? (
              `(${favoritesCount})`
            ) : (
              <span className="counter">{favoritesCount}</span>
            )}
          </button>
        </Link>
      )}
    </>
  );
};

export default FavoriteButton;
