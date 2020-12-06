import React from "react";
import { useParams } from "react-router-dom";

function Show(props) {
  let { id } = useParams();

  return (
    <div className="w-75 ml-auto mr-auto">
      ID: { id }
    </div>
  );
}

export default Show;
