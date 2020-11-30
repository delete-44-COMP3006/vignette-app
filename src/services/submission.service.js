import http from "../http-common";

class SubmissionDataService {
  index() {
    return http.get("/films");
  }
}

export default new SubmissionDataService();
