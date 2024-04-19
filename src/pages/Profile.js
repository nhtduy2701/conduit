import ArticlesToggle from "../components/ArticlesToggle";
import ArticleList from "../components/ArticleList";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../services/AuthContext";
import { getProfile } from "../services/Api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const [requestType, setRequestType] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { loggedIn, user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const { data, isError } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    retry: 0,
  });

  const handleFavoriteArticlesClick = () => {
    setRequestType(true);
    setCurrentPage(1);
    localStorage.setItem("requestType", true);
  };

  const handleMyProfileClick = () => {
    setRequestType(false);
    setCurrentPage(1);
    localStorage.getItem("requestType", false);
  };

  useEffect(() => {
    if (isError) navigate("*");
  }, [isError, navigate]);

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
                {requestType === true && (
                  <ArticleList
                    favorited={username}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    loggedIn={loggedIn}
                  />
                )}
                {requestType === false && (
                  <ArticleList
                    author={username}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    loggedIn={loggedIn}
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
