import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiMinusCircle } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertFileQa,
  postUpsertQA,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import HOST_IMAGE_URL from "../../../../constants";
const QuizQA = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      quizAnswers: [
        {
          id: uuidv4(),
          description: "",
          correctAnswer: false,
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
        quizAnswers: [
          {
            id: uuidv4(),
            description: "",
            correctAnswer: false,
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
        correctAnswer: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].quizAnswers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].quizAnswers = questionsClone[
        index
      ].quizAnswers.filter((item) => item.id !== answerId);
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
      questionsClone[index].quizAnswers = questionsClone[index].quizAnswers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.correctAnswer = value;
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
  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.statusCode === 0 && res.data.qa.length > 0) {
      // convert base64 to file OBJ
      let newQA = [];
      for (let i = 0; i < res.data.qa.length; i++) {
        let q = res.data.qa[i];
        if (q.image) {
          q.imageName = `Question-${q.id}`;
          q.imageFile = `${HOST_IMAGE_URL}${q.image}`;
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    } else {
      setQuestions(initQuestions);
    }
  };
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
      for (let j = 0; j < questions[i].quizAnswers.length; j++) {
        if (!questions[i].quizAnswers[j].description) {
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
    let questionsClone = _.cloneDeep(questions);
    let submitQA = [];
    for (let i = 0; i < questionsClone.length; i++) {
      let qA = {};
      qA.description = questionsClone[i].description;
      if (
        questionsClone[i].imageFile &&
        typeof questionsClone[i].imageFile === "object"
      ) {
        let resFileName = await postUpsertFileQa(questionsClone[i].imageFile);
        if (resFileName && resFileName.statusCode === 0) {
          qA.image = resFileName.data;
        }
      } else {
        qA.image = questionsClone[i].image;
      }
      if (typeof questionsClone[i].id === "number")
        qA.id = questionsClone[i].id;
      qA.quizAnswers = [];
      questionsClone[i].quizAnswers.forEach((quizAnswer) => {
        let answer = {};
        if (typeof quizAnswer.id === "number") answer.id = quizAnswer.id;
        answer.description = quizAnswer.description;
        answer.correctAnswer = quizAnswer.correctAnswer;
        qA.quizAnswers.push(answer);
      });
      submitQA.push(qA);
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: submitQA,
    });
    if (res && res.statusCode === 0) {
      toast.success(res.message);
      fetchQuizWithQA();
    }
  };

  return (
    <div className="questions-container">
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
                  question.quizAnswers.length > 0 &&
                  question.quizAnswers.map((answer, index) => {
                    return (
                      <div className="answers-content" key={answer.id}>
                        <input
                          className="form-check-input is-correct"
                          type="checkbox"
                          checked={answer.correctAnswer}
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
                          {question.quizAnswers.length > 1 && (
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
            image={dataImage.url}
            title={dataImage.title}
            onClose={() => setShowPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default QuizQA;
