import { useState } from "react";
import { useEffect } from "react";
import { getQuizByUser } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import "./ListQuiz.scss";
import HOST_IMAGE_URL from "../../constants";
import { useTranslation, Trans } from "react-i18next";
const ListQuiz = (props) => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.statusCode === 0) {
      setArrQuiz(res.data);
    }
  };
  return (
    <div className="list-quiz-container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={`${index}-quiz`}
            >
              <img
                src={`${HOST_IMAGE_URL}${item.quiz.quizImage}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${item.quiz.id}`, {
                      state: { quizTitle: item.quiz.description },
                    })
                  }
                >
                  {t("quiz.doing")}
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>You dont have any Quiz</div>}
    </div>
  );
};
export default ListQuiz;
