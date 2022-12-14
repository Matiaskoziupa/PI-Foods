import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "./Create.css"


export default function Create() {


    // Validates 

    function validate() {
        let errors = {};

        if (input.name === "") {
            errors.name = "Name required!";

        } else if (input.name.length < 3) {
            errors.name = "Minimum 3 letters"

        } else if (!input.summary) {
            errors.summary = "summary must be complete";

        } else if (input.summary.length < 20) {
            errors.summary = "Minimum 20 letters";

        } else if (input.healthScore < 0 || input.healthScore > 100) {
            errors.healthScore = "Maximum up to 100"

        } else if (input.dishTypes === "") {
            errors.dishTypes = "required field"

        } else if (input.diets?.length === 0) {
            errors.diets = "it has to be a different diet"

        } else if (!input.healthScore) {
            errors.healthScore = "required field"
        } else if (!input.image.includes("https")) {
            errors.image = "Please insert an image type URL"
        } else if (!input.steps) {
            errors.steps = "required field"
        }
        // }else if(input.type.length !== input.type.length){
        //     errors.type= "it has to be a different diet"
        // }


        return errors;
    }





    // Validates 

    const dispatch = useDispatch()
    const diet = useSelector(state => state.diets)
    //  console.log(diet)
    let history = useHistory();
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        dishTypes: "",
        diets: [],
    })

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
        //  console.log(input)
    }

    const handleSelect = (e) => {

        if (input.diets.includes(e.target.value)) {
            return "Diet Type exists"
        } else {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
        //  console.log(input)
    }


    const handleDelete = (el) => {
        setInput({
            ...input,
            diets: input.diets.filter(e => e !== el)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(input));
        const errorSave = validate(input);
        if (Object.values(errorSave).length !== 0) {
            alert("The recipe is not created, fill in the required fields!")
        } else {
            dispatch(postRecipes(input))
            alert("recipe created successfully")
            setInput({
                name: "",
                summary: "",
                healthScore: "",
                steps: "",
                image: "",
                dishTypes: "",
                diets: [],
            })
            history.push("/home")
        }




    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    return (
        <div className="formulario">
            <Link to="/home" className="linkB" >
                <span>back</span>
            </Link>

            <form action="" onSubmit={(e) => handleSubmit(e)} className="fondoform" >

                <label htmlFor="">URL Img</label>
                <div>
                    <input className="inputt"
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={handleChange}
                    />
                    {
                        errors.image && (
                            <p className="error">{errors.image}</p>
                        )
                    }

                </div>
                <label htmlFor="">name</label>
                <div>
                    <input className="inputt"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    {
                        errors.name && (
                            <p className="error">{errors.name}</p>
                        )
                    }
                </div>

                <label htmlFor="">summary</label>
                <div>
                    <input className="inputt"
                        type="text"
                        value={input.summary}
                        name="summary"
                        onChange={handleChange}
                    />
                    {
                        errors.summary && (
                            <p className="error">{errors.summary}</p>
                        )
                    }
                </div>

                <label htmlFor="">dishTypes</label>
                <div>
                    <input className="inputt"
                        type="text"
                        value={input.dishTypes}
                        name="dishTypes"
                        onChange={handleChange}
                    />
                    {
                        errors.dishTypes && (
                            <p className="error">{errors.dishTypes}</p>
                        )
                    }
                </div>

                <label htmlFor="">HealthScore</label>
                <div>

                    <input className="inputs"
                        type="number"
                        value={input.healthScore}
                        name="healthScore"
                        placeholder="0-100"
                        min="1"
                        max="100"
                        onChange={handleChange}
                    />
                    {
                        errors.healthScore && (
                            <p className="error">{errors.healthScore}</p>
                        )
                    }
                </div>

                <label htmlFor="">Step by Step</label>
                <div>
                    <textarea className="textar" onChange={handleChange} type="text" name="steps" value={input.steps}>

                    </textarea>

                    {
                        errors.steps && (
                            <p className="error">{errors.steps}</p>
                        )
                    }

                </div>


                <div className="op">


                    <select className="selet" onChange={handleSelect}>
                        <option value={input.diets} name="type">Diet..</option>
                        {/* <option name="" value={input.autor}>Autor</option> */}
                        {
                            diet && diet.map(c => {
                                return (

                                    <option key={c.id} value={c.name}>{c.name}</option>

                                )
                            })
                        }

                    </select>


                    {
                        errors.diets && (
                            <p className="error">{errors.diets}</p>
                        )
                    }



                </div>



                <button className="bto" type="submit" onSubmit={handleSubmit}>Crear</button>

            </form>

            <div className="xx">
                {input.diets.map((el) => (
                    <div key={el} className="a">
                        <span >{el}</span >
                        <button className="bt" onClick={() => handleDelete(el)}> x </button>
                    </div>
                ))}
            </div>

        </div>
    )
}

