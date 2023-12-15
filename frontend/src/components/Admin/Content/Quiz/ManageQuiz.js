import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import TableQuiz from "./TableQuiz";
// import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState({});
  const [image, setImage] = useState(null);
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    // Validate
    if (!name || !description) {
      toast.error("Name/Description is Required");
      return;
    }
    const res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.statusCode === 0) {
      toast.success(res.message);
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };
  return (
    <div className="quiz-container">
      {/* <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new Quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description..."
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <label>Quiz Type:</label>
                  <Select
                    defaultValue={type}
                    options={options}
                    placeholder="Quiz type..."
                    onChange={setType}
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">Upload image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeFile(event)}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      <Tabs
        defaultActiveKey="manage-quiz"
        id="uncontrolled-tab-example"
        className="mb-3 mx-1"
      >
        <Tab eventKey="manage-quiz" title="Manage Quiz">
          <div className="add-new">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">Add new Quiz:</legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your quiz name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>Name</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description..."
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
                <label>Description</label>
              </div>
              <div className="my-3">
                <label>Quiz Type:</label>
                <Select
                  defaultValue={type}
                  options={options}
                  placeholder="Quiz type..."
                  onChange={setType}
                />
              </div>
              <div className="more-actions form-group">
                <label className="mb-1">Upload image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => handleChangeFile(event)}
                />
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => handleSubmit()}
                >
                  Save
                </button>
              </div>
            </fieldset>
          </div>
          <div className="list-detail">
            <TableQuiz />
          </div>
        </Tab>
        <Tab eventKey="update-qa" title="Update Question/Answer">
          <QuizQA />
        </Tab>
        <Tab eventKey="assign" title="Assign Quiz To User">
          <AssignQuiz />
        </Tab>
      </Tabs>
    </div>
  );
};
export default ManageQuiz;
