import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSearchedTerm } from '../../features/searchHistory/searchedTermHistorySlice';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ShoppingCartDropdown from './ShoppingCartDropdown';

const MainNavbar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useDispatch();

  function handleSubmit(ev: any) {
    if (!searchInput.trim()) {
      return;
    }
    dispatch(addSearchedTerm(searchInput));

    setSearchInput('');
  }

  return (
    <Navbar
      collapseOnSelect
      className=" position-sticky top-0 "
      expand="lg"
      bg="light"
      variant="light"
      style={{ zIndex: 100 }}
    >
      <Container style={{ padding: '0' }}>
        <Link className="navbar-brand" to="/">
          Company Name
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto form-group">
            <Link className="nav-link" to="/products">
              Products
            </Link>
            <div
              className="form-group"
              style={{ display: 'flex', width: '330px', marginLeft: '15px' }}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={(ev) => {
                  setSearchInput(ev.target.value);
                }}
              />
              <Link
                onClick={handleSubmit}
                type="button"
                className="btn btn-outline-dark"
                to={`/products/${searchInput}`}
                style={{marginLeft: '10px'}}
              >
                Search
              </Link>
            </div>
          </Nav>
          <Nav>
            <Link to="/viewed" className="nav-link btn">
              Viewed products
            </Link>
            <ShoppingCartDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
