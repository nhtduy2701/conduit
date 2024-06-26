import ArticleList from "../components/ArticleList";
import TagList from "../components/TagList";
import { useState } from "react";
import FeedToggle from "../components/FeedToggle";
import { useAuth } from "../services/AuthContext";

const Home = () => {
  const { loggedIn } = useAuth();
  const [currentTag, setCurrentTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestType, setRequestType] = useState(null);

  const handleGlobalFeedClick = () => {
    setCurrentTag(null);
    setRequestType(null);
    setCurrentPage(1);
  };

  const handleYourFeedClick = () => {
    setCurrentTag(null);
    setRequestType("feed");
    setCurrentPage(1);
  };

  const handleTagClick = (currentTag) => {
    setCurrentTag(currentTag);
    setRequestType(null);
    setCurrentPage(1);
  };

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
            <FeedToggle
              loggedIn={loggedIn}
              currentTag={currentTag}
              handleGlobalFeedClick={handleGlobalFeedClick}
              handleYourFeedClick={handleYourFeedClick}
              requestType={requestType}
            />
            <ArticleList
              requestType={requestType}
              currentTag={currentTag}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              loggedIn={loggedIn}
            />
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <TagList handleTagClick={handleTagClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
