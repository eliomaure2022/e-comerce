import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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

  const relatedProducts = productsList.filter(suggestedProduct => suggestedProduct.category.id === productFound.category?.id)

  console.log(relatedProducts);
  // console.log(productsList);

  return (
    <div>
      <h1>{productFound?.title}</h1>
      <br />
      <p>{productFound?.description}</p>
      <div className='detail'>
        <div className='scroll-img'>
          <img src={productFound.productImgs?.[0]} alt="" /><img src={productFound.productImgs?.[1]} alt="" /><img src={productFound.productImgs?.[2]} alt="" />
        </div>
        <div>
          <h2>Related products:  </h2>
          {
            relatedProducts.map(product => (
              <Link to={`/product/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};



export default ProductDetail;




