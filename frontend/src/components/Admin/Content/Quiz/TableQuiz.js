import { useEffect } from "react";
import { useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.statusCode === 0) {
      setListQuiz(res.data);
    }
  };
  const handleClickBtnDelete = (quiz) => {
    setDataDelete(quiz);
    setShowModalDelete(true);
  };
  const handleClickBtnUpdate = (quiz) => {
    setDataUpdate(quiz);
    setShowModalUpdate(true);
  };
  const resetDataUpdate = () => {
    setDataUpdate({});
  };
  return (
    <>
      <div>List Quizzes:</div>
      <table className="table table-hover table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={`quiz-${index}`}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleClickBtnUpdate(quiz)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(quiz)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalDeleteQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
      />
      <ModalUpdateQuiz
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        resetDataUpdate={resetDataUpdate}
      />
    </>
  );
};
export default TableQuiz;
