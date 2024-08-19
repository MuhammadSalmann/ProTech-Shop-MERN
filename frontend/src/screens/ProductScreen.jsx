import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useGetProductDetailQuery } from "../slices/productsApiSlice";
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data,
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);
  const product = data?.product || {} // to avoid undefined error




  // const [product, setProduct] = useState({})

  // useEffect(() => {
  //     const fetchProduct = async () => {
  //         // through fetch
  //         // const res = await fetch(`/api/products/${productId}`)
  //         // const data = await res.json()
  //         // through axios
  //         const { data } = await axios.get(`/api/products/${productId}`)
  //         console.log(data)
  //         const { product } = data
  //         setProduct(product)
  //     }
  //     fetchProduct()
  // }, [productId])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
