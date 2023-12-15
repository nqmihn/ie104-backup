import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizById } from "../../../../services/apiServices";

function ModalDeleteQuiz(props) {
  const { show, setShow, dataDelete, fetchQuiz } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete = async () => {
    const res = await deleteQuizById(dataDelete.id);
    if (res && res.statusCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    fetchQuiz();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa Bài Thi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài thi này ?
          <b> {dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitDelete}>
            Xóa
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;
