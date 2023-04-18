import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useForm } from 'react-hook-form';
import { useState , useEffect} from 'react';
import { useRouter } from 'next/router'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';


function Search() {

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  var router= useRouter();

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
          q: ""
        }
      });
      useEffect(() => {
        let data = {
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
          q: ""
        }

        for (const prop in data) {
            setValue(prop, data[prop]);
          }
        }, [])
      
        async function submitForm(data) {
          console.log(data);



         // if(data.q=="1")
 
          var geoLocationTag = "&geoLocation=";
          if(data.geoLocation==""){

            geoLocationTag = "";

          }
          var mediumTag = "&medium=";
          if(data.medium==""){

            mediumTag = "";

          }

          router.push(`/artwork?${data.searchBy}=true${geoLocationTag}${data.geoLocation}${mediumTag}${data.medium}&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`);
         // setSearchHistory(current => [...current, [`?${data.searchBy}=true${geoLocationTag}${data.geoLocation}${mediumTag}${data.medium}&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`]]);
          setSearchHistory(await addToHistory(`${data.searchBy}=true${geoLocationTag}${data.geoLocation}${mediumTag}${data.medium}&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`));

         }

 


  return (
    <>
 <br></br> <br></br>

 <Form onSubmit={handleSubmit(submitForm)}>
  <Row>
    <Col>
      <Form.Group className="mb-3" >
        <Form.Label>Search Query</Form.Label>
        <Form.Control {...register("q")} type="text"  placeholder="" name="q"  required="true"/>
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col md={4}>
      <Form.Label>Search By</Form.Label>
      <Form.Select {...register("searchBy")}name="searchBy" className="mb-3">
 
        <option  value="title">Title</option>
        <option value="tags">Tags</option>
        <option value="artistOrCulture">Artist or Culture</option>
      </Form.Select>
    </Col>
    <Col md={4}>
      <Form.Group className="mb-3">
        <Form.Label>Geo Location</Form.Label>
        <Form.Control {...register("geoLocation")} type="text" placeholder="" name="geoLocation" />
        <Form.Text className="text-muted">
        Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
      </Form.Text>
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group className="mb-3">
        <Form.Label>Medium</Form.Label>
        <Form.Control {...register("medium")}  type="text" placeholder="" name="medium"/>
        <Form.Text className="text-muted">
        Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
      </Form.Text>
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Check {...register("isHighlight")}
        type="checkbox"
        label="Highlighted"
        name="isHighlight"
      />
      <Form.Check  {...register("isOnView")}
        type="checkbox"
        label="Currently on View"
        name="isOnView"
      />
    </Col>
  </Row>
  <Row>
    <Col>
      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Col>
  </Row>
</Form>
 
    </>

  );


}

export default Search;