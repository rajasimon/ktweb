const backendPath = import.meta.env.VITE_BACKEND_PATH

// Return headers for the API call
const getHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

const fetchData = (token, endpoint, method,  data) => (
  fetch(`${backendPath}${endpoint}`, {
    method: method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: method === "POST" || method === "PUT" ? JSON.stringify(data) : null
  }).then((res) => res.json()).then((response) => {
    return response;
  })
);

// Start the exam after the AutoProctor loaded and setup completed.
export const startExamAPI = (token, examID, userName) => (
  fetchData(token, `/services/kt/api/student-exams/start`, "POST", {"id": examID, "studentNo": userName})
)


export const questionSetupsAPI = (token, examID) => (
  fetchData(token, `/services/kt/api/student-questions/exam/${examID}`, "GET")
)

export const updateQuestion = (token, question) => (
  fetchData(token, `/services/kt/api/student-questions`, "PUT", question)
)

export const endStudentExamAPI = (token, studentExamID, userName) => (
  fetchData(token, `/services/kt/api/student-exams/end`, "POST", {"id": studentExamID, "studentNo": userName})
)