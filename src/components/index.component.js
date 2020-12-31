import React, { useState, useCallback, useEffect } from "react";
import SubmissionDataService from "../services/submission.service";
import SubmissionCard from "./submission-card.component";
import CardColumns from "react-bootstrap/CardColumns";

function Index(props) {
  // Define callbacks for GETting and SETting the component state
  const [submissions, setSubmissions] = useState([]);

  // Callback to update the displayed submissions
  const retrieveSubmissions = useCallback(() => {
    SubmissionDataService.index()
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setSubmissions]);

  // Helper function to find the summary text for the submission
  const summaryFor = (submission) => {
    if (submission.summary) {
      return submission.summary;
    } else if (submission.content.length > 300) {
      return `${submission.content.substr(0, 300)}...`;
    } else {
      return submission.content;
    }
  };

  // Fetch list of submissions on load
  useEffect(() => {
    retrieveSubmissions();
  }, [retrieveSubmissions]);

  return (
    <div className="w-75 ml-auto mr-auto">
      <CardColumns>
        {submissions &&
          submissions.map((submission, index) => (
            <SubmissionCard
              id={submission._id}
              title={submission.title}
              body={summaryFor(submission)}
              key={submission._id}
            />
          ))}
      </CardColumns>
    </div>
  );
}

export default Index;
