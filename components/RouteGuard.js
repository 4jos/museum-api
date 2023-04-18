import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { readToken, removeToken } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { searchHistoryAtom, favouritesAtom} from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { isAuthenticated } from '@/lib/authenticate';



const PUBLIC_PATHS = ['/login', '/', '/_error','/register'];

export default function RouteGuard(props) {
    let token = readToken();

    const [authorized, setAuthorized] = useState(false);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);



  const router = useRouter();
 

async function updateAtoms(){
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
   }


  useEffect(() => {
    updateAtoms();
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {

    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }


    
  }

  return <>{authorized && props.children}</>
}