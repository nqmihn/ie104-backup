import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = (props) => {
  const LIMIT_USER = 8;
  const [pageCount, setPageCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [userData, setUserData] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const fetchListUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUsers(res.DT.users);
    }
  };
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.statusCode === 0) {
      setListUsers(res.data.users);
      setPageCount(res.data.totalPages);
    }
  };
  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, []);
  const handleClickBtnUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  };
  const handleClickViewUpdate = (user) => {
    setShowViewUser(true);
    setUserData(user);
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };
  const resetDataUpdate = () => {
    setDataUpdate({});
  };
  const resetViewUser = () => {
    setUserData({});
  };
  return (
    <div className="manage-user-container">
      <div className="title">Quản lý User</div>
      <div className="user-content">
        <div>
          <button
            className="btn btn-primary my-3"
            onClick={() => setShowModal(true)}
          >
            <FcPlus /> Thêm người dùng
          </button>
        </div>
        <div className="table-user-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickViewUpdate={handleClickViewUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            pageCount={pageCount}
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickViewUpdate={handleClickViewUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModelCreateUser
          show={showModal}
          setShow={setShowModal}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          dataUpdate={dataUpdate}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          resetDataUpdate={resetDataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showViewUser}
          setShow={setShowViewUser}
          userData={userData}
          resetViewUser={resetViewUser}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          setDataDelete={setDataDelete}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default ManageUser;
