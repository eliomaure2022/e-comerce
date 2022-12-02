import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createCartThunk, getCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  const productsList = useSelector(state => state.products)

  const productFound = productsList.find(newList => newList.id === Number(id))
  // console.log(productFound);

  const relatedProducts = productsList.filter(suggestedProduct =>
    suggestedProduct.category.id === productFound.category?.id &&
    suggestedProduct.id !== productFound.id
  )

  console.log(relatedProducts);
  // console.log(productsList);

  const [rate, setRate] = useState(null)


  const addProduct = () => {
    const productsInCart = {
      id: productFound.id,
      quantity: rate
    }
    console.log(productsInCart);
    dispatch(createCartThunk(productsInCart))
  }

  return (
    <div>
      <h1>{productFound?.title}</h1>
      <Row>
        <div className='detail'>
          <Col lg={9}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block-w-100"
                  src={productFound?.productImgs?.[0]}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block-w-100"
                  src={productFound?.productImgs?.[1]}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block-w-100"
                  src={productFound?.productImgs?.[2]}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            <div>
              <p>{productFound?.description}</p>
              <h2>Price: $ {productFound?.price}</h2>
            </div>
          </Col>
          <Col lg={3} >
            <div>
              <h2>Related products:  </h2>
              <ListGroup variant="flush" >
                <div>

                  <ListGroup.Item >
                    {
                      relatedProducts.map(product => (
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }} key={product.id}>
                          <h3>{product?.title}</h3>
                        </Link>
                      ))
                    }
                  </ListGroup.Item>
                  <div style={{marginTop:'100px'}}>
                    <Button onClick={() => setRate(rate - 1)}>-</Button>
                    <input
                      type="text"
                      value={rate}
                      onChange={e => setRate(e.target.value)}
                      style={{ maxWidth: '40px' }}
                    />
                    <Button onClick={() => setRate(rate + 1)} style={{marginRight:'20px'}}>+</Button>
                    <Button onClick={addProduct}>Add item</Button>
                  </div>
                </div>
              </ListGroup>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
};


export default ProductDetail;












