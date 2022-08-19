import axios from "axios";
export const GET_RECIPES="GET_RECIPES";
export const GET_FILTER_CREATED="GET_FILTER_CREATED"
export const GET_ORDER_BY_NAME="GET_ORDER_BY_NAME"
export const GET_ORDER_BY_SCORE="GET_ORDER_BY_SCORE"
export const GET_FILTER_BY_DIETS="GET_FILTER_BY_DIETS"
export const GET_NAME_RECIPES="GET_NAME_RECIPES"

export function getRecipes(){
    return async function(dispatch){
        let json= await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type:"GET_RECIPES",
            payload: json.data
        })
    }
}
export function getFilterByDiets(payload){
    return{
     type:"GET_FILTER_BY_DIETS",
     payload
    }
 }
export function getFilterCreated(payload){
    return {
        type:"GET_FILTER_CREATED",
        payload
    }
}
export function getOrderByScore(payload){
    return{
        type:"GET_ORDER_BY_SCORE",
        payload:payload
    }
} 
export function getOrderByName(payload){
    return{
        type:"GET_ORDER_BY_NAME",
        payload
    }
}
export function getNameRecipes(payload){
    return async function (dispatch){
        try{
            var json= await axios.get(`http://localhost:3001/recipes?name=${payload}`)
            return dispatch({
                type:"GET_NAME_RECIPES",
                payload:json.data
            })
        } catch(error){
            window.alert("You have to enter a word");
        }
    }
}
