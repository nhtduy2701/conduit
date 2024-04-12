import { Link } from "react-router-dom";

const EditProfile = ({ loggedIn, profile, user }) => {
  return (
    <>
      {loggedIn && profile.username === user.username && (
        <Link to="/settings">
          <button className="btn btn-sm btn-outline-secondary action-btn">
            <i className="ion-gear-a" />
            &nbsp; Edit Profile Settings
          </button>
        </Link>
      )}
    </>
  );
};

export default EditProfile;
