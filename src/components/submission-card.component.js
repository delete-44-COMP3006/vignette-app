import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Up from "./icons/up.icon";
import Down from "./icons/down.icon";
import "../scss/index.scss";

function SubmissionCard(props) {
  // Define callbacks for GETting and SETting the votes
  const [hasVoted, setHasVoted] = useState(false);
  const [votedUp, setVotedUp] = useState(false);

  return (
    <Card style={{ maxWidth: "21rem" }} className="mb-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/read/${props.id}`}>{props.title}</Link>
        </Card.Title>
        <Card.Text>{props.body}</Card.Text>

        <span className="d-inline-flex justify-content-around w-100">
          <Up size="24" filled={hasVoted && votedUp} />
          <Link to={`/read/${props.id}`}>Read</Link>
          <Down size="24" filled={hasVoted && !votedUp} />
        </span>
      </Card.Body>
    </Card>
  );
}

export default SubmissionCard;
