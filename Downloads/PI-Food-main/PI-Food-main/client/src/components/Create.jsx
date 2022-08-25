import React from "react";
import { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { postRecipes, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";


function validate(input){
    let errors = {};

    if(input.name === ""){
        errors.name = "Name required!";   

    } else if(input.name.length < 3) {
        errors.name = 'Minimum 3 letters'

    } else if(!input.summary){
        errors.summary= "summary must be complete";

    } else if(input.summary.length < 20){
        errors.summary = 'Minimum 20 letters';

    } else if(input.score < 0 || input.score > 100){
        errors.score = 'Maximum up to 100'

    }else if(input.healthScore < 0 || input.healthScore> 100 ){
        errors.healthyScore = 'Maximum up to 100'

    }else if(input.dishTypes === ""){
        errors.dishTypes = "required field"

    }else if(input.diets.length === 0){
        errors.diets = "it has to be a different diet"

    }else if(!input.score){
        errors.score = "required field"
    }else if(!input.healthScore){
        errors.healthScore ="required field"
    }else if (!input.image.includes("https")) {
        errors.image = 'Please insert an image type URL'
    }else if(!input.steps){
        errors.steps = "required field"
    }
    // }else if(input.type.length !== input.type.length){
    //     errors.type= "it has to be a different diet"
    // }
   
   
    return errors;
}

export default function Create(){
    const dispatch=useDispatch()
    const history=useHistory()
    const diets=useSelector((state)=>state.diets)
    const[errors, setErrors]=useState({});
    // console.log(genres)

    const[input, setInput]=useState({
        name:"",
        summary: '',
        score: '',
        healthScore: '',
        steps: '',
        image:'',
        dishTypes:'',
        diets: [],
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }
    function handleSelect(e){
        const diets= input.diets.includes(e.target.value) ?
        alert("Equal genres cannot be added"):
        setInput({
            ...input,
            diets:[...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postRecipes(input))
        alert("Videogame created")
        setInput({
            name:"",
            summary: '',
            score: '',
            healthScore: '',
            steps: '',
            image:'',
            dishTypes:'',
            diets: [],     
        })
        history.push("/home")
    }
   

    useEffect(()=>{
        dispatch(getDiets())
    }, []);

  
    function handleDeleteDiets(e){
        e.preventDefault()
        setInput({
            ...input,
            diets: [] 
        });
        console.log(input)
    }
    

    return(
        <div className="createTop">
            
            <Link to="/home"><button className="btn3">Back</button></Link>
            <h1>Create your videogame</h1>
            <form className="Createcontainer" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type="text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.summary &&  (
                        <p>{errors.summary}</p>
                    )}
                </div>
                
                <div>
                    <label>Score:</label>
                    <input
                    type="number"
                    value={input.score}
                    name="score"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.score &&(
                        <p>{errors.score}</p>
                    )}
                </div>
                <div>
                    <label>Health score:</label>
                    <input
                    type="number"
                    value={input.healthScore}
                    name="healthScore"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.healthScore &&(
                        <p>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label>Steps:</label>
                    <input
                    type="text"
                    value={input.steps}
                    name="steps"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.steps &&  (
                        <p>{errors.steps}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Dish types:</label>
                    <input
                    type="text"
                    value={input.dishTypes}
                    name="dishTypes"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.dishTypes &&(
                        <p>{errors.dishTypes}</p>
                    )}
                </div>
               
                <div>
                <label >Diets:</label>
                <select required name="type" onChange={(e)=>handleSelect(e)}>
                    {diets&&diets.map((s)=>(
                        <option value={s.name}>{s.name}</option>
                    ))}
                </select>
                </div>
                <ul><li>{input.diets.map(s=>s + ",")}</li></ul>
                <button onClick={(e)=>handleDeleteDiets(e)}>X</button>
                {
                    input.name.length!==0 &&
                    <button className="btn4" type="submit" disabled={Object.entries(errors).length===0  ? false   : true}>Create videogame</button>}
            </form>
        </div>
    )
}
