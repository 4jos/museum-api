import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from 'react';
import { authenticateUser } from '@/lib/authenticate';
import { userData } from '@/lib/userData';

import { useRouter } from 'next/router';
import { favouritesAtom } from '@/store';
import { searchHistoryAtom } from '@/store';

 import { useAtom } from 'jotai';


export default function Login(props){


    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favourites, setFavouritesList] = useAtom(favouritesAtom);

    const [user, setUser] = useState('');
const [password, setPassword] = useState('');
const [warning, setWarning] = useState('');
const router = useRouter();

async function updateAtoms(){
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
   }

    async function handleSubmit(e) {
    e.preventDefault();
    try {
        await authenticateUser(user, password);
        router.push('/favourites');
        await updateAtoms();
      } catch (err) {
        setWarning(err.message);
      }

   }

  return (
    <>
    <br></br>    <br></br>

      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" id="userName" name="userName"  value={user} onChange={e => setUser(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" id="password" name="password" value={password}  onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
      { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}

    </>
  );
}