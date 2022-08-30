import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRecipesId, getClean } from "../actions";
import {Link, useParams} from "react-router-dom"




export default function Detail(props){
    console.log(props)
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getRecipesId(props.match.params.id))
    },[dispatch])
    const myRecipes= useSelector((state)=>state.detail)

    return(
        <div>
            <Link to="/home">Back</Link>
            {
                myRecipes&&myRecipes.length>0 ?
                <div>
                    <h1>{myRecipes[0].name}</h1>
                    <h3>Types: {!myRecipes[0].createdInDb ? myRecipes[0].diets.join(" || ") : myRecipes[0].diets.map(s=>s.name).join(" || ")}</h3>
                    <h3>Dish types: {!myRecipes[0].createdInDb ? myRecipes[0].dishTypes.join(" || ") : myRecipes[0].dishTypes}</h3>
                    <h3>Health score: {myRecipes[0].healthScore}</h3>
                    <h5>Steps: {!myRecipes[0].createdInDb ? myRecipes[0].steps?.map(s=>s.step) : myRecipes[0].steps}</h5>
                    <img src={myRecipes[0].image} alt="Not found" width="200px" height="250px"></img>
                    <h6>{myRecipes[0].summary} </h6>
                </div> : <p>Loading...</p>
            } 
        </div> 
        
    )
}