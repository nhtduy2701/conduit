import ArticlesToggle from "../components/ArticlesToggle";
import ArticleList from "../components/ArticleList";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../services/AuthContext";
import { getProfile } from "../services/Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loggedIn, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getProfile(username);
      setProfile(response.profile);
    };

    fetchUserInfo();
  }, [username]);

  return (
    <>
      {profile && (
        <div className="profile-page">
          <UserInfo profile={profile} loggedIn={loggedIn} user={user} />
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <ArticlesToggle profile={profile} active="myArticles" />
                <ArticleList
                  username={username}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
