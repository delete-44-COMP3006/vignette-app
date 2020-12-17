import http from "../http-common";
import qs from "querystring";

class SubmissionDataService {
  index() {
    return http.get("/submissions");
  }

  get(id) {
    return http.get(`/submissions/${id}`)
  }

  create(body) {
    return http.post("/submissions", qs.stringify(body));
  }
}

export default new SubmissionDataService();
