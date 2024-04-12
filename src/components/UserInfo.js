import EditProfile from "./EditProfileButton";
import FollowAuthor from "./FollowAuthorButton";

const UserInfo = ({ profile, user, loggedIn }) => {
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img
              src={profile.image}
              alt={profile.username}
              className="user-img"
            />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            <FollowAuthor user={user} loggedIn={loggedIn} author={profile} />
            <EditProfile user={user} loggedIn={loggedIn} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
