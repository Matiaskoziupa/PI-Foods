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
            diets:s.diets,
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
    try {
        const dbRecipes = await Recipe.findAll({
            include: {
                model: Diet,
        attributes: ['name'],
        through: {
            attributes: []
                },
                row: true
        }
        });
        return dbRecipes;
    } catch (error) {
        console.error(error)
    }
};
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
            filter.length ? res.send(filter) : res.json({error:error.message})
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
                res.json({error:error.message})
            }
        } else {
            res.json({error:error.message})
        }
    } catch(error){
        res.status(404).json({ error:error.message })
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
            where: { name:diets },
        });
        nuevaReceta.addDiet(dbDiets) 
        // console.log(dbDiets)
        res.send("Recipe created")
    } catch (error) { 
        res.status(404).json({error:error.message});
    }
})



router.get("/diets", async (req, res)=>{
    try{
        let diets= await getDiets();
        res.json(diets);
    } catch(err){
        res.send(err)
    }
})



module.exports = router;

