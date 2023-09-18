import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { CgMouse } from "react-icons/cg";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetatData";
import {clearErrors, getProduct} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


const Home = () => {
   const alert = useAlert();
   const dispatch = useDispatch();
   const {products, loading, error} = useSelector((state) => state.products);

   useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearErrors);
    }
    dispatch(getProduct());
   }, [dispatch, error, alert]);
   
    return ( 
    <Fragment>

        {loading ? (
            <Loader />
        ): (
        <Fragment>

            <MetaData title="bzzWorld Ecommerce" />
            <div className="banner">
                
                {/* <h1>FIND AMAZING PRODUCTS BELOW</h1> */}

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Features Products</h2>

            <div className="container" id="container">
            {products &&
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />

                ))}
            </div>
    </Fragment>
    )}
    </Fragment>
     );
}
 
export default Home;