// // // require("dotenv").config();
require("dotenv").config();
const axios = require("axios");
const {Recipe, Diet}=require("../db")
const {KEY}=process.env
// async function getDiets(){  
//     try { 
//       const dietas = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`);
//         // let dietas = respuesta;
//       const types = await dietas.data.results.map((t) => t.diets);  
//       const diets = types.flat();
//       const typeDiets = [...new Set(diets),"vegetarian"]; 
//       typeDiets.forEach(async (d) => {
//         await Diet.findOrCreate({ 
//           where: { name: d }, 
//         });
//       });
//       const allDiets = await Diet.findAll();
//       return allDiets;
//     } catch (error) {
//       console.log(error); 
//     }
//   };

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