import { Link } from "react-router-dom";

const FeedToggle = ({ currentTag }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className={!currentTag ? "nav-link active" : "nav-link"} to="/">
            Global Feed
          </Link>
        </li>
        {currentTag && (
          <li className="nav-item">
            <Link className={currentTag ? "nav-link active" : "nav-link"}>
              <i className="ion-pound"></i>&nbsp; {currentTag}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
