import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchasesThunk } from '../store/slices/purchases.slice';
import { Link } from 'react-router-dom';

const Purchases = () => {

  const dispatch = useDispatch()

  const purchases = useSelector(state => state.purchases)

  useEffect(() => {
    dispatch(purchasesThunk())
  }, [])

  return (
    <div>
      <h1>purchases</h1>
      {
        purchases.map(purchase => (
          <li>{purchase.createdAt}
            {
              purchase.cart.products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <p>{product.title}</p>
                  <p>{product.status}</p>
                </Link>
              ))
            }
          </li>
        ))
      }
    </div>
  );
};
export default Purchases;



