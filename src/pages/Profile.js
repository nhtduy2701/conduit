import ArticlesToggle from "../components/ArticlesToggle";
import ArticleList from "../components/ArticleList";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../services/AuthContext";
import { getProfile } from "../services/Api";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const [requestType, setRequestType] = useState(() => {
    return localStorage.getItem("requestType") || null;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { loggedIn, user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isError } = useQuery({
    queryKey: ["profile", username, requestType],
    queryFn: () => getProfile(username, requestType),
  });

  const handleFavoriteArticlesClick = () => {
    setRequestType("favorites");
    setCurrentPage(1);
    localStorage.setItem("requestType", "favorites");
  };

  const handleMyProfileClick = () => {
    setRequestType(null);
    setCurrentPage(1);
    localStorage.removeItem("requestType");
  };

  useEffect(() => {
    if (location.pathname === `/profile/${username}`) {
      setRequestType(null);
      localStorage.removeItem("requestType");
    } else if (
      location.pathname === `/profile/${username}/favorites` &&
      !requestType
    ) {
      setRequestType("favorites");
      localStorage.setItem("requestType", "favorites");
    }

    if (isError) {
      navigate("*");
    }
  }, [isError, navigate, location.pathname, username, requestType]);

  return (
    <>
      {data && (
        <div className="profile-page">
          <UserInfo profile={data} loggedIn={loggedIn} user={user} />
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <ArticlesToggle
                  profile={data}
                  handleFavoriteArticlesClick={handleFavoriteArticlesClick}
                  handleMyProfileClick={handleMyProfileClick}
                  requestType={requestType}
                />
                {requestType ? (
                  <ArticleList
                    favorited={username}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                ) : (
                  <ArticleList
                    author={username}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
