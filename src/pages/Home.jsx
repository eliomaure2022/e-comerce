import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCategoriesThunk, getProductsThunk, inputSearchThunk } from '../store/slices/products.slice';
import { createCartThunk } from '../store/slices/cart.slice'

const Home = () => {

  const dispatch = useDispatch()

  const products = useSelector(state => (state.products))

  const [categoryList, setCategoryList] = useState([])

  const [search, setSearch] = useState('')


 



  useEffect(() => {
    dispatch(getProductsThunk())

    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then(res => setCategoryList(res.data.data.categories))
  }, [])

  const addProduct = (id) => {
    const products = {
      id: id,
      quantity: 1
    }
    dispatch(createCartThunk(products))
  }


  // console.log(categoryList);
  return (
    <div>
      <Row>
        {/* CATEGORIAS */}
        <Col lg={3}>
          <ListGroup>
            {
              categoryList.map(categories => (
                <ListGroup.Item
                  onClick={() => dispatch(filterCategoriesThunk(categories.id))}
                  style={{ cursor: 'pointer' }}
                >
                  {categories.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        {/* PRODUCTOS */}
        <Col lg={9}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder=""
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button
              variant="outline-secondary" id="button-addon2"
              onClick={() => dispatch(inputSearchThunk(search))}
              style={{color:'#fff'}}>
              Button
            </Button>
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map(product => (
              <Col>
                <Card style={{ width: '250px', height: '400px',background:'#ffff',color:'black'}} className='card'>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <Card.Img
                      variant="top"
                      src={product.productImgs?.[0]}
                       style={{ width: '100%',
                        aspectRatio: '3/2',
                        objectFit:'contain'}}
                    />
                    <Card.Body>
                      <Card.Title className='title' >{product.title}</Card.Title>
                    </Card.Body>
                  </Link>
                  <Card.Text>
                    <div className='price'>
                      <p>price: $ {product.price}</p>
                      <Button onClick={() => addProduct(product.id)}><i className="fa-solid fa-cart-plus"></i></Button>
                    </div>
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row >
    </div >
  );
};







export default Home;