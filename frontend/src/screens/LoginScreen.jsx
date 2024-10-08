import { useState, useEffect } from "react"
import FormContainer from "../components/FormContainer"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, {isLoading }] = useLoginMutation()
    const auth = useSelector((state) => state.auth)
    const { userInfo } = auth

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap() // Unwrap the promise
            dispatch(setCredentials({ ...res }))
            toast.success('Login successful')
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className="my-3" disabled={ isLoading }>
                    Sign In
                </Button>
            </Form>

            {isLoading && <Loader />}

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen