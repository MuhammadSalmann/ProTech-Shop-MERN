import { LinkContainer } from "react-router-bootstrap"
import { Row, Col, Table, Button } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"
import { FaEdit, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import Paginate from "../../components/Paginate"


const ProductListScreen = () => {
    const {pageNumber} = useParams()
    const { data: prods, isLoading, isError, refetch } = useGetProductsQuery({pageNumber})
    const { products } = prods || { products: [] }

    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();
    
    const handleDelete = async (id) => {
        if(window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id)
                toast.success('Product Deleted')
                refetch();
            } catch(err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const createProductHandler = async () => {
        if(window.confirm('Are you sure?')) {
            try {
                await createProduct()
                toast.success('Product Created')
                refetch();
            } catch(err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    
  return (
    <>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-end'>
            <Button className='btn-sm m-3' onClick={createProductHandler}>
               <FaEdit /> Create Product 
            </Button>
            </Col>
        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? (
            <Loader />
        ) : isError ? (
            <Message variant='danger'>{isError}</Message>
        ) : (
            <>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                        <FaEdit />
                        </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={()=>handleDelete(product._id)}>
                        <FaTrash style={{color: 'white'}} />
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
            <Paginate pages={prods.pages} page={prods.page} isAdmin={true} />
            </>
        )}
    </>
  )
}

export default ProductListScreen