import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiMinusCircle } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswer,
  postCreateNewQuestion,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const Questions = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState(initQuestions);
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };
  const handleOnChange = (type, id, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === id);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFile = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    title: "",
    url: "",
  });
  const handleClickPreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImage({
        url: questionsClone[index].imageFile,
        title: questionsClone[index].imageName,
      });
      setShowPreviewImage(true);
    }
  };
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
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
  const handleSubmitQuestion = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Vui lòng chọn Quiz");
      return;
    }
    let isValidA = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidA = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (!isValidA) {
        break;
      }
    }
    if (!isValidA) {
      toast.error(
        `Vui lòng nhập Answer ${indexA + 1} ở Question ${indexQ + 1}`
      );
      return;
    }
    let isValidQ = true;
    let indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQuestion = i;
        break;
      }
    }
    if (!isValidQ) {
      toast.error(`Vui lòng nhập Question ${indexQuestion + 1}`);
      return;
    }
    for (const question of questions) {
      // submit question
      const q = await postCreateNewQuestion(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // submit answer
      for (const answer of question.answers) {
        await postCreateNewAnswer(
          answer.description,
          answer.isCorrect,
          q.data.id
        );
      }
    }
    setQuestions(initQuestions);
    toast.success("Tạo thành công");
  };

  return (
    <div className="questions-container">
      <div className="title"> Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add Questions</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div className="question-main mb-4" key={question.id}>
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(event) =>
                        handleOnChange(
                          "QUESTION",
                          question.id,
                          event.target.value
                        )
                      }
                    />
                    <label>Question {index + 1}: </label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload" htmlFor={`${question.id}`}>
                      <BsCardImage />
                    </label>
                    <input
                      id={`${question.id}`}
                      type={"file"}
                      hidden
                      onChange={(event) =>
                        handleOnChangeFile(question.id, event)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          onClick={() => handleClickPreviewImage(question.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <AiOutlinePlusCircle className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span>
                        <FiMinusCircle
                          className="icon-remove"
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", question.id)
                          }
                        />
                      </span>
                    )}
                  </div>
                </div>
                {question &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div className="answers-content" key={answer.id}>
                        <input
                          className="form-check-input is-correct"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                          />
                          <label>Answer {index + 1}:</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id, "")
                            }
                          >
                            <AiOutlinePlusCircle className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <FiMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestion()}
            >
              Save Question
            </button>
          </div>
        )}
        {showPreviewImage === true && (
          <Lightbox
            image={URL.createObjectURL(dataImage.url)}
            title={dataImage.title}
            onClose={() => setShowPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default Questions;
