import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import axios from 'axios'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
    const { pageNumber } = useParams()
    const {data, isLoading, error} = useGetProductsQuery({pageNumber})
    const { products } = data || { products: [] }  // destructuring products from data or setting it to an empty array if data is undefined

    // const [products, setProducts] = useState([])

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         // through fetch
    //         // fetch('/api/products')
    //         // .then(res => res.json())
    //         // .then(data => setProducts(data))
    //         // .catch(err => console.log(err))
    //         // through axios
    //         axios.get('/api/products')
    //         .then(res => {
    //             const { products } = res.data
    //             setProducts(products)
    //         })
    //         .catch(err => console.log(err))
    //     }
    //     fetchProducts()
    // }, []);

  return (
    <>
    {isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
        <>
        <h1>Latest Products</h1>
        <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} />
        </>
    )}
    </>
  )
}

export default HomeScreen