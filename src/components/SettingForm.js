import { useState } from "react";
import { useAuth } from "../services/AuthContext";
import Logout from "../components/Logout";

const SettingForm = () => {
  const [error, setError] = useState(null);
  const { updateSettings } = useAuth();
  const [profileData, setProfileData] = useState({
    image: "",
    username: "",
    bio: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(profileData);
      setError("Successful!");
    } catch (error) {
      setError("Failed!");
    }
  };

  return (
    <>
      <h1 className="text-xs-center">Your Settings</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              name="image"
              value={profileData.image}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              name="username"
              value={profileData.username}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
            />
          </fieldset>
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
          >
            Update Settings
          </button>
        </fieldset>
      </form>
      <hr />
      <Logout />
    </>
  );
};

export default SettingForm;
