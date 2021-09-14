import style from './spinner.module.css';
function Spinner(props){
    return <div className={props.central ? [style.loader, style.central].join(' ') : style.loader}>Loading...</div>
}

export default Spinner