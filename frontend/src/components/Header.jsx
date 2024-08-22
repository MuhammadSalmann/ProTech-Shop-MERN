import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logoutApiCall()
            dispatch(logout())
            toast.success('Logout successful')
            navigate('/login')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
    
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>
                <img src={logo} alt="ProTech" />
                ProTech
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                <LinkContainer to='/cart'>
                <Nav.Link>
                    <FaShoppingCart /> Cart
                    {cartItems.length > 0 && (
                        <Badge pill bg='success' className='ms-1'>
                            {cartItemsCount}
                        </Badge>
                    )}
                </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <LinkContainer to='/login'>
                    <Nav.Link>
                        <FaUser /> Sign In
                    </Nav.Link>
                    </LinkContainer>
                )}
                
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header