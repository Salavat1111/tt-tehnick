import {FaMapMarkerAlt} from "react-icons/fa";
import TextInput from "./TextInput";

function AddressInput(props) {
    return <TextInput {...props} img = {<FaMapMarkerAlt/>}/>;
}
export default AddressInput;