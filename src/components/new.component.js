import React, { useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../scss/new.scss";

function New(props) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

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

  return (
    <div className="w-75 ml-auto mr-auto">
      <Form>
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

        <Button type="submit" className="w-100">Submit!</Button>
      </Form>
    </div>
  );
}

export default New;
