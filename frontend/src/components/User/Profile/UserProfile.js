import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import UserInformation from "./UserInformation";
import "./UserProfile.scss";
import ChangePassWord from "./ChangePassword";
import QuizHistory from "./QuizHistory";
import { useTranslation, Trans } from "react-i18next";

const UserProfile = () => {
  const { t } = useTranslation();
  return (
    <div className="profile-container">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} className="menu">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">{t("profile.info")}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">{t("profile.change-pwd")}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">{t("profile.history")}</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <UserInformation />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ChangePassWord />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <QuizHistory />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default UserProfile;
