import { GET_FILTER_CREATED, GET_RECIPES, GET_ORDER_BY_NAME, GET_ORDER_BY_SCORE, GET_FILTER_BY_DIETS, GET_NAME_RECIPES, GET_DIETS, GET_RECIPES_ID, GET_CLEAN } from "../actions";

const initialState={
    recipes:[],
    allRecipes:[],
    diets:[],
    detail:[]
}

function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                recipes:action.payload,
                allRecipes:action.payload
            }
           
                case GET_ORDER_BY_SCORE:
                    let sorteArr = action.payload === 'mas'?
                    state.recipes.sort(function(a,b){
                        if (a.healthScore> b.healthScore){
                            return 1;
                        }
                        if (b.healthScore>a.healthScore){
                            return -1;
                        }
                        return 0;
                    }) : // sino.....
                    state.recipes.sort(function(a,b){
                        if(a.healthScore>b.healthScore){
                            return -1;
                        }
                        if (b.healthScore>a.healthScore){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        recipes:sorteArr
                    }

                case GET_ORDER_BY_NAME:
                    let sortedArr = action.payload === 'asc'?
                            state.recipes.sort(function(a,b){
                                if (a.name.toLowerCase()> b.name.toLowerCase()){
                                    return 1;
                                }
                                if (b.name.toLowerCase()>a.name.toLowerCase()){
                                    return -1;
                                }
                                return 0;
                            }) : // sino.....
                            state.recipes.sort(function(a,b){
                                if(a.name.toLowerCase()>b.name.toLowerCase()){
                                    return -1;
                                }
                                if (b.name.toLowerCase()>a.name.toLowerCase()){
                                    return 1;
                                }
                                return 0;
                            })
                            return {
                                ...state,
                                recipes:sortedArr
                            }
                            case GET_FILTER_CREATED:
                                const allRecipes2=state.allRecipes;
                                const filter= action.payload==="created" ? allRecipes2?.filter(s=>s.createdInDb) : allRecipes2?.filter(s=>!s.createdInDb)
                                console.log(filter)
                                return{
                                    ...state,
                                    recipes: action.payload==="All" ? state.allRecipes : filter
                                    
                                } 
                            case GET_FILTER_BY_DIETS:
                                const allRecipes = state.allRecipes;
                                const filtByDiets = action.payload === 'all' ? 
                                allRecipes :
                                allRecipes ?.filter(recipe => {
                                    return recipe.diets?.find(diets =>  {
                                        return diets.name === action.payload || diets===action.payload}) 
                                })
                                return {
                                    ...state,
                                    recipes: filtByDiets
                                };
                                case GET_NAME_RECIPES:
                                    return{
                                        ...state,
                                        recipes:action.payload.error?[{Error:"No recipes Found"}] : action.payload,
                                    }
                                    case "POST_RECIPES":
                                        return{
                                            ...state,
                                        }
                                        case GET_DIETS:
                                            return{
                                                ...state,
                                                diets:action.payload
                                            }
                                            case GET_RECIPES_ID:
                                                return {
                                                    ...state,
                                                    detail: action.payload
                                                }
                                                case GET_CLEAN:
                                                    return{
                                                        ...state,
                                                        detail:[]
                                                    }

            default:
                return{
                    state
                };
    }
}
export default rootReducer;