import {useState} from 'react';
import UserCard from "./containers/userCard/userCard";
import UserStats from './containers/userStats/UserStats';
import Form from "./components/UI/Form/Form";
import './style/base.css'

function App() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [user, setUser] = useState(null);

  function handleFormChange(e){
    setQuery(e.target.value)
  }

  function submitSearch() {
    if (!query) return setSearching(false);
    setSearching(true)
    setUser(query.trim().toLowerCase())
    setQuery('')
}

 let userInfo = null;
 if(searching) {
   userInfo = (<>
   <UserCard user={user}/> 
   <UserStats user={user}/>
   </>)
 }

  return (<>
  <Form handleFormChange={handleFormChange} submitSearch={submitSearch} value={query}/>
  {userInfo}
  </>)
}

export default App;
