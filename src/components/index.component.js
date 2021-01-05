import React, { useState, useCallback, useEffect } from "react";
import SubmissionDataService from "../services/submission.service";
import SubmissionCard from "./submission-card.component";
import useKeypress from "../hooks/useKeypress";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";

function Index(props) {
  // Define callbacks for GETting and SETting the component state
  const [submissions, setSubmissions] = useState([]);
  const [sortOrder, setSortOrder] = useState("-score");

  const history = useHistory();

  // Callback to update the displayed submissions
  const retrieveSubmissions = useCallback(() => {
    SubmissionDataService.index(sortOrder)
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setSubmissions, sortOrder]);

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

  // Fetch list of submissions on load and when sort order changes
  useEffect(() => {
    retrieveSubmissions();
  }, [retrieveSubmissions]);

  // On press of ctrl + q:
  useKeypress(
    "q",
    () => {
      history.push("/write");
    },
    [history]
  );

  return (
    <div className="w-75 ml-auto mr-auto border-top border-light">
      <DropdownButton
        title="Sort Submissions"
        variant="link"
        className="text-lg-right text-center mt-lg-2 mb-2 p-0"
      >
        <Dropdown.Item
          active={sortOrder === "-score"}
          eventKey="-score"
          onSelect={setSortOrder}
        >
          Score (highest to lowest)
        </Dropdown.Item>

        <Dropdown.Item
          active={sortOrder === "score"}
          eventKey="score"
          onSelect={setSortOrder}
        >
          Score (lowest to highest)
        </Dropdown.Item>

        <Dropdown.Item
          active={sortOrder === "createdAt"}
          eventKey="createdAt"
          onSelect={setSortOrder}
        >
          Date (oldest to newest)
        </Dropdown.Item>

        <Dropdown.Item
          active={sortOrder === "-createdAt"}
          eventKey="-createdAt"
          onSelect={setSortOrder}
        >
          Date (newest to oldest)
        </Dropdown.Item>
      </DropdownButton>

      {submissions.length > 0 ? (
        <CardDeck className="d-flex flex-wrap">
          {submissions &&
            submissions.map((submission, index) => (
              <SubmissionCard
                id={submission._id}
                title={submission.title}
                body={summaryFor(submission)}
                key={submission._id}
              />
            ))}
        </CardDeck>
      ) : (
        <div className="w-100 text-center">
          <Spinner animation="border" role="status" />
        </div>
      )}
    </div>
  );
}

export default Index;
