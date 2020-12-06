import React, { useState, useCallback, useEffect } from "react";
import SubmissionDataService from "../services/submission.service";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Show(props) {
  let { id } = useParams();

  // Define callbacks for GETting and SETting the title and content to show
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  // Callback to update the displayed submission
  const retrieveSubmission = useCallback(() => {
    SubmissionDataService.get(id)
      .then((response) => {
        const submission = response.data[0];

        setTitle(submission.title);
        setContent(submission.content);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id, setTitle, setContent]);

  // Fetch submission on load
  useEffect(() => {
    retrieveSubmission();
  }, [retrieveSubmission]);

  return (
    <div className="w-75 ml-auto mr-auto text-center">
      {title ? (
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      ) : (
        <Spinner animation="border" role="status">
        </Spinner>
      )}
    </div>
  );
}

export default Show;
