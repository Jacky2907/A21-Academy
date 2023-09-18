import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetatData";
import LaunchIcon from "@material-ui/icons/Launch";
import {ReactTable} from 'react-table';


const MyOrders = () => {

  const dispatch = useDispatch();
  
  const { loading, error, orders } = useSelector((state) => state.myOrders);  
  const { user } = useSelector((state) => state.user);
  
  const alert = useAlert();
  
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
          <Link to={`/order/${orderId}`}>
            <LaunchIcon />    
          </Link>    
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    }); 

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  
    return ( 
      <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
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
          <Typography id="myOrdersHeading">{user && user.name ? `${user.name}'s Orders` : 'Loading...'}</Typography>
        </div>
      )}
    </Fragment>
     );
  }
   
  export default MyOrders;