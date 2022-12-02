import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkOutThunk, deleteCartThunk, getCartThunk, updateCartThunk } from '../store/slices/cart.slice';

const SidebarCart = ({show, handleClose}) => {

  const dispatch = useDispatch()

  const cartList = useSelector(state => state.cartslice)

  const [totalItem, setTotalItem]= useState(null)

  const [totalPrice,setTotalPrice]=useState(0)

  useEffect(() => {
    dispatch(getCartThunk())
  }, [])

  const updateProduct=(product)=>{
    const newProduct={
      id:product.id,
      newQuantity:product.productsInCart.quantity+1
    }
    dispatch(updateCartThunk(newProduct))
  }

  const upProduct=(product)=>{
    const newProduct={
      id:product.id,
      newQuantity:product.productsInCart.quantity-1
    }
    dispatch(updateCartThunk(newProduct))
  }

  useEffect(()=>{
    let total=0;
    cartList.forEach(product => {
      total += product.price * product.productsInCart.quantity;
    });
    setTotalPrice(total);
  },[cartList])

  return (
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            cartList.map(cart=>(
              <li key={cart.id}>
                <p>{cart.title} </p>
                <p>price: ${(Number(cart.price)*Number(cart.productsInCart.quantity)).toFixed(2)}</p>
                <p>quantity: {cart.productsInCart.quantity}</p>
                <Button onClick={()=>upProduct(cart)}>-</Button>
                <input type="number" value={cart.productsInCart.quantity} onChange={(e)=>setTotalItem(e.target.value)}/>
                <Button onClick={()=>updateProduct(cart)}>+</Button>
                <Button onClick={()=>dispatch(deleteCartThunk(cart.id))}><i className="fa-solid fa-trash-can"></i></Button>
              </li>
              
            ))
          }
        </Offcanvas.Body>
        <h2>total:{totalPrice}</h2>
        <Button onClick={()=>dispatch(checkOutThunk())}>Checkout</Button>
      </Offcanvas>
  );
};

export default SidebarCart;