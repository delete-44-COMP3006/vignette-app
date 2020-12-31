import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Up from "./icons/up.icon";
import Down from "./icons/down.icon";
import SubmissionDataService from "../services/submission.service";
import "../scss/submission-card.scss";

function SubmissionCard(props) {
  // Define callbacks for GETting and SETting the votes
  const [hasVoted, setHasVoted] = useState(localStorage.getItem(`${props.id}VotedUp`) !== null);
  const [votedUp, setVotedUp] = useState(localStorage.getItem(`${props.id}VotedUp`) === "true");

  const vote = (isVoteUp) => {
    // If user has voted on this card previously and are making the same vote again, remove their vote
    // Otherwise set that they have voted and the direction of their vote
    setHasVoted(hasVoted ? isVoteUp !== votedUp : true);
    setVotedUp(isVoteUp)

    // This function is recreated when state changes, therefore at this point
    // even though we've updated hasVoted the value of hasVoted is the previous state
    // -> the function hasn't had a chance to recreate with the new state

    // Therefore when we send "hasVoted" and "votedUp" we are sending the
    // users *previous* state
    let params = {
      hasVoted: hasVoted,
      previousVote: votedUp,
      currentVote: isVoteUp
    };

    const response = SubmissionDataService.update(props.id, params);

    response
      .then((submission) => {
        console.log('Here')
      })
      .catch((error) => {
        console.log('Here :(')
      });
  }

  useEffect(() => {
    // When users voting status for this card changes, update or remove their vote from localStorage
    if (hasVoted) {
      localStorage.setItem(`${props.id}VotedUp`, votedUp)
    } else {
      localStorage.removeItem(`${props.id}VotedUp`)
    }
  }, [votedUp, hasVoted, props.id])

  return (
    <Card style={{ maxWidth: "21rem" }} className="mb-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/read/${props.id}`}>{props.title}</Link>
        </Card.Title>
        <Card.Text>{props.body}</Card.Text>

        <span className="d-inline-flex justify-content-around w-100">
          <Up size="24" filled={hasVoted && votedUp} onClick={() => {vote(true)}} />
          <Link to={`/read/${props.id}`}>Read</Link>
          <Down size="24" filled={hasVoted && !votedUp} onClick={() => {vote(false)}}/>
        </span>
      </Card.Body>
    </Card>
  );
}

export default SubmissionCard;
