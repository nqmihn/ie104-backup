import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
  const { show, setShow, dataDelete, fetchListUsersWithPaginate } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete = async () => {
    let res = await deleteUser(dataDelete.id);
    if (res && res.statusCode === 0) {
      toast.success(res.message);
      handleClose();
      props.setCurrentPage(1);
      await fetchListUsersWithPaginate(1);
    }
    if (res && res.statusCode !== 0) {
      toast.error(
        typeof res.message === "string" ? res.message : res.message[0]
      );
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa User này ?
          <b>
            {" "}
            Email: {dataDelete && dataDelete.email ? dataDelete.email : ""}
          </b>
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

export default ModalDeleteUser;
