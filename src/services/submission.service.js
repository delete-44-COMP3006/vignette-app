import http from "../http-common";

class SubmissionDataService {
  index() {
    return http.get("/submissions");
  }
}

export default new SubmissionDataService();
