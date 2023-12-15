import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUser,
  postAssignQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
const AssignQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.statusCode === 0) {
      let newQuiz = res.data.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.statusCode === 0) {
      let newUser = res.data.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username}-${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };
  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.statusCode === 0) {
      toast.success(res.message);
    }
    if (res && res.statusCode !== 0) {
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };
  return (
    <div className="assign-quiz-container row mx-1">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button className="btn btn-primary mt-3" onClick={() => handleAssign()}>
          Assign
        </button>
      </div>
    </div>
  );
};
export default AssignQuiz;
