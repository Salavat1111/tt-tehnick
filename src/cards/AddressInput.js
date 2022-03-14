import React from "react";

function AddressInput({paramName, placeHolder, img, editable, setValue, visible}) {
    const [items, setItems] = React.useState([]);
    const [activeItem, setActiveItem] = React.useState(0);
    const [showPopup, setShowPopup] = React.useState(false);
    const [activeLabel, setActiveLabel] = React.useState(placeHolder);
    const onSelectItem = (e, index) => {
        setActiveItem(index)
        setShowPopup(false)
        setActiveLabel(items[activeItem])
        setValue(paramName, items[activeItem])
    }

    async function getAddresses(event) {
        console.log("addrInput")
        var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        var token = "f019553965d0c4ba18ed2ddb215c3c11cfaf4878";
        var query = event.target.value;

        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: query})
        }

        fetch(url, options)
            .then(response => response.text())
            .then(result => {
                let suggestionItems = JSON.parse(result).suggestions.map(item => item.value);
                setItems(suggestionItems)
                setShowPopup(true)
                setActiveLabel(query)
            })
            .catch(error => {
                console.log("error", error)
                console.log("11111")
            });
    }

    return visible ?
        editable ?
            <>
                <div className="block__setting-input">
                    <p>{paramName}</p>
                        <input onInput={(e) => getAddresses(e)} className='sort__span2'
                               value={activeLabel}/>
                    {showPopup && <div className='sortpopup__wrapper'>
                        <ul>
                            <li>
                                {items.map((name, index) => (
                                    <li
                                        className={activeItem === index ? 'active' : ''}
                                        onClick={(e) => onSelectItem(e, index)}
                                        key={`${name}_${index}`}
                                    >{name}</li>
                                ))}
                            </li>
                        </ul>
                    </div>}
                </div>
            </> :
            (<div className="order__content">
                <div className="container__fasource">
                    <div className="svg__content">
                        {img}
                    </div>
                    <div className="">
                        <p className="title__menu">{paramName}</p>
                        <p className="title__text">{placeHolder}</p>
                    </div>
                </div>

            </div>)
        : <></>;
}

export default AddressInput;