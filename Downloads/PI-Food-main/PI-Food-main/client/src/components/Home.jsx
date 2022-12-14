import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes, getFilterCreated, getOrderByName, getOrderByScore, getFilterByDiets } from "../actions";
import Card from "./Card";
import Paginado from "./Paginated";
import SearchBar from "./SearchBar";
import "./Home.css";
import "./Loading.css";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    // let [loading,setLoading]= useState(true);
    console.log(allRecipes)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes && allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    console.log(currentRecipes)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    const [orden, setOrden] = useState("")

    function handleClick(e) {
        e.preventDefault();
        window.location.reload()
    }
    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(getFilterCreated(e.target.value));
        setCurrentPage(1)
        setRecipesPerPage(9)
    }
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(getOrderByName(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleOrderByScore(e) {
        e.preventDefault();
        dispatch(getOrderByScore(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
        setCurrentPage(1)
    }
    function handleFilterByDiets(e) {
        e.preventDefault();
        dispatch(getFilterByDiets(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }




    return (

        <div>
            <Link to="/recipes"><button className="btn2">Create recipe</button></Link>
            <div>
                <h1 className="titles">Foods</h1>
                <SearchBar
                    setCurrentPage={setCurrentPage}
                    setRecipesPerPage={setRecipesPerPage}
                />
                <div>
                    <button className="btn2reload" onClick={(e) => handleClick(e)}>Reload all recipes</button>
                    <select className="select" onChange={(e) => handleFilterCreated(e)}>
                        <option value="All">Sort created-all</option>
                        <option value="alpha"> All</option>
                        <option value="created"> created</option>
                    </select>
                    <select className="select" onChange={(e) => handleOrderByName(e)}>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <select className="select" onChange={(e) => handleOrderByScore(e)}>
                        <option value="mas">Lowest to highest</option>
                        <option value="menos">Highest to lowest</option>
                    </select>
                    <select className="select" onChange={(e) => handleFilterByDiets(e)}>
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
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes?.length}
                    paginado={paginado}

                />
            </div>
            <div className="CONTAINER">
                {currentRecipes && currentRecipes.map((s) => {
                    return (

                        <Link key={s.id} to={`/recipe/${s.id}`}>
                            <Card name={s.name} image={s.image} diets={!s.createdInDb ? s.diets : s.diets?.map(s => s.name)} />
                        </Link>

                    );
                })}
            </div>
        </div>
    )
}