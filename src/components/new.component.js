import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import SubmissionDataService from "../services/submission.service";
import { useHistory } from "react-router-dom";
import "../scss/new.scss";

function New(props) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  // Callback to update the displayed submission
  const updateContent = useCallback(
    (e) => {
      setContent(e.target.value);

      setWordCount(
        e.target.value.trim().replace(/\s+/gi, " ").split(" ").length
      );
    },
    [setContent, setWordCount]
  );

  const createSubmission = useCallback((e) => {
    e.preventDefault();
    let params = {
      title: title,
      content: content,
    };

    const response = SubmissionDataService.create(params);

    response.then((submission) => {
      history.push(`/read/${submission.data._id}`)
    }).catch((error) => {
      setErrors(error.response.data)
    });
  }, [title, content, history]);

  return (
    <div className="w-75 ml-auto mr-auto">
        {errors &&
          errors.map((error) => (
            <Alert variant="danger" key={error} dismissable>{error}</Alert>
          ))}

      <Form onSubmit={createSubmission}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Name your submission"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Please enter a short summary of your story. If left blank, an excerpt will be taken from your submission..."
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Write!"
            value={content}
            onChange={updateContent}
          />

          <Form.Text className="float-right">{wordCount}/500</Form.Text>
        </Form.Group>

        <Button type="submit" className="w-100">
          Submit!
        </Button>
      </Form>
    </div>
  );
}

export default New;
