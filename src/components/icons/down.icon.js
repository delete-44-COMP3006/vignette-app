import React from "react";
import "../../scss/icons.scss";

function Down(props) {
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
      className={`bi bi-caret-down${props.filled ? "-fill" : ""}`}
      viewBox="0 0 16 16"
      onClick={props.onClick}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="button"
    >
      {props.filled ? (
        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      ) : (
        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
      )}
    </svg>
  );
}

export default Down;
