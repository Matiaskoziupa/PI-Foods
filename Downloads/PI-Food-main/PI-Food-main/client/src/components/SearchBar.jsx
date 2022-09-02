import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import "./SearchBar.css"

export default function SearchBar({ setCurrentPage, setRecipesPerPages }) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (name.length !== 0) {
            dispatch(getNameRecipes(name.toLowerCase()))
        } else {
            alert("You have to enter a word or your recipe dont exist")
        }
        setCurrentPage(1)
        setName("")

    }

    return (
        <div className="searchInput">
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleInputChange(e)}
            />
            <button className="btn2" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )

}
