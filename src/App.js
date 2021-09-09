import {useState} from 'react';
import UserCard from "./containers/userCard";
import Form from "./components/Form";

/*
1) prepare form logic and pass it to the userCard components; make sure we never pass an empty value
*/

function App() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [user, setUser] = useState(null)

  function handleFormChange(e){
    setQuery(e.target.value)
  }

  
  function submitSearch() {
    if (!query) return setSearching(false);
    // if (!query) return 
    setSearching(true)
    setUser(query)
    setQuery('')
}

  return (<>
  <Form handleFormChange={handleFormChange} submitSearch={submitSearch} value={query}/>
 {searching ? <UserCard user={user} /> : null}
  </>)
}

export default App;
