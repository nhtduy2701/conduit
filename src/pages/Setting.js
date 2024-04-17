import SettingForm from "../components/SettingForm";

const Setting = () => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <SettingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
