import React, { useState, Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import MetaData from "../layout/MetatData";
import "./Search.css";
import { useDispatch } from "react-redux";

const Search = ( {history}) => {
    const navigate = useNavigate(); 
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          navigate(`/products/${keyword}`);
        } else {
          navigate("/products");
        }
    };

    return ( 
        <Fragment>
        <MetaData title="Search A Product -- ECOMMERCE" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    </Fragment>
     );
}
 
export default Search;