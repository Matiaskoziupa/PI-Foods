// // // require("dotenv").config();
require("dotenv").config();
const axios = require("axios");
const {Recipe, Diet}=require("../db")
const {KEY}=process.env

async function getDiets(){
    const api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`);
    const diets= await api.data.results.map((s)=>s.diets).flat();
    diets.forEach((s)=>{
        Diet.findOrCreate({
            where: {name:s},
        });
    });
    return await Diet.findAll();
};
module.exports={
    getDiets
}