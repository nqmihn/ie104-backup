import axios from "../utils/axios-customize";

const postCreateUser = (email, password, username, role, image) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);
  form.append("image", image);
  return axios.post("api/v1/users", form, {
    headers: {
      folder_type: "users",
    },
  });
};

const getAllUser = () => {
  return axios.get("api/v1/users/all");
};

const putUpdateUser = (id, username, role, image) => {
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("image", image);
  return axios.put("api/v1/users", form, {
    headers: {
      folder_type: "users",
    },
  });
};

const deleteUser = (userId) => {
  return axios.delete("api/v1/users", { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/users?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post("/api/v1/auth/login", {
    username: email,
    password,
    delay: 1000,
  });
};

const postRegister = (email, password, username) => {
  return axios.post("/api/v1/auth/register", { email, password, username });
};

const getQuizByUser = () => {
  return axios.get("/api/v1/user-quiz/quiz-by-user");
};

const getQuestionById = (id) => {
  return axios.get(`/api/v1/question/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/answer/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const form = new FormData();
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", quizImage);
  return axios.post(`/api/v1/quizzes`, form, {
    headers: {
      folder_type: "quizzes",
    },
  });
};

const getAllQuizForAdmin = () => {
  return axios.get(`/api/v1/quizzes/all`);
};

const deleteQuizById = (id) => {
  return axios.delete(`api/v1/quizzes/${id}`);
};

const updateQuizById = (id, description, name, difficulty, quizImage) => {
  const form = new FormData();
  form.append("id", id);
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", quizImage);
  return axios.put(`/api/v1/quizzes`, form, {
    headers: {
      folder_type: "quizzes",
    },
  });
};

const postCreateNewQuestion = (quizId, description, questionImage) => {
  const form = new FormData();
  form.append("quizId", quizId);
  form.append("description", description);
  form.append("questionImage", questionImage);
  return axios.post(`/api/v1/question`, form, {
    headers: {
      folder_type: "questions",
    },
  });
};

const postCreateNewAnswer = (description, correct_answer, question_id) => {
  return axios.post(`/api/v1/answer`, {
    description,
    correctAnswer: correct_answer,
    questionId: question_id,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axios.post("/api/v1/user-quiz/assign", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`/api/v1/quizzes/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
  return axios.post(`/api/v1/question/upsert-qa`, { ...data });
};

const postUpsertFileQa = (image) => {
  const form = new FormData();
  form.append("image", image);
  return axios.post(`/api/v1/question/update-file-qa`, form, {
    headers: {
      folder_type: "questions",
    },
  });
};

const logout = () => {
  return axios.post("/api/v1/auth/logout");
};
const getOverview = () => {
  return axios.get("/api/v1/auth/overview");
};
const getUserInfo = () => {
  return axios.get("/api/v1/auth/profile");
};
const changeProfile = (username, userImage) => {
  const form = new FormData();
  form.append("userImage", userImage);
  form.append("username", username);
  return axios.post("/api/v1/auth/profile", form, {
    headers: {
      folder_type: "users",
    },
  });
};
const changePassword = (current_password, new_password) => {
  return axios.post("/api/v1/auth/change-password", {
    current_password,
    new_password,
  });
};
const getHistory = () => {
  return axios.post("/api/v1/history/by-user");
};
const forgotPassword = (email) => {
  return axios.post("/api/v1/mail/forgot", { email });
};
const resetPassword = (userId, verificationCode, password) => {
  return axios.post("/api/v1/reset-password", {
    userId,
    verificationCode,
    password,
  });
};
export {
  postCreateUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getQuestionById,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  deleteQuizById,
  updateQuizById,
  postCreateNewQuestion,
  postCreateNewAnswer,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  postUpsertFileQa,
  logout,
  getOverview,
  getUserInfo,
  changeProfile,
  changePassword,
  getHistory,
  forgotPassword,
  resetPassword,
};
