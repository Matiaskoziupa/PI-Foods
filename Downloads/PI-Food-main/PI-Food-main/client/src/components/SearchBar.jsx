import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";

export default function SearchBar({setCurrentPage, setRecipesPerPages}){
    const dispatch=useDispatch()
    const [name, setName]=useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        if(name.length!==0){
            dispatch(getNameRecipes(name.toLowerCase()))
        } else {
            alert("Enter a word before searching...")
        }
        setName("")
        setCurrentPage(1)
        
    }

    return(
        <div className="searchInputCONT">
            <input className="searchInput"
            type="text"
            placeholder="Search..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button className="btn2" type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )

}