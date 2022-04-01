import React from "react";
import ReadOnlyParam from "./inputs/ReadOnlyParam";
import styled, {css} from 'styled-components'

function AddressInput({paramName, placeHolder, img, editable, setValue, visible, isFlex}) {
    const [items, setItems] = React.useState([]);
    const [activeItem, setActiveItem] = React.useState(0);
    const [activeLabel, setActiveLabel] = React.useState(placeHolder);
    const onSelectedItem = (e, index) => {
        setActiveItem(index)
        setActiveLabel(items[index])
        setValue(paramName, items[index])
        setItems([])
    }

    async function getAddresses(event) {
        console.log("addrInput")
        console.log(event)
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        let token = "f019553965d0c4ba18ed2ddb215c3c11cfaf4878";
        let query = event.target.value;

        let options = {
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
                if (suggestionItems.length === 0) {
                    suggestionItems.push("Адрес не найден")
                }
                setItems(suggestionItems)
                setActiveLabel(query)
            })
            .catch(error => {
                console.log("error", error)
                console.log("11111")
            });
    }

    function onKeyDown(e) {
        if (e.key === "ArrowDown") {
            let nextItem = activeItem + 1;
            if (nextItem < items.length) {
                setActiveItem(nextItem)
            }
        } else if (e.key === "ArrowUp") {
            let nextItem = activeItem - 1;
            if (nextItem >= 0) {
                setActiveItem(nextItem)
            }
        } else if (e.key === "Enter") {
            setActiveLabel(items[activeItem])
            setItems([])
        } else if (e.key === "Escape") {
            setItems([])
        }
    }

    return visible ? editable ?
            <Container>
                <p>{paramName}</p>
                <Input placeholder={placeHolder}
                       isFlex={isFlex} onInput={(e) => getAddresses(e)}
                       onKeyDown={(e) => onKeyDown(e)}
                       value={activeLabel}/>
                <ListItems items={items} activeItem={activeItem} onSelectedItem={onSelectedItem}/>
            </Container> :
            <ReadOnlyParam value={placeHolder} img={img} paramName={paramName}/> :
        <></>;
}

const Container = styled.div``

const Input = styled.input`
   ${({isFlex}) => {
    if (isFlex) {
        return css`
            display: flex;
            justify-content: center;`
    } else {
        return css`
                width: 360px;
                padding: 16px 0px 16px 20px;
                margin: 0px 20px 0px 0px;
                background: #EBEBEB;
                border: 0px;
                border-radius: 15px;
                color: black;`
    }
}
}
`

function ListItems({items, activeItem, onSelectedItem}) {
    let listItems = items.map((name, index) => {
        return <li
            className={activeItem === index ? 'active' : ''}
            onClick={(e) => onSelectedItem(e, index)}
            key={`${index}`}>{name}</li>
    });
    return items.length >0 && <div className='sortpopup__wrapper scroll'>
        <dl>
            {listItems}
        </dl>
    </div>
}

export default AddressInput;