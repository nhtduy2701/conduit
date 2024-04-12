import { useState } from "react";
import { favoriteArticle, unfavoriteArticle } from "../services/Api";
import { Link } from "react-router-dom";

const FavoriteArticle = ({ article, user, loggedIn }) => {
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
      {loggedIn && user.username === article.author.username ? (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleFavorite}
        >
          <i className="ion-heart" />
          &nbsp; Favorite Article{" "}
          <span className="counter">({favoritesCount})</span>
        </button>
      ) : (
        <Link to="/register">
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp; Favorite Article{" "}
            <span className="counter">({favoritesCount})</span>
          </button>
        </Link>
      )}
    </>
  );
};

export default FavoriteArticle;
