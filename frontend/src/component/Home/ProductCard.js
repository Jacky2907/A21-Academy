import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";



const productCard = ({product}) => {
  const options = {
    edit: false,
    color: "rgba(20,20, 20, 0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    
  };

    return ( <div>
        <Link className="productCard" to={`/product/${product._id}`}>
        {product.images && <img src={product.images[0].url} className="imgProd"/>}
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`${product.price.toLocaleString()} FCFA`}</span>
    </Link>
    </div> );
}
 
export default productCard;