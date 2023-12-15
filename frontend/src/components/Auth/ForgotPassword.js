import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  postRegister,
  resetPassword,
} from "../../services/apiServices";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Language from "../Header/Language";
import Theme from "../Header/Theme";
import CountDown from "./CountDownTimer";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [code, setCode] = useState("");
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [userId, setUserId] = useState();

  const navigate = useNavigate();
  const onTimeUp = () => {
    setIsSent(false);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleForgot = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    setIsSent(true);
    setShowVerifyInput(true);
    const res = await forgotPassword(email);
    if (res && res.statusCode === 0) {
      setUserId(res.data.userId);
      toast.success(
        "Verification code has been sent. Please check your email !"
      );
    } else {
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };
  const handleChangePassword = async () => {
    if (!code) {
      toast.error("Invalid Verification Code ");
      return;
    }
    if (!password) {
      toast.error("Invalid Password");
      return;
    }
    if (!confirmedPassword) {
      toast.error("Invalid Confirmed Password");
      return;
    }
    if (password !== confirmedPassword) {
      toast.error("New Password and Confirmed Password do not match !");
      return;
    }
    const res = await resetPassword(userId, code, password);
    if (res && res.statusCode === 0) {
      toast.success("Reset Password Success !");
      navigate("/login");
    } else {
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <span> Already have an account?</span>
        <button onClick={() => navigate("/login")}>Log in</button>
        <Language />
        <Theme />
      </div>
      <div className="title col-4 mx-auto">Quiz Page</div>
      <div className="welcome col-4 mx-auto">Forgot Password?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSent}
          />
        </div>
        {showVerifyInput ? (
          <div className="d-flex flex-column gap-2">
            <div className="verify-container">
              <input
                type={"text"}
                className="form-control"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Verification Code"
              />

              {/* <button className="btn btn-primary">Change Password</button> */}
              <button
                className="btn-submit d-flex justify-content-center align-items-center gap-1"
                onClick={() => handleForgot()}
                disabled={isSent}
              >
                {isSent === true ? (
                  <>
                    Retry
                    <CountDown onTimeUp={onTimeUp} />
                  </>
                ) : (
                  <>Send</>
                )}
              </button>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type={"password"}
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirmed Password</label>
              <input
                type={"password"}
                className="form-control"
                value={confirmedPassword}
                onChange={(event) => setConfirmedPassword(event.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="forgot-instruct">
            Type the address email linked to your account and we'll send
            verification code to your email
          </div>
        )}

        <div>
          {showVerifyInput ? (
            <button
              className="btn-change"
              onClick={() => handleChangePassword()}
            >
              Change Password
            </button>
          ) : (
            <button
              className="btn-submit d-flex justify-content-center align-items-center gap-1"
              onClick={() => handleForgot()}
            >
              Send
            </button>
          )}
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
