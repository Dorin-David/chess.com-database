import {useState} from 'react';
import UserData from './containers/userData/userData';
import Form from "./components/Form/Form";
import WelcomeInfo from './components/WelcomeInfo/WelcomeInfo';
import './style/base.css'

function App() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [user, setUser] = useState(null);

  function handleFormChange(e){
    if( e.target.value ) setQuery(e.target.value); 
  }

  function submitSearch(event) {
    event.preventDefault()

    if (!query) return 

    setSearching(true)
    setUser(query.trim().toLowerCase())
    setQuery('')
}

 let userInfo = null;
 if(searching) {
   userInfo = <UserData user={user}/>
 }
 
  return (<>
  {!searching ? <WelcomeInfo/> : null}
  <Form handleFormChange={handleFormChange} submitSearch={submitSearch} value={query}/>
  {userInfo}
  </>)
}

export default App;
