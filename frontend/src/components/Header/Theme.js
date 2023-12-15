import { useDispatch, useSelector } from "react-redux";
import { changMode } from "../../redux/action/configAction";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import "./theme.scss";
const Theme = () => {
  const mode = useSelector((state) => state.config.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    let body = document.querySelector("body");
    if (body) {
      body.setAttribute("data-bs-theme", mode);
    }
  }, [mode]);
  return (
    <>
      <Form>
        <Form.Check // prettier-ignore
          value={mode}
          type="switch"
          onChange={(e) =>
            dispatch(changMode(e.target.value === "light" ? "dark" : "light"))
          }
          id="custom-switch"
          hidden
        />
        <label htmlFor="custom-switch" className="theme-icon">
          {mode === "light" ? (
            <MdOutlineDarkMode className="theme-icon" />
          ) : (
            <MdDarkMode className="theme-icon" />
          )}
        </label>
      </Form>
    </>
  );
};
export default Theme;
