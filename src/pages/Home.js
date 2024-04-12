import ArticleList from "../components/ArticleList";
import TagList from "../components/TagList";
import { useState } from "react";
import FeedToggle from "../components/FeedToggle";
import { useAuth } from "../services/AuthContext";

const Home = () => {
  const { loggedIn, user } = useAuth();
  const [currentTag, setCurrentTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle currentTag={currentTag} />
            <ArticleList
              currentTag={currentTag}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              user={user}
              loggedIn={loggedIn}
            />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList
                currentPage={currentPage}
                setCurrentTag={setCurrentTag}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
