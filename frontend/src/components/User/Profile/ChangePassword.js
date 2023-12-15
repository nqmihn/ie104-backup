import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword, logout } from "../../../services/apiServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../../redux/action/userAction";
import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

const ChangePassWord = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangePassword = async () => {
    if (!password) {
      toast.error("Invalid Current Password");
      return;
    }
    if (!newPassword) {
      toast.error("Invalid New Password");
      return;
    }
    if (!confirmedPassword) {
      toast.error("Invalid Confirmed Password");
      return;
    }
    if (newPassword !== confirmedPassword) {
      toast.error("New Password and Confirmed Password do not match !");
      return;
    }
    const res = await changePassword(password, newPassword);
    if (res && res.statusCode === 0) {
      await logout();
      dispatch(doLogout());
      navigate("/login");
      toast.success("Change password success, Please re-login !");
    } else {
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };
  return (
    <>
      <h2>Change Password</h2>
      <div className="change-password mx-2">
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>{t("profile.current-pwd")}</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <label>{t("profile.new-pwd")}</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            value={confirmedPassword}
            onChange={(event) => setConfirmedPassword(event.target.value)}
          />
          <label>{t("profile.confirmed-pwd")}</label>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleChangePassword()}
        >
          {t("profile.save")}
        </button>
      </div>
    </>
  );
};
export default ChangePassWord;
