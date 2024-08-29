import { Badge, Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/ProTech-logo.png'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'
import SearchBox from './SearchBox'


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
        <Container>
        <Navbar className='p-0' bg='primary' variant='dark' expand='md' collapseOnSelect>
            <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>
                <Image width={70} height={70} src={logo} alt="ProTech" />
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto w-100 d-flex align-items-center'>
                <div className='mx-auto'>
                    <SearchBox />
                </div>
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
                {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    </NavDropdown>
                )}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </Container>
        
    </header>
  )
}

export default Header