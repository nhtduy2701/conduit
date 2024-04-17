import { Link } from "react-router-dom";

const FeedToggle = ({
  currentTag,
  handleGlobalFeedClick,
  handleYourFeedClick,
  loggedIn,
  requestType,
}) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {loggedIn && (
          <li className="nav-item">
            <Link
              className={
                requestType && !currentTag ? "nav-link active" : "nav-link"
              }
              to="/"
              onClick={handleYourFeedClick}
            >
              Your Feed
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link
            className={
              !currentTag && !requestType ? "nav-link active" : "nav-link"
            }
            to="/"
            onClick={handleGlobalFeedClick}
          >
            Global Feed
          </Link>
        </li>
        {currentTag && (
          <li className="nav-item">
            <Link
              className={
                currentTag && !requestType ? "nav-link active" : "nav-link"
              }
              to="/"
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
