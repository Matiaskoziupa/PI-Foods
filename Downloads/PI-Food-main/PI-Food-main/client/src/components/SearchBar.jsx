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
        if(name.length!==0 ){
            dispatch(getNameRecipes(name.toLowerCase()))
                
                
        } else {
            alert("You have to enter a word or your recipe dont exist")
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
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { getNameRecipes } from "../actions/index"
// // import s from '../Search/Search.module.css'



// const SearchBar = () => {

  
//     // const recipe= useSelector((state)=> state.recipe)
//     const dispatch =  useDispatch()
//     const [name,SetName]= useState("")
   

      

//     const handleChange = (e)=>{
//         e.preventDefault()
//           SetName(e.target.value)
        
  
//     }

//     const handleSubmit = (e)=>{
//         e.preventDefault()

//           dispatch(getNameRecipes(name));
//           SetName('');
          
//       }
    
   
  


//   return (
//     <div onSubmit={handleSubmit}>
   
//       <form action="">
//         <input type="text"
//                 placeholder='Buscar Recetas.. '
//                 value={name}
//                 onChange={handleChange}
//                 autoComplete='off'
               
//             />
//             </form>
         
           
//             <button onClick={handleSubmit} type="submit" value="">🍳</button>
//     </div>
//   )
// }

// export default SearchBar