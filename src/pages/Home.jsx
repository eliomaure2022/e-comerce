import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoriesThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

  const dispatch = useDispatch()

  const products = useSelector(state => (state.products))

  const [categoryList, setCategoryList] = useState([])


  //https://e-commerce-api.academlo.tech/api/v1/products?category=4



  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(res => setCategoryList(res.data.data.categories))
  }, [])

  console.log(categoryList);
  return (
    <div>
      <h1>home</h1>
      <Row>
        {/* CATEGORIAS */}
        <Col>
      {
        categoryList.map(categories => (
          <Button onClick={() => dispatch(filterCategoriesThunk(categories.id))}>{categories.name}</Button>
        ))
      }
        </Col>
        {/* PRODUCTOS */}
        <Col>
      <ul className='products-container' >
        {
          products.map(product => (
            <li key={product.id} className='product'>
              <Link to={`/product/${product.id}`}>
                <div>
                  {product.title}
                </div>
                <br />
                <div>
                  <img src={product.productImgs?.[0]} alt="" />
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
        </Col>
      </Row>
    </div>
        
  );
};



export default Home;