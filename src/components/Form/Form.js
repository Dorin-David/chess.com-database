import style from './form.module.css';

function Form(props) {
    return (<div className={style.wrapper}>
        <input type="text" placeholder="Lookup an user" 
        className={style.form}
        value={props.value} 
        onChange={e => props.handleFormChange(e)} 
        />
        <button onClick={props.submitSearch} className={style.button}>Search</button>
    </div>)

}

export default Form