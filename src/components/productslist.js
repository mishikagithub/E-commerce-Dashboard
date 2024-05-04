/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const productlist = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/product",{
      headers:{
        authorization:` bear ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setproducts(result);
  };
  // console.warn("products", products);
  const deleteproduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers:{
        authorization:` bear ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      getproducts();
    }
  };

  const searchproduct = async(event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization:` bear ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json();
      if(result){
        setproducts(result);
      }
    }else{
    getproducts();
      }
    }
  
  return (
    <div className='product-list'>
      <h1 >products List</h1>
      <input className="search-product" type="text" placeholder="Search" onChange={searchproduct}/>
      <ul>
        <li><b>S.No</b></li>
        <li><b>Name</b></li>
        <li><b>Price</b></li>
        <li><b>Category</b></li>
        <li><b>Company</b></li>
        <li><b>Opration</b></li>
      </ul>
      {
      products.length>0?products.map((item, index) => 
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li> $ {item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteproduct(item._id)}><b>Delete</b></button>
            <Link to={"/update/"+ item._id}>Update</Link>
          </li>
        </ul>
      ):
      <h1>No result found</h1>
      }
    </div>
  );
};
export default productlist;
