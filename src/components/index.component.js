import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SubmissionDataService from "../services/submission.service";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
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
                <Card.Text>
                  {submission.summary
                    ? submission.summary
                    : submission.content && submission.content.length > 300
                    ? `${submission.content.substr(0, 300)}...`
                    : submission.content}
                </Card.Text>

                <Link to={`/read/${submission._id}`}>Read</Link>
              </Card.Body>
            </Card>
          ))}
      </CardColumns>
    </div>
  );
}

export default Index;
