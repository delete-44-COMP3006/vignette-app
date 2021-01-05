import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import SubmissionDataService from "../services/submission.service";
import ConfirmModal from "./confirm_modal.component";
import { Link, useHistory } from "react-router-dom";
import "../scss/new.scss";

function New(props) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const createSubmission = useCallback(
    (e) => {
      const params = {
        title: title,
        summary: summary,
        content: content,
      };

      setIsModalVisible(false);

      const response = SubmissionDataService.create(params);

      response
        .then((submission) => {
          history.push(`/read/${submission.data._id}`);
        })
        .catch((error) => {
          setErrors(error.response.data);
        });
    },
    [title, summary, content, history]
  );

  const submitForm = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  return (
    <div className="w-75 ml-auto mr-auto">
      {errors &&
        errors.map((error) => (
          <Alert variant="danger" key={error}>
            {error}
          </Alert>
        ))}

      <Form onSubmit={submitForm}>
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

        <Form.Group>
          <Button type="submit" className="w-100">
            Submit!
          </Button>

          <Link to="/" tabIndex={-1}>
            <Button variant="secondary" className="w-100">
              Cancel
            </Button>
          </Link>
        </Form.Group>
      </Form>

      <ConfirmModal
        visible={isModalVisible}
        title="Submit story?"
        text={`This will publish your story and it will be live to the general public for the next 30 days. Are you sure you want to continue?`}
        confirmAction={() => {
          createSubmission();
        }}
        closeAction={() => setIsModalVisible(false)}
      ></ConfirmModal>
    </div>
  );
}

export default New;
