import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
 import Nav from 'react-bootstrap/Nav';
 import Form from 'react-bootstrap/Form';
 import { useRouter } from 'next/router'
 import Link from 'next/link';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';


function MainNav() {


  
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();


  var router= useRouter();

   function logout() {
    setExpanded(false);
    removeToken();
    router.push('/');
  }
  const [search, setSearch] = useState('');
  const [isExpanded,setExpanded] = useState(false);


  async function submitForm(e) {
    e.preventDefault(); // prevent the browser from automatically submitting the form

    setExpanded(!isExpanded)
    //isExpanded = false;
   // alert(`form submitted - userName: ${userName}`);

    router.push(`/artwork?title=true&q=${search}`);

    setSearchHistory(await addToHistory(`title=true&q=${search}`)) 
   

  }
  let userName = localStorage.getItem('userName');



  return (
    <>
 

    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top" expanded={isExpanded}>
      <Container fluid>
        <Navbar.Brand href="#">Joshua Wong</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" onClick={(e) =>setExpanded(!isExpanded)}/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           {!token && <Nav>
             <Link href="/register" passHref legacyBehavior><Nav.Link href="/register">Register</Nav.Link></Link>
              <Link href="/login" passHref legacyBehavior><Nav.Link href="/login">Login</Nav.Link></Link>


            </Nav>
}
         <Nav.Link active={router.pathname === "/search"}href="/">Home</Nav.Link>
           {token && <Link href="/search" passHref legacyBehavior><Nav.Link href="/search">Advanced Search</Nav.Link></Link>}

          
          </Nav>


          {token &&  

          <Form onSubmit={submitForm}  className="d-flex">
       <Form.Control               type="search"
className="me-2" value={search} placeholder="Search"
              aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
     
      <Button variant="outline-success" type="submit">Search</Button>
    </Form>
}
     
{token &&  
 <Nav
 className=""
 style={{ maxHeight: '100px' }}
 navbarScroll
>    
    <NavDropdown  title={userName} id="basic-nav-dropdown" > 
    <Link href="/favourites" passHref>       
              <NavDropdown.Item href="/favourites">Favourites</NavDropdown.Item></Link>    
              <Link href="/history" passHref>       
<NavDropdown.Item href="/history">
History
              </NavDropdown.Item></Link>
           
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>

            </NavDropdown>
            
           
            </Nav> }
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </>

  );


}

export default MainNav;




