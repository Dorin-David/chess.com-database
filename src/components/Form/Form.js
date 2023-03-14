import style from './form.module.css';

function Form(props) {
    return (<form className={style.wrapper} 
            onSubmit={ props.submitSearch }>
                <input type="text" placeholder="Lookup an user" 
                        className={style.form}
                        value={props.value} 
                        onChange={e => props.handleFormChange(e)} 
                />
                <button className={style.button}>Search</button>
            </form>)

}

export default Form