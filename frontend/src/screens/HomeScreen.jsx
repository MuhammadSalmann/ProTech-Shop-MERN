import { useState, useEffect } from 'react'
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = () => {
            // through fetch
            // fetch('/api/products')
            // .then(res => res.json())
            // .then(data => setProducts(data))
            // .catch(err => console.log(err))
            // through axios
            axios.get('/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
        }
        fetchProducts()
    }, []);

  return (
    <>
    <h1>Latest Products</h1>
    <Row>
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen