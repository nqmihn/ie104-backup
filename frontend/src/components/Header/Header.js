import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../..//services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";

import Theme from "./Theme";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const mode = useSelector((state) => state.config.mode);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleResgier = () => {
    navigate("/register");
  };
  const handleLogout = async () => {
    let res = await logout();

    if (res && res.statusCode === 0) {
      dispatch(doLogout());
      handleLogin();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Quiz Page
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("header.quiz")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {role === "ADMIN" && `${t("header.admin")}`}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  {t("header.signin")}
                </button>
                <button className="btn-signup" onClick={() => handleResgier()}>
                  {t("header.signup")}
                </button>
              </>
            ) : (
              <NavDropdown title={t("header.settings")} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogout()}>
                  {t("header.logout")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleProfile()}>
                  {t("header.profile")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
          <Nav>
            <Theme />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
