import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SubmissionDataService from "../services/submission.service";
import Card from "react-bootstrap/Card";

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
      <div className="d-flex justify-content-around flex-wrap">
        {submissions &&
          submissions.map((submission, index) => (
            <Card
              style={{ maxWidth: "21rem" }}
              className="mb-3"
              key={submission._id}
            >
              <Card.Body>
                <Card.Title>{submission.title}</Card.Title>
                <Card.Text>
                  {submission.content.length > 300
                    ? `${submission.content.substr(0, 299)}...`
                    : submission.content}
                </Card.Text>

                <Link to={`/read/${submission._id}`}>Read</Link>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Index;
