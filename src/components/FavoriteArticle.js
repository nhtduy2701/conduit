import { Link } from "react-router-dom";

const FavoriteArticle = ({ article, user, loggedIn }) => {
  const handleFavorite = async () => {};

  return (
    <>
      {loggedIn && user.username === article.author.username ? (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleFavorite}
        >
          <i className="ion-heart" />
          &nbsp; Favorite Article{" "}
          <span className="counter">({article.favoritesCount})</span>
        </button>
      ) : (
        <Link to="/register">
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp; Favorite Article{" "}
            <span className="counter">({article.favoritesCount})</span>
          </button>
        </Link>
      )}
    </>
  );
};

export default FavoriteArticle;
