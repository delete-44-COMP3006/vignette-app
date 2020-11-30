import React, { useState, useCallback, useEffect } from "react";
import SubmissionDataService from "../services/submission.service";

function Index(props) {
  // Define callbacks for GETting and SETting the component state
  const [submissions, setSubmissions] = useState([]);

  // Callback to update the displayed submissions
  const retrieveSubmissions = useCallback(() => {
    SubmissionDataService.index()
      .then((response) => {
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setSubmissions]);

  // Fetch list of submissions on load
  useEffect(() => {
    retrieveSubmissions();
  }, [retrieveSubmissions]);

  return (
    <div>
      <h1>Submissions</h1>
    </div>
  );
}

export default Index;
