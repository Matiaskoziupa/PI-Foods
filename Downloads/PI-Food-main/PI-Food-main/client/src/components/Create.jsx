import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets } from "../actions";

// export default function Create(){
//     const dispatch=useDispatch()
//     const history= useHistory()
//     const diets= useSelector((state)=>state.diets&&diets)
//     console.log(diets)

//     const[input, setInput]=useState({
//         name:"",
//         summary:"",
        // healthScore:"",
//         steps:"",
//         image:"",
//         diets:[]
//     })
//     function handleChange(e){
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         })
//         console.log(input)
//     }
//     function handleSelect(e){
//         setInput({
//             ...input,
//             diets:[...input.diets, e.target.value]
//         })
//     }
//     function handleSubmit(e){
//         e.preventDefault();
//         dispatch(postRecipes(input))
//         alert("Recipe create")
//         setInput({
//             name:"",
//             summary:"",
//             healthScore:"",
//             steps:"",
//             image:"",
//             diets:[]
//         })
//         history.push("/home")
//     }

//     useEffect(()=>{
//         dispatch(getDiets());
//     }, [])

//     return(
//         <form onClick={(e)=>handleSubmit(e)}>
//             <div>
//                 <div>
//                 <h1>Create videogame</h1>
//                 <button>
//                     <Link to="/home">Back</Link>
//                 </button>
//             </div>
//         <div>
//             <label>Name:</label>
//             <input
//             type="text"
//             value={input.name}
//             name="name"
//             onChange={(e)=>handleChange(e)}
//             />
//         </div>
//         <div>
//             <label>Summary:</label>
//             <input
//             type="text"
//             value={input.summary}
//             name="summary"
//             onChange={(e)=>handleChange(e)}
//             />
//         </div>
//         <div>
//             <label>Health score:</label>
//             <input
//             type="number"
//             value={input.healthScore}
//             name="healthScore"
//             onChange={(e)=>handleChange(e)}
//             />
//         </div>
//         <div>
//             <label>Steps:</label>
//             <input
//             type="text"
//             value={input.steps}
//             name="steps"
//             onChange={(e)=>handleChange(e)}
//             />
//         </div>
//         <div>
//             <label>Image:</label>
//             <input
//             type="text"
//             value={input.image}
//             name="image"
//             onChange={(e)=>handleChange(e)}
//             />
//         </div>
//         <select onChange={(e)=>handleSelect(e)}>
//             {diets&&diets.map((s)=>(
//                 <option value={s.name}>{s.name}</option>
//             ))} 
//         </select>
//         </div>
//         <ul><li>{input.diets&&diets.map(s=>s + ", ")}</li></ul> 
//         </form>
     
//     )
// }
export default function Create(){


const validate = () =>{
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

    }else if(input.healthyScore < 0 || input.healthyScore> 100 ){
        errors.healthyScore = 'Maximum up to 100'

    }else if(input.dishTypes === ""){
        errors.dishTypes = "required field"

    }else if(input.type.length === 0){
        errors.type = "it has to be a different diet"

    }else if(!input.score){
        errors.score = "required field"
    }else if(!input.healthyScore){
        errors.healthyScore ="required field"
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





// Validates 

    const dispatch = useDispatch()
     const diet = useSelector(state=> state.diets)
    //  console.log(diet)
     let navigate = useHistory();
    const [errors, setErrors] = useState({})
    const [input,setInput]=useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        steps: '',
        image:'',
        dishTypes:'',
        diets: [],
    })

    const handleChange = (e)=>{

        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.value]:e.target.value
        }))
        //  console.log(input)
    }

    const handleSelect = (e)=>{

        if(input.diets.includes(e.target.value)){
            return 'Diet Type exists'
        }else{
            setInput({
                ...input,
                type:[...input.diets,e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            [e.target.value]:e.target.value
        }))
        //  console.log(input)
    }


    const handleDelete= (el)=>{
        setInput({
            ...input,
            diets: input.diets.filter(e => e !== el)
        })
    } 

    const handleSubmit = (e)=>{
        e.preventDefault()
        setErrors(validate(input));
        const errorSave = validate(input);
        if(Object.values(errorSave).length !== 0){
          alert('The recipe is not created, fill in the required fields!')
        }else{
            dispatch(postRecipes(input))
            alert("recipe created successfully")
            setInput({
                name: '',
                summary: '',
                score: '',
                healthScore: '',
                steps: '',
                image:'',
                dishTypes:'',
                diets: [],
            })
            // history.push('/home')
        }
          
        
                
      
    }

    useEffect(() => {
      dispatch(getDiets())
    }, [dispatch])
    

  return (
    <div >
        <Link to="/home" >
            <span>back</span>        
        </Link>

        <form action="" onSubmit={(e)=> handleSubmit (e)}>

                <label htmlFor="">URL Img</label>
            <div>
                    <input
                    type="text"
                    value={input.image}
                    name='image'
                    onChange={handleChange}
                    />
                    {
                        errors.image && (
                            <p>{errors.image}</p>
                        )
                    }
                    
            </div>

                <label htmlFor="">name</label>
            <div>
                    <input
                    type="text"
                    value={input.name}
                    name='name'
                    onChange={handleChange}
                    />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
            </div>

                <label htmlFor="">summary</label>
            <div>
                    <input
                    type="text"
                    value={input.summary}
                    name="summary"
                    onChange={handleChange}
                    />
                    {
                        errors.summary && (
                            <p>{errors.summary}</p>
                        )
                    }
            </div>

                  <label htmlFor="">dishTypes</label>
            <div>
                    <input
                    type="text"
                    value={input.dishTypes}
                    name="dishTypes"
                    onChange={handleChange}
                    />
                     {
                        errors.dishTypes && (
                            <p>{errors.dishTypes}</p>
                        )
                    } 
             </div> 

                <label htmlFor="">Score</label>
            <div>
                    <input
                    type="number"
                    value={input.score}
                    name="score"
                    placeholder='0-100'
                    min="1"
                    max="100"
                    onChange={handleChange}
                    />
                     {
                        errors.score && (
                            <p>{errors.score}</p>
                        )
                    }
            </div>

                <label htmlFor="">HealthyScore</label>
            <div>
               
                    <input
                    type="number"
                    value={input.healthyScore}
                    name="healthyScore"
                    placeholder='0-100'
                    min="1"
                    max="100"
                    onChange={handleChange}
                    />
                      {
                        errors.healthyScore && (
                            <p>{errors.healthyScore}</p>
                        )
                    }
            </div>

                <label htmlFor="">Step by Step</label>
            <div>
                <textarea onChange={handleChange} type="text" name="steps" value={input.steps}>

                </textarea>
                    
                     {
                        errors.steps && (
                            <p>{errors.steps}</p>
                        )
                    }

            </div>
            

            <div>


                <select  onChange={handleSelect}>
                    <option value={input.diets} name="type">Diet..</option>
                     {/* <option name="" value={input.autor}>Autor</option> */}
                    {
                        diet?.map(c=> {
                            return(
                             
                                <option key={c.id} value={c.name}>{c.name}</option>
                                
                            )
                        })
                    }
                 
                </select>  
            
                    
                    {
                        errors.diets && (
                            <p>{errors.diets}</p>
                        )
                    }
                  
                   

            </div>
                    
            

           <button type='submit' onSubmit={handleSubmit}>Crear</button>
           
        </form>

        <div>
            {input.diets.map((el) => (
            <div key={el}>
            <span >{el}</span >
            <button onClick={() => handleDelete(el)}> x </button>
            </div>
        ))}
        </div>

    </div>
  )
}