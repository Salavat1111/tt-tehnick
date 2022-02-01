import {FaMapMarkerAlt} from "react-icons/fa";
import TextInput from "./TextInput";

function AddressInput(props) {
    const {paramName, value, editLink} = props;
    return <TextInput paramName={paramName} value = {value} editLink={"/rooms/5-5"} img = {<FaMapMarkerAlt/>}/>;
}
export default AddressInput;