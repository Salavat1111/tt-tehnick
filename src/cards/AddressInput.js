import React from "react";

function AddressInput(props) {
    const [items, setItems] = React.useState([]);
    const [activeItem, setActiveItem] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    const [activeLabel, setActiveLabel] = React.useState(items[activeItem]);
    const onSelectItem = (index) => {
        setActiveItem(index)
        setVisible(false)
        setActiveLabel(items[activeItem])
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
                setVisible(true)
                setActiveLabel(query)
            })
            .catch(error => {
                console.log("error", error)
                console.log("11111")
            });
    }

    return <>
        <div className="sortpopup__block2">
            <input onInput={(e) => getAddresses(e)} className='sort__span2'
                   value={activeLabel}/>
        </div>
        {visible && <div className='sortpopup__wrapper'>
            <ul>
                <li>
                    {items.map((name, index) => (
                        <li
                            className={activeItem === index ? 'active' : ''}
                            onClick={() => onSelectItem(index)}
                            key={`${name}_${index}`}
                        >{name}</li>
                    ))}
                </li>
            </ul>
        </div>}

    </>
        ;
}

export default AddressInput;