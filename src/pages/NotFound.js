import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container page">
      <div className="not-found">
        <h1>404 Not Found</h1>
        <Link to="/">Go to home page</Link>
      </div>
    </div>
  );
};

export default NotFound;
