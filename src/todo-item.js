import { React } from 'react';

export default function TodoItem ({id, title, done, createdAt}){
    console.log(title)
    
    return(
        <li>
            <p>{title}<input type="checkbox" checked={done}></input></p>
        </li>
    )
}