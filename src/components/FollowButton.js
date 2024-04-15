import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../services/Api";

const FollowAuthor = ({ author, user, loggedIn }) => {
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    const isFollowingStored =
      localStorage.getItem("following_" + author.username) === "true";
    setIsFollowing(isFollowingStored);
  }, [author.username]);

  const handleFollow = async () => {
    try {
      await followUser(author.username);
      setIsFollowing(true);
      localStorage.setItem("following_" + author.username, "true");
    } catch (error) {
      console.error("Error following author:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(author.username);
      setIsFollowing(false);
      localStorage.removeItem("following_" + author.username);
    } catch (error) {
      console.error("Error unfollowing author:", error);
    }
  };

  return (
    <>
      {loggedIn ? (
        <>
          {user.username !== author.username && (
            <>
              {isFollowing ? (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={handleUnfollow}
                >
                  <i className="ion-plus-round" />
                  &nbsp; Unfollow {author.username}
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={handleFollow}
                >
                  <i className="ion-plus-round" />
                  &nbsp; Follow {author.username}
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <Link to="/register">
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            &nbsp; Follow {author.username}
          </button>
        </Link>
      )}
    </>
  );
};

export default FollowAuthor;
