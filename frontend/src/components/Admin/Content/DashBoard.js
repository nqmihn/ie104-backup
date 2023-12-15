import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import "./DashBoard.scss";
import { getOverview } from "../../../services/apiServices";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
const DashBoard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchDataDashboard();
  }, []);
  const fetchDataDashboard = async () => {
    let res = await getOverview();
    if (res && res.statusCode === 0) {
      setDataOverview(res.data);
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.data?.others?.countQuiz ?? 0;
      Qs = res?.data?.others?.countQuestions ?? 0;
      As = res?.data?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">{t("admin.dashboard.title")}</div>
      <div className="content">
        <div className="content-left">
          <div className="content-left-item">
            <span className="text-1">{t("admin.dashboard.t-user")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="content-left-item">
            <span className="text-1">{t("admin.dashboard.t-quiz")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="content-left-item">
            <span className="text-1">{t("admin.dashboard.t-question")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="content-left-item">
            <span className="text-1">{t("admin.dashboard.t-answer")}</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.others &&
              dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
