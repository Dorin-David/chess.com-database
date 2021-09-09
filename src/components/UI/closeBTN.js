import { IoMdClose } from 'react-icons/io';

function CloseButton(props){
    return <IoMdClose onClick={props.handleClosing}/>
}

export default CloseButton