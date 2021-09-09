import {FiExternalLink} from 'react-icons/fi';

function LinkIcon(props){
    return <a href={props.link} target="_blank" rel="noreferrer"><FiExternalLink /></a>
}

export default LinkIcon