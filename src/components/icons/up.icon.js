import React from "react";
import "../../scss/icons.scss";

function Up(props) {
  const onKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      props.onClick();
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "16"}
      height={props.size || "16"}
      fill="currentColor"
      className={`bi bi-caret-up${props.filled ? "-fill" : ""}`}
      viewBox="0 0 16 16"
      onClick={props.onClick}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="button"
    >
      <title>Vote up/like this submission</title>
      {props.filled ? (
        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      ) : (
        <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
      )}
    </svg>
  );
}

export default Up;
