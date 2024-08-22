import { useState, useEffect } from "react"
import FormContainer from "../components/FormContainer"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [registerApiCall, {isLoading }] = useRegisterMutation()
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
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        } else {
            try {
                const res = await registerApiCall({ name, email, password }).unwrap() // Unwrap the promise
                dispatch(setCredentials({ ...res }))
                toast.success('Registeration Successful')
                navigate(redirect)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className="my-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
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

                <Form.Group controlId='password' className="my-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className="my-3" disabled={ isLoading }>
                    Register
                </Button>
            </Form>

            {isLoading && <Loader />}

            <Row className='py-3'>
                <Col>
                    Already a Customer? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen