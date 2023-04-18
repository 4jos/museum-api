
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
//        {props.children}

export default function Layout(props) {
    return (
        <>
 
        <MainNav/>
        
        <br />

        <Container>     
               {props.children}

        </Container>
        <br />

        </>
    )
  }