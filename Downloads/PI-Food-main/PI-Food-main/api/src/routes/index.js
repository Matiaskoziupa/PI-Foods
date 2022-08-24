// import Diet from '../models/Diet';
// import Recipe from '../models/Recipe';
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { Router } = require('express');
const {getDiets}= require("./controllers")
const {KEY}= process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function getApiData(){ 
    try{
        const api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${KEY}&addRecipeInformation=true&number=100`);
        const apiData= api.data.results.map((s)=>{
            return {
            name:s.title.toLowerCase(),
            id:s.id.toString(),
            image:s.image,
            type:s.diets,
            summary:s.summary,
            dishTypes: s.dishTypes,
            healthScore:s.healthScore,
            steps:s.analyzedInstructions[0]?.steps.map((s)=>{
                return{
                    number:s.number,
                    step:s.step,
                }
            })
        }
        })
        return apiData;
    } catch(error){
        console.log(error)
    }
}
async function getDbData(){
    const db=await Recipe.findAll({
        include:{
            model:Diet,
            attributes:["name"],
        },
    });
    return db;
}
async function getAll(){
    const api= await getApiData();
    const db= await getDbData();
    const all= api.concat(db);
    return all;
}


router.get("/recipes", async (req,res) =>{
    try{
        const name= req.query.name;
        const allRecipes= await getAll();
        if(name){
            const filter= allRecipes.filter((s)=>
                s.name.includes(name)
            );
            filter.length ? res.send(filter) : res.send({msg:"Not found a recipe with this name"})
        } else {
            return res.send(allRecipes)
        }
    } catch(error){
        console.log(error)
    }
})
router.get("/recipe/:id", async (req, res)=>{
    try{
        const id=req.params.id;
        const response= await getAll();
        if(id){
            const filter=response.filter((s)=> s.id===id);
            if(filter.length){
                res.send(filter)
            } else{
                res.send({msg:"Not found a recipe with this ID"})
            }
        } else {
            res.send({msg:"Not found a recipe with this ID"})
        }
    } catch(error){
        res.status(404).send({ msg: "Should enter a valid ID" })
    }
})
router.post("/recipes", async (req, res)=>{
    const { name, summary, healthScore, steps, diets, image, dishTypes } = req.body;
    try {
        // const { name, summary, healthScore, steps, type, image, dishTypes } = req.body;
        const nuevaReceta = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image,
            dishTypes, 
        });
        const dbDiets = await Diet.findAll({
            where: { name: diets },
        });
        nuevaReceta.addDiet(dbDiets) 
        // console.log(dbDiets)
        res.send("Recipe created")
    } catch (error) { 
        res.status(404).json({error:error.message});
    }
})

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

router.get("/diets", async (req, res)=>{
    try{
        let diets= await getDiets();
        res.json(diets);
    } catch(err){
        res.send(err)
    }
})

module.exports = router;

