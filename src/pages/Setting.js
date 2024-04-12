import SettingForm from "../components/SettingForm";
import Logout from "../components/Logout";

const Setting = () => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <SettingForm />
            <hr />
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
