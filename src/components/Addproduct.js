
import React, { useState } from "react";

const Addproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
 const [error,seterror] = useState("")
  const addProducts= async () => {
    console.warn(!name);
    if(!name || !price || !category || !company){
      seterror(true);
      return false;
    }
    // Logic to handle the product addition
    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
// console.warn(userId._id)
    let result = await fetch("http://localhost:5000/addproduct", {
      method: "post",
      body:JSON.stringify({ name, price, category, company,userId}),
      headers: {
        "Content-Type": "application/json",
        authorization:` bear ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.warn(result);
  }
    return (
      <div className='product'>
        <h1>Add Product</h1>
        <input
          className='inputbox'
          onChange={(e) =>{setName(e.target.value)}}
          value={name}
          type='text'
          placeholder='Enter name'
        />
        {error && !name && <span className="valid">Enter a valid name</span>}
        <input
          className='inputbox'
          onChange={(e) =>{setPrice(e.target.value)}}
          value={price}
          type='text'
          placeholder='Enter price'
        />
           {error && !price && <span className="valid">Invalid Price</span>}
        <input
          className='inputbox'
          onChange={(e) =>{setCategory(e.target.value)}}
          value={category}
          type='text'
          placeholder='Enter category'
        />
           {error && !category && <span className="valid">Invalid category</span>}
        <input
          className='inputbox'
          onChange={(e) =>{setCompany(e.target.value)}}
          value={company}
          type='text'
          placeholder='Enter company'
        />
           {error && !company && <span className="valid">Invalid company</span>}
        <button className='appbutton' onClick={addProducts}>
          Add Product
        </button>
      </div>
    );
  };
  
  // Export statement at the bottom (or top level, but outside of any function)
  export default Addproduct;