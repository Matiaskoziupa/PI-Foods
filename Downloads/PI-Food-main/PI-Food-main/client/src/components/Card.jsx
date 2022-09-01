
import React from "react";
// import { useLinkClickHandler } from "react-router-dom";

// import Detail from "./Detail";
import { Link } from "react-router-dom";
import "./Card.css"

export default function Card({name,image, diets}){
    return (
        <fragment>
        <div className="card"> 
            <div className="card_items">
                <h3 className="name">{name}</h3>
                <img className="img" src= {image} alt="Not found" width="200px" height="250px" ></img>
                <h5 className="dietas">{ diets&&diets.join(" | ")}</h5>
                
            </div> 
        </div>   
        </fragment>   
    )
}