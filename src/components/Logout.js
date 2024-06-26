import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Or click here to logout.
    </button>
  );
};

export default Logout;
