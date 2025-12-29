import Genre from "../models/Genre.js";

import asyncHandler from "../middlewares/asyncHandler.js";


const createGenre = asyncHandler(async (req, res) => {
  try {
    const {name} = req.body;
    if(!name){
      return res.status(400).json({message: "Genre name is required"});
    }
    const existingGenre = await Genre.findOne({name});
    if(existingGenre){
      return res.status(400).json({error: "Genre already exists"});
    }

    const genre = await Genre({name}).save();
    res.status(201).json(genre);
  } catch(error){
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateGenre = asyncHandler(async (req,res)=>{
  try{
    const {id} = req.params;
    const {name} = req.body;
    if(!name){
      return res.status(400).json({message: "Genre name is required"});
    }
    const genre = await Genre.findOne({_id: id});
    if(!genre){
      return res.status(404).json({error: "Genre not found"});
    }
    genre.name = name;
    const updatedGenre = await genre.save();
    res.status(200).json(updatedGenre);
  }catch(error){
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
})

const removeGenre = asyncHandler(async (req,res)=>{
  try{
    const {id} = req.params;
    const removedGenre = await Genre.findByIdAndDelete(id);
    if(!removedGenre){
      return res.status(404).json({error: "Genre not found"});
    }
    res.status(200).json({message: "Genre removed successfully"});
  } catch(error){
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
})

const listGenres = asyncHandler(async (req,res)=>{
  try{
    const genres = await Genre.find({});  
    res.status(200).json(genres);
  } catch(error){
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }   
});

const readGenre = asyncHandler(async (req,res)=>{
  try{
    const {id} = req.params;      
    const genre = await Genre.findById(id);
    if(!genre){
      return res.status(404).json({error: "Genre not found"});
    }
    res.status(200).json(genre);
  } catch(error){   
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

export {createGenre,updateGenre,removeGenre, listGenres, readGenre};
