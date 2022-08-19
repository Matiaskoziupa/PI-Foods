import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";

export default function SearchBar({setCurrentPage, setRecipesPerPage}){
    const dispatch=useDispatch()
    const [name, setName]=useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        if(name.length!==0){
            dispatch(getNameRecipes(name))
        } else {
            alert("Enter a word before searching...")
        }
        setName("")
        setCurrentPage(1)
        
    }

    return(
        <div>
            <input
            type="text"
            placeholder="Search..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )

}