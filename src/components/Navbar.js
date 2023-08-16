import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import {useCart} from './ContextReducer';
import Modal from "../Modal";
import Cart from "../screens/Cart";
export default function Navbar() {
  const[cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const data = useCart();

  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/");
  }
  
  
  return (
    <div>
      <nav 
      style={{
        backgroundImage:'url("https://images.unsplash.com/photo-1589496933738-f5c27bc146e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60")'
      }}
      className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic " to="/">
           Deliver Dish
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                  My Orders
                </Link>
              </li>
            :""}
            </ul>{
              (!localStorage.getItem("authToken"))?
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login" >Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </div>
              :
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                MyCart{" "}
                <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : ""}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>LogOut</div>
              </div>
             }
          </div>
        </div>
      </nav>
    </div>   
  );
}