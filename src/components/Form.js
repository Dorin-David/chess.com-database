function Form(props) {
    return (<div>
        <input type="text" placeholder="Lookup an user" 
        value={props.value} 
        onChange={e => props.handleFormChange(e)} 
        />
        <button onClick={props.submitSearch}>Search</button>
    </div>)

}

export default Form