
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

 import useSWR from 'swr';

//        {props.children}

export default function ArtworkCard(props) {

 
     const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
 
     if (data=={}){

      return null;
     }

     var imageUrl = data?.primaryImageSmall;

     if(data?.primaryImageSmall == "")
     imageUrl = "https://via.placeholder.com/375x375.png?text=%5B+Not+Available+%5D";



     var title = data?.title;
     if(data?.title == "")
     title = "N/A";

     var date = data?.objectDate;
     if(data?.objectDate == "")
     date = "N/A";
     
     var classification = data?.classification;

     if(data?.classification == "")
     classification = "N/A";

     var medium = data?.medium;

     if(data?.medium == "")
     medium = "N/A";

    return (
        <>
        
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
         <strong>Date: </strong> {date} <br></br>
         <strong>Classification: </strong> {classification}<br></br>
         <strong>Medium: </strong> {medium}


        </Card.Text>
        <Link  href={`/artwork/${props.objectID}`} passHref><Button className="btn btn-outline-dark" variant="light">ID: {props.objectID}</Button></Link>
      </Card.Body>
    </Card>

        </>
    )
  }
