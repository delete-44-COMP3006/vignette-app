import React from "react";
import Form from "react-bootstrap/Form";

function New(props) {
  return (
    <div className="w-50 ml-auto mr-auto">
      <Form>
        <Form.Control type="text" placeholder="Name your submission" />
        <Form.Control as="textarea" rows={3} placeholder="Please enter a short summary of your story. If left blank, an excerpt will be taken from your submission..." />
        <Form.Control as="textarea" rows={10} placeholder="Write!" />
      </Form>
    </div>
  );
}

export default New;
