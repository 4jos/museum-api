
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { useState , useEffect} from 'react';
import { favouritesAtom } from '@/store';
import useSWR from 'swr';
import { addToFavourites,removeFromFavourites } from '@/lib/userData';


 function LoadImage(prop) {
    const url = prop.url;
    if (url == "") {
     return   <Card.Text></Card.Text>;
    }
    return <Card.Img variant="top" src={prop.url} />;
  }

export default function ArtworkCardDetail(props) {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

 
  var addedDefault = false;

  if (favouritesList){

  
  for(var i = 0; i < favouritesList.length;i++){
  if(props.objectID==favouritesList[i]){
 
    addedDefault = true;
    break;
  }
  }


  }

  const [showAdded, setShowAdded] = useState(addedDefault);

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(props.objectID))
   }, [favouritesList])    

  async function favouritesClicked() {
    if (showAdded==true){
      setFavouritesList(await removeFromFavourites(props.objectID));

   // setFavouritesList(current => current.filter(fav => fav != props.objectID));
    
    } else {

      setFavouritesList(await addToFavourites(props.objectID))

     // setFavouritesList(current => [...current, props.objectID]);
      

    }

  }

  var variantButton = "";
  var addedButton;

  if (showAdded==true){
    addedButton="+ Favourite (added)";
    variantButton = "primary";
    } else {
      addedButton="+ Favourite";

      variantButton = "outline-primary";


    }

   
      const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

       if (data=={}){
  
        return null;
       }
  
       var imageUrl = data?.primaryImage;
  
       if(data?.primaryImage == "")
       imageUrl = "";
  
  
  
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
  


       var artistDisplayName = data?.artistDisplayName;
  
       if(data?.artistDisplayName == "")
       artistDisplayName = "N/A";

       var creditLine = data?.creditLine;
  
       if(data?.creditLine == "")
       creditLine = "N/A";

       
       var dimensions = data?.dimensions;
  
       if(data?.dimensions == "")
       dimensions = "N/A";
       

       var artistWikidata_URL = data?.artistWikidata_URL;
       var linkText = "wiki";
       if(data?.artistWikidata_URL == ""){
        linkText = "";
       artistWikidata_URL = "";

       }
      return (
          <>
          
          <Card style={{ width: '' }}>
           
            <LoadImage url={imageUrl}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
           <strong>Date: </strong> {date} <br></br>
           <strong>Classification: </strong> {classification}<br></br>
           <strong>Medium: </strong> {medium}<br></br><br></br>
           <strong>Artist: </strong> {artistDisplayName} <a href={artistWikidata_URL} target="_blank" rel="noreferrer" >{linkText}</a><br></br>

           <strong>Credit Line: </strong> {creditLine}<br></br> 
           <strong>Dimensions: </strong> {dimensions}<br></br> 

          </Card.Text>
          <Button variant = {variantButton} onClick={(e) =>favouritesClicked()}>{addedButton}</Button>
          <Link  href={`/artwork/${props.objectID}`} passHref><Button className="btn btn-outline-dark" variant="light">ID: {props.objectID}</Button></Link>
        </Card.Body>
      </Card>
  
          </>
      )
    }