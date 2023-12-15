import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuestionById, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModelResult from "./ModalResult";
import RightContent from "./Content/RightContent";
const DetailQuiz = (pros) => {
  const params = useParams();
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [dataResult, setDataResult] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const quizId = params.id;
  useEffect(() => {
    fetchQuestion();
  }, [quizId]);
  const fetchQuestion = async () => {
    let res = await getQuestionById(quizId);
    if (res && res.statusCode === 0) {
      setDataQuiz(res.data);
    }
  };
  const handleBack = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };
  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => +item.id === +questionId);
    if (question && question.quizAnswers) {
      question.quizAnswers.forEach((item) => {
        if (+item.id === +answerId) item.isSelected = !item.isSelected;
      });
    }
    let index = dataQuizClone.findIndex((item) => +item.id === +questionId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  const handleSubmitQuiz = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let arrAnswers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.id;
        let userAnswerId = [];
        item.quizAnswers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(answer.id);
          }
        });
        arrAnswers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = arrAnswers;
      const res = await postSubmitQuiz(payload);
      let answerSystem = res.data.quizData;
      let cloneQuizSubmit = _.cloneDeep(dataQuiz);
      cloneQuizSubmit.forEach((question) => {
        let index = answerSystem.findIndex(
          (item) => item.questionId === question.id
        );
        if (index > -1) {
          question.quizAnswers.forEach((answer) => {
            let isCorrect;
            isCorrect = answerSystem[index].systemAnswers.find(
              (aS) => aS.id === answer.id
            );
            if (isCorrect) {
              answer.isCorrect = true;
            }
          });
        }
      });
      setDataQuiz(cloneQuizSubmit);
      if (res && res.statusCode === 0) {
        setShowResult(true);
        setDataResult({
          countCorrect: res.data.countCorrect,
          countTotal: res.data.countTotal,
          quizData: res.data.countTotal,
        });
      } else {
      }
    }
  };
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}. {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="quiz-body">
          <img />
        </div>
        <div className="quiz-content">
          <Question
            handleCheckbox={handleCheckbox}
            index={index}
            showAnswer={showAnswer}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handleBack()}>
            Back
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleSubmitQuiz()}
            disabled={showAnswer}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleSubmitQuiz={handleSubmitQuiz}
          setIndex={setIndex}
        />
      </div>
      <ModelResult
        show={showResult}
        setShow={setShowResult}
        dataResult={dataResult}
        handleShowAnswer={handleShowAnswer}
        setIndex={setIndex}
      />
    </div>
  );
};
export default DetailQuiz;
