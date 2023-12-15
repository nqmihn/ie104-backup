import CountDown from "./CountDownTimer";
import { useRef } from "react";

const RightContent = (props) => {
  const refDiv = useRef([]);
  const { dataQuiz } = props;
  const onTimeUp = () => {
    props.handleSubmitQuiz();
  };
  const getClassQuestion = (question) => {
    if (question && question.quizAnswers.length > 0) {
      let isAnswered = question.quizAnswers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) return "question selected";
    }
    return "question";
  };
  const handleClickQuestion = (question, index) => {
    props.setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.quizAnswers.length > 0) {
      let isAnswered = question.quizAnswers.find(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) return;
    }
    refDiv.current[index].className = "question clicked";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                className={getClassQuestion(item)}
                key={`question-${index + 1}`}
                onClick={() => handleClickQuestion(item, index)}
                ref={(el) => (refDiv.current[index] = el)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
