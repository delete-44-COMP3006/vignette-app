import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmModal(props) {
  return (
    <Modal show={props.visible} onHide={props.closeAction}>
      <Modal.Header>
        <Modal.Title>{props.title || "Are you sure?"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{props.text}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeAction}>
          Cancel
        </Button>

        <Button variant="primary" onClick={props.confirmAction}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
