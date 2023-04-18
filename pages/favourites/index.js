import { favouritesAtom } from '@/store';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Pagination from 'react-bootstrap/Pagination'
import validObjectIDList from '../../public/data/validObjectIDList.json'
import { useAtom } from 'jotai';

import ArtworkCard from '../../components/ArtworkCard'
//import { useState , useEffect} from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr';





const PER_PAGE = 12;

 

 
export default function Favourites() {
   
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const final = [];

  if(!favouritesList) return null;

console.log(favouritesList);


//if(favouritesList){
  if( favouritesList.length > 0){

     for (var i = 0; i < favouritesList.length; i++){

      final.push(<Col lg={3} key={favouritesList[i]}><ArtworkCard objectID={favouritesList[i]} /></Col>);
    
      };

    } else{

      return  <>   <br></br>     <br></br>
      <h4>Nothing Here</h4> </>
    }



    //}

  return (
    <>
    <br></br>
    <Row className="gy-4">
    {final}
    </Row>
    
    </>
  )
}