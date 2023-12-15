import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner9 } from "react-icons/im";
import Language from "../Header/Language";
import { useTranslation, Trans } from "react-i18next";
import Theme from "../Header/Theme";
const LoginComponent = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }
    setIsLoading(true);
    let res = await postLogin(email, password);
    if (res && res.statusCode === 0) {
      dispatch(doLogin(res));
      toast.success(res.message);
      setIsLoading(false);
      navigate("/");
    }
    if (res && res.statusCode !== 0) {
      setIsLoading(false);
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };
  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") handleLogin();
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>{t("auth.title")}</span>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          {t("auth.signup")}
        </button>
        <Language />
        <Theme />
      </div>
      <div className="title col-4 mx-auto">Quiz Page</div>
      <div className="welcome col-4 mx-auto">Hello, who’s this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>{t("auth.password")}</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <span
          className="forgot-password"
          onClick={() => {
            navigate("/forgot");
          }}
        >
          {t("auth.forgot")}
        </span>
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading && <ImSpinner9 className="loader-icon" />}

            <span>{t("auth.login")}</span>
          </button>
        </div>
        <div className="text-center">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="back"
          >
            {" "}
            &#60;&#60;{t("auth.homepage")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
