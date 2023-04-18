

import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ArtworkCardDetail from '../../components/ArtworkCardDetail'


export default function ArtworkObject() {
  const router = useRouter();
  const { objectID } = router.query;

  

  return (
    <>
 <Row>
 <Col>
 <ArtworkCardDetail objectID={objectID} />
 </Col>
</Row>
  
  </>
  )
  
}

