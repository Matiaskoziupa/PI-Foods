import React from "react";
import "./Paginated.css"

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers =[];
    for(let i= 1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
    pageNumbers.push(i)
    };
    return (
        <nav className="page li">
            <ul>
                {pageNumbers.map((number)=>(
                    <li  >
                        <a className="btn" onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul> 
        </nav>
    );
}
