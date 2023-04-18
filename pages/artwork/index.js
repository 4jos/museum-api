import validObjectIDList from '../../public/data/validObjectIDList.json'

 import styles from '@/styles/Home.module.css'
 import Col from 'react-bootstrap/Col'
 import Row from 'react-bootstrap/Row'
 import Pagination from 'react-bootstrap/Pagination'

 import ArtworkCard from '../../components/ArtworkCard'
 import { useState , useEffect} from 'react';
 import { useRouter } from 'next/router'
 import useSWR from 'swr';
 

 const PER_PAGE = 12;

 

 
export default function Artwork() {

    const [artworkList, setArtworkList] = useState();
    const [page, setpage] = useState(1);

    const router = useRouter();

    let finalQuery;


    
  finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    useEffect(() => {
//
   //   if(router.isReady){
 
        console.log(router.asPath);
         var results = [];

         
         let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));

    for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
      const chunk = filteredResults.slice(i, i + PER_PAGE);
      results.push(chunk);
     }

    // console.log(results);
     //
 
setArtworkList(results);

setpage(1);
//console.log(artworkList);

     //  }
  }, [data]);





    


    function previousPage(){

if(page > 1){
setpage(page - 1);

}

    }
    function nextPage(){

      if(page < artworkList.length
        
        ){
        setpage(page+1);
        console.log(page)
        }
        
    }


   
    const final = [];

console.log(artworkList);


if(artworkList){
  if( artworkList.length > 0){

     for (var i = 0; i < artworkList[page-1].length; i++){

      final.push(<Col lg={3} key={artworkList[page-1][i]}><ArtworkCard objectID={artworkList[page-1][i]} /></Col>);
    
      };

    } else{

      return  <>   <br></br>     <br></br>
      <h4>Nothing Here</h4> </>
    }



    }
    

  return (
    <>
    <br></br>         <br></br>

    <Row className="gy-4">
    {final}
    </Row>
    <Pagination>

    <Pagination.Prev   onClick={previousPage}/>       <Pagination.Item>{page}</Pagination.Item>
 <Pagination.Next    onClick={nextPage}/> 
    </Pagination>
    </>
  )
}
