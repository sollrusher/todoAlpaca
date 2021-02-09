import { React } from 'react';

export default function TodoItem (props){
    // const {title} = props;
    const title = 'Baga'
    return(
        <li>
            <p>{title}<input type="checkbox"></input></p>
        </li>
    )
}