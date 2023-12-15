import { useSelector } from "react-redux";
import videoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router";
import { useTranslation, Trans } from "react-i18next";
const HomeComponent = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">{t("homepage.title2")}</div>
        <div className="title-3">
          {isAuthenticated ? (
            <button onClick={() => navigate("/users")}>
              {t("homepage.start1")}
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>
              {t("homepage.start2")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomeComponent;
