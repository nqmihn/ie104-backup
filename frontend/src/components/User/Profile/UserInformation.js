import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./UserInfomartion.scss";
import { changeProfile, getUserInfo } from "../../../services/apiServices";
import { useEffect } from "react";
import { useState } from "react";
import HOST_IMAGE_URL from "../../../constants";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

const UserInformation = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    handleGetUserInfo();
    console.log(previewImage);
  }, []);
  const handleGetUserInfo = async () => {
    let res = await getUserInfo();
    if (res && res.statusCode === 0) {
      setEmail(res.data.email);
      setUsername(res.data.username);
      setRole(res.data.role);
      setPreviewImage(`${HOST_IMAGE_URL}${res.data.image}`);
    }
  };
  const handleUploadFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreviewImage(null);
    }
  };
  const handleChangeProfile = async () => {
    const res = await changeProfile(username, image);
    if (res && res.statusCode === 0) {
      toast.success("Change Information Success");
    }
  };
  return (
    <>
      <h2>User</h2>
      <div className="info-container">
        <div className="user-image">
          <Container>
            <Row>
              <Col xs={6} md={4}>
                {previewImage ? (
                  <Image className="image" src={previewImage} thumbnail />
                ) : (
                  <Image
                    className="image"
                    src="data:image/png;base64,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"
                    thumbnail
                  />
                )}
              </Col>
            </Row>
          </Container>
          <label className="form-label label-upload" htmlFor="labelUpload">
            <AiOutlinePlusCircle className="add-icon" />
          </label>
          <input
            type="file"
            id="labelUpload"
            hidden
            onChange={(event) => handleUploadFile(event)}
          />
        </div>
        <div className="user-info">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
            <label>Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Your quiz name"
              disabled
            />
            <label>Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your quiz name"
              disabled
              value={role}
            />
            <label>Role</label>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleChangeProfile()}
          >
            {t("profile.save")}
          </button>
        </div>
      </div>
    </>
  );
};
export default UserInformation;
