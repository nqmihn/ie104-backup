import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getHistory } from "../../../services/apiServices";
import { useTranslation, Trans } from "react-i18next";
const QuizHistory = () => {
  const { t } = useTranslation();
  const [listHistory, setListHistory] = useState([]);
  useEffect(() => {
    fetchUserHistory();
  }, []);
  const fetchUserHistory = async () => {
    const res = await getHistory();
    if (res && res.statusCode === 0) {
      setListHistory(res.data);
    }
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{t("profile.table-history.q-description")}</th>
          <th>{t("profile.table-history.t-question")}</th>
          <th>{t("profile.table-history.t-correct")}</th>
          <th>{t("profile.table-history.time")}</th>
        </tr>
      </thead>
      <tbody>
        {listHistory &&
          listHistory.length > 0 &&
          listHistory.map((history, index) => {
            return (
              <tr key={index}>
                <td>{history.id}</td>
                <td>{history.quiz.description}</td>
                <td>{history.totalQuestions}</td>
                <td>{history.totalCorrect}</td>
                <td>{history.createdAt}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default QuizHistory;
