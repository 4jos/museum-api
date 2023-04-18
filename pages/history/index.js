import { searchHistoryAtom } from '@/store';

import { useAtom } from 'jotai';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/History.module.css';

import { useRouter } from 'next/router'
import { removeFromHistory } from '@/lib/userData';





 

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    
    if(!searchHistory) return null;

    var router= useRouter();

    console.log(searchHistory + "-");

    let parsedHistory = [];
    searchHistory.forEach(h => {
        console.log(h);
     let params = new URLSearchParams(h.toString());
     let entries = params.entries();
     parsedHistory.push(Object.fromEntries(entries));
    });
  console.log(parsedHistory);

  async function removeHistoryClicked(e, index){
    e.stopPropagation(); // stop the event from trigging other events
/*setSearchHistory(current => {
 let x = [...current];
 x.splice(index-1, 1)
 return x;
});*/

setSearchHistory(await removeFromHistory(searchHistory[index-i]));


  }
  function historyClicked(e, index){
    router.push(`/artwork?${searchHistory[index-1]}`);
console.log(index);

  }

var final = [];
  if( parsedHistory.length > 0){

    for (var i = 0; i < parsedHistory.length; i++){
      var item = [];

      Object.keys(parsedHistory[i])
  .forEach(function eachKey(key) { 
    item.push(key);
    item.push(<>: <strong>{parsedHistory[i][key]}</strong> </>);

    console.log(key); // alerts key 
    console.log(parsedHistory[i][key]); // alerts value
            });

     final.push(<ListGroup.Item className={styles.historyListItem} variant="primary" onClick={(e) => { historyClicked(e,i)}}>{item}<Button className="float-end" variant="danger" size="sm"
     onClick={e => removeHistoryClicked(e, i)}>&times;</Button></ListGroup.Item>);
   
      };

   } else {

     return  <>   <br></br>     <br></br>
     <Card>
     <h4>Nothing Here</h4></Card> </>
   }

  return (
    <>
    <br></br>    <br></br>

    <ListGroup>

    {final}
    </ListGroup>

    </>
  )
}