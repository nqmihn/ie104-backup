import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function ModelResult(props) {
  const { show, setShow, dataResult, handleShowAnswer, setIndex } = props;
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    handleClose();
    handleShowAnswer();
    setIndex(0);
  };
  const handleBack = () => {
    navigate("/users");
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Kết quả</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Tổng điểm: {dataResult.countTotal}</div>
          <div>Số câu đúng: {dataResult.countCorrect}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleShow}>
            Hiện đáp án
          </Button>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelResult;
