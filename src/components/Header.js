import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const Header = () => {
  const { loggedIn, user } = useAuth();

  return (
    <>
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/editor"
                    >
                      <i className="ion-compose"></i>&nbsp;New Article
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/settings"
                    >
                      <i className="ion-gear-a"></i>&nbsp;Settings
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={`/profile/${user.username}`}
                    >
                      <img
                        src={user.image}
                        className="user-pic"
                        alt={user.username}
                      />
                      {user.username}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/login"
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/register"
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
