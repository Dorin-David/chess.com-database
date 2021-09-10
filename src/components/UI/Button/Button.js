import style from './button.module.css'
function Button(props){
    return <button className={style.button} onClick={props.onButtonClick}>{props.children}</button>
}

export default Button