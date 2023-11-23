import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducer/Slice";

const Header = () => {
    const user = useSelector((state) => state.user);
    // const isLoggedIn = user.isLoggedIn;
    const dispatch = useDispatch();
    console.log(user.isLoggedIn);
    const navigate=useNavigate();

    const handleLogout = () => {

        dispatch(logout());
        navigate("/");

    };

    const navbarStyle = {
        backgroundColor: 'black',
    };
    const redText = {
        color: 'white',
        fontFamily: 'Netflix Sans, Arial, sans-serif', // Apply the custom font
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={navbarStyle}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" style={{ color: 'red', fontFamily: 'Netflix Sans, Arial, sans-serif', paddingLeft: '25px', paddingRight: '20px' }}>
                    <FontAwesomeIcon icon={faVideoSlash} />Cineflix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/" style={redText}>Home</NavLink>
                        {/* <NavLink className="nav-link" to="/watchList" style={redText}>Watch List</NavLink> */}
                        <NavLink className="nav-link" to="/trending" style={redText}>Trending Movies</NavLink>
                    </Nav>


                    {user.isLoggedIn ? (
                        <div>

                            <Link to={`/profile/${user.email}`} style={{ color: 'white', paddingRight: '20px'}}>
                                Favourite Movies
                            </Link>
                            <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
                        </div>


                    ) : (
                        <div>
                            <Link to="/login">
                                <Button variant="outline-info" className="me-2">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="outline-info">Register</Button>
                            </Link>
                        </div>
                    )}


                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header