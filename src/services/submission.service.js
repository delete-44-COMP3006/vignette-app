import http from "../http-common";

class SubmissionDataService {
  index() {
    return http.get("/submissions");
  }

  get(id) {
    return http.get(`/submissions/${id}`)
  }
}

export default new SubmissionDataService();
