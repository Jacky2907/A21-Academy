import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetatData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { Navigate, useNavigate } from "react-router-dom";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (orderId) => {
        return orderId.getValue(orderId, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (orderId) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${orderId}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(orderId)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <table className="myOrdersTable">
            <thead>
              <tr> 
                {
                  columns.map(column => (
                    <th key={column.field}>{column.headerName}</th>
                  ))  
                } 
              </tr>
            </thead>   

            <tbody>   
            {
              rows.map(row => {  
                return (      
                  <tr key={row.id}>       
                    {
                      columns.map(column => {      
                        const value = row[column.field]; 
                            
                        if (column.field === 'actions') {
                          return <td key='actions'>{column.renderCell(row.id)}</td> 
                        }
                        const className =
                          column.field === "status"
                            ? row[column.field] === "Delivered"
                              ? "greenColor"
                              : row[column.field] === "Processing"
                              ? "yellowColor"
                              : "redColor"
                            : "";

                            const style = {
                              color: className === "yellowColor" ? "green" : className === "greenColor" ? "red" : "inherit",
                              fontWeight: className === "yellowColor" ? "bold" : className === "greenColor" ? "bold" : "normal",
                            };

                        return <td key={column.field} className={className} style={style}>{value}</td>  
                      })  
                    }
                  </tr>
                )    
              })  
            }
          </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
