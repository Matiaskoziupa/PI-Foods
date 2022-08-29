import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRecipesId, getClean } from "../actions";
import {Link, useParams} from "react-router-dom"


// export default function Detail(){
// const dispatch=useDispatch();
// const details=useSelector((state)=>state.detail)
// console.log(details)

// const {id} = useParams();
// useEffect(()=>{
//     dispatch(getRecipesId(id))
//     dispatch(getClean())
// }, [dispatch, id])

// return(
//     <div>
//         <Link to="/home">Back</Link>
//         { 
//                 Object(details).length!==0? <div className="infocard">
//                 <div className=" info1">
//                     <h1 className="h1">{details&&details.name}</h1>
//                     {/* <h5>Platforms: {myVideo&&myVideo.platforms?.join(" | ")} </h5> */}
//                     <h2>Types: {details&&details.type?.join(" | ")} </h2>
//                     {/* <h4>Released: {myVideo&&myVideo.type}  {myVideo&&myVideo.diets.map(s=>s.name)}</h4> */}
//                     <h4>Dish types: {details&&details.dishTypes}</h4> 
//                     <h4>Summary: {details&&details.summary}</h4>
//                     <h4>Health score: {details&&details.healthScore}</h4> 
//                 </div>
//                 <img className="imge" src={details&&details.image} alt="Not found" width="200px" height="200px" />
//                <div className="info2">
//              {/* <p dangerouslySetInnerHTML={{__html: details&&details.steps}}></p> */}
//              </div>
//             </div> : <div>Loading...</div>}
//     </div>
// )}

export default function Detail(props){
    console.log(props)
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getRecipesId(props.match.params.id))
        dispatch(getClean())
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