
import React from "react";
// import { useLinkClickHandler } from "react-router-dom";

// import Detail from "./Detail";
import { Link } from "react-router-dom";
// import "./Card.css"

export default function Card({name,image,type}){

    return (
        <div className="card"> 
            <div className="card_items">
                <h3>{name}</h3>
                <h5>{ type&&type.join(" | ")}</h5>
                <img className="img" src= {image} alt="Not found" width="200px" height="250px" ></img>
                
            </div> 
        </div>      
    )
}