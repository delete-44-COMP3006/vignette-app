import React, { useState, useCallback, useEffect } from "react";
import SubmissionDataService from "../services/submission.service";
import { useParams, Link, useHistory } from "react-router-dom";
import useKeypress from "../hooks/useKeypress";
import Spinner from "react-bootstrap/Spinner";
import "../scss/show.scss";

function Show(props) {
  const { id } = useParams();
  const history = useHistory();

  // Define callbacks for GETting and SETting the title and content to show
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  // Callback to update the displayed submission
  const retrieveSubmission = useCallback(() => {
    SubmissionDataService.get(id)
      .then((response) => {
        const submission = response.data;

        setTitle(submission.title);
        setContent(submission.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id, setTitle, setContent]);

  // On press of ctrl + q:
  useKeypress(
    "q",
    () => {
      history.push("/write");
    },
    [history]
  );

  // Fetch submission on load
  useEffect(() => {
    retrieveSubmission();
  }, [retrieveSubmission]);

  return (
    <div className="w-75 ml-auto mr-auto text-center">
      {title ? (
        <div>
          <h2 className="submission-title">{title}</h2>
          <p className="submission-content">{content}</p>

          <Link to="/" style={{ fontSize: "1.25rem" }}>
            Return
          </Link>
        </div>
      ) : (
        <Spinner animation="border" role="status"></Spinner>
      )}
    </div>
  );
}

export default Show;
