import { Link } from "react-router-dom";

const FeedToggle = ({ currentTag, handleFeedClick, loggedIn }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={!currentTag ? "nav-link active" : "nav-link"}
            to="/"
            onClick={handleFeedClick}
          >
            Global Feed
          </Link>
        </li>
        {currentTag && (
          <li className="nav-item">
            <Link
              className={currentTag ? "nav-link active" : "nav-link"}
              to={`/${currentTag}`}
            >
              <i className="ion-pound"></i>&nbsp; {currentTag}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
