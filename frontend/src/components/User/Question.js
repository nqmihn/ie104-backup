import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import HOST_IMAGE_URL from "../../constants";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
const Question = (props) => {
  const { data, index, handleCheckbox, showAnswer } = props;
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }
  const onCheckBox = (event, answerId, questionId) => {
    handleCheckbox(answerId, questionId);
  };
  return (
    <>
      {data.image ? (
        <div className="question-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setShowPreviewImage(true)}
            src={`${HOST_IMAGE_URL}${data.image}`}
          />
          {showPreviewImage === true && (
            <Lightbox
              image={`${HOST_IMAGE_URL}${data.image}`}
              title={"Question Image"}
              onClose={() => setShowPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="question-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.description} ?
      </div>
      <div className="answer">
        {data.quizAnswers &&
          data.quizAnswers.length &&
          data.quizAnswers.map((answer, index) => {
            return (
              <div className="answer-item" key={`answer-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={answer.isSelected}
                    onChange={(event) => onCheckBox(event, answer.id, data.id)}
                    disabled={showAnswer}
                  />
                  <label className="form-check-label">
                    {answer.description}
                  </label>
                  {showAnswer && answer && answer.isCorrect && (
                    <span className="mx-1 text-success">
                      <FaCheck />
                    </span>
                  )}
                  {showAnswer &&
                    answer &&
                    answer.isSelected &&
                    !answer.isCorrect && (
                      <span className="mx-1 text-danger fw-bold">x</span>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
