import {FaEnvelope} from "react-icons/fa";
import TextInput from "./TextInput";

function EmailInput(props) {
    const {paramName, value, editLink} = props;
    return <TextInput paramName={paramName} value={value} editLink={"/rooms/4-4"} img={<FaEnvelope/>}/>;
}

export default EmailInput;