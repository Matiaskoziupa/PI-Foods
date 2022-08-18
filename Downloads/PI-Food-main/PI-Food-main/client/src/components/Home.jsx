import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../actions";
import Card from "./Card";

export default function Home(){
    const dispatch=useDispatch();
    const allRecipes=useSelector((state)=>state.recipes)

    useEffect(()=>{
        dispatch(getRecipes());
    }, [])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

return(

    <div>
        <Link to="/recipes"><button>Create recipe</button></Link>
        <div>
            <h1>Foods</h1>
            <div>
                <button onClick={(e)=>handleClick(e)}>Reload all recipes</button>
                <select>
                    <option value="All">Sort created-all</option>
                    <option value="alpha"> All</option>
                    <option value="created"> created</option>
                </select>
                <select>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select>
                    <option value="mas">High score</option>
                    <option value="menos">Less score</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                </select>
            </div>
        </div>
        <div className="CONTAINER">
            {allRecipes&&allRecipes.map((s)=>{
                return(
                   
                        <Link key={s.id} to={`/recipes/${s.id}`}>
                            <Card name={s.name} image={s.image} type={s.type || s.diets.map(s=>s.name) }/>
                        </Link>
                    
                );
            })}
            </div>
    </div>
)
}