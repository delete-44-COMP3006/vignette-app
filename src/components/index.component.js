import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SubmissionDataService from "../services/submission.service";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Up from "./icons/up.icon";
import Down from "./icons/down.icon";
import "../scss/index.scss";

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
            <Card
              style={{ maxWidth: "21rem" }}
              className="mb-3"
              key={submission._id}
            >
              <Card.Body>
                <Card.Title>
                  <Link to={`/read/${submission._id}`}>{submission.title}</Link>
                </Card.Title>
                <Card.Text>{summaryFor(submission)}</Card.Text>

                <span className="d-inline-flex justify-content-around w-100">
                  <Up size="24" />
                  <Link to={`/read/${submission._id}`}>Read</Link>
                  <Down size="24" />
                </span>
              </Card.Body>
            </Card>
          ))}
      </CardColumns>
    </div>
  );
}

export default Index;
