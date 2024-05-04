/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";

const updateproducts= () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
const params = useParams();
const navigate = useNavigate();

useEffect(()=>{
  // console.warn(params);
  getproductdetail();
},[])

const getproductdetail = async()=>{
  console.warn(params);
  let result = await fetch(`http://localhost:5000/product/${params.id}`,{
    headers:{
      authorization:` bear ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result = await result.json();
  setName(result.name);
  setPrice(result.price);
  setCategory(result.category);
  setCompany(result.company);

}
  const updateproduct= async () => {
   console.warn(name,price,category,company)
   let result = await fetch(`http://localhost:5000/product/${params.id}`,{
    method:'put',
    body:JSON.stringify({name,price,category,company}),
    headers: {
      'Content-Type':'application/json',authorization:` bear ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result = await result.json()
  console.warn(result)
  navigate('/')
  }
    return (
      <div className='product'>
        <h1>Update Product</h1>
        <input
          className='inputbox'
          onChange={(e) =>{setName(e.target.value)}}
          value={name}
          type='text'
          placeholder='Enter name'
        />
       
        <input
          className='inputbox'
          onChange={(e) =>{setPrice(e.target.value)}}
          value={price}
          type='text'
          placeholder='Enter price'
        />
         
        <input
          className='inputbox'
          onChange={(e) =>{setCategory(e.target.value)}}
          value={category}
          type='text'
          placeholder='Enter category'
        />
          
        <input
          className='inputbox'
          onChange={(e) =>{setCompany(e.target.value)}}
          value={company}
          type='text'
          placeholder='Enter company'
        />
          
        <button className='appbutton' onClick={updateproduct}>
          Update Product
        </button>
      </div>
    );
  };
  
  // Export statement at the bottom (or top level, but outside of any function)
  export default updateproducts;