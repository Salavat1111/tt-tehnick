import {FaChevronRight, FaEdit} from "react-icons/fa";

function TextInput(props) {
    let {paramName, value, editLink, img} = props;
    if (!img) {
        img = <FaEdit/>
    }
    return <div className="order__content">
        <div className="container__fasource">
            <div className="svg__content">
                {img}
            </div>
            <div className="">
                <p className="title__menu">{paramName}</p>
                <p className="title__text">{value}</p>
            </div>
        </div>
        <div className="forward">
            <a href={editLink}><FaChevronRight/></a>
        </div>
    </div>;
}

export default TextInput;