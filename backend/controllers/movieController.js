import Movie from "../models/Movie.js";

const createMovie = async(req,res) =>{
    try{
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.json(savedMovie);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

const getAllMovies = async(req,res) =>{
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(error){
        res.status(500).json(error);
    }
}

const getSpecificMovies = async(req,res) =>{
    try{
        const {id} = req.params;
        const specificMovie = await Movie.findById(id);
        if(!specificMovie){
            return res.status(404).json({message: "Movie not found"});
        }
        res.json(specificMovie);
    }catch(error){
        res.status(500).json(error);
    }
}

const updateMovie = async(req,res) =>{
    try{
        const {id} = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedMovie){
            return res.status(404).json({message :"Movie not updated"});
        }
        res.json(updatedMovie);

    }catch(error){
        res.status(500).json(error);
    }
}

const movieReview = async(req,res) =>{
    try{
        const {rating,comment} = req.body;
        const movie = await Movie.findById(req.params.id);

        if(movie){
            const alreadyReviewed = movie.reviews.find((r) => r.user.toString() === req.user._id.toString());
        

            if(alreadyReviewed){
                res.status(400);
                throw new Error("Movie already reviewed");
            }
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            movie.reviews.push(review);
            movie.numReviews = movie.reviews.length;
            movie.rating = movie.reviews.reduce((acc,item) => item.rating + acc,0)/movie.reviews.length;
            await movie.save();
            res.status(201).json({message: "Review added"});
        }else{
            res.status(404).json({message: "Aayush not Found"});
        }
        
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const deleteMovie = async(req,res) =>{
    try{
        const {id} = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if(!deletedMovie){
            return res.status(400).json({message: "Movie doesn't exists"});
        }
        res.status(200).json({message: "Movie Deleted Successfully"});
    }catch(error){
        res.status(500).json(error);
    }
}

const deleteReview = async(req,res) =>{
    try{
        const {movieId,reviewId} = req.body;
        const movie = await Movie.findById(movieId);
        if(!movie) {
            return res.status(404).json({message: "Movie not found"});
        }

        const reviewIndex = movie.reviews.findIndex((r) => r._id.toString() === reviewId);
        
        if(reviewIndex===-1) return res.status(404).json({message: "Comment not found"});

        movie.reviews.splice(reviewIndex,1);
        movie.numReviews = movie.reviews.length;
        movie.rating = movie.reviews.length>0 ? movie.reviews.reduce((acc,item) => item.rating + acc,0)/movie.reviews.length: 0;

        await movie.save();
        res.json({message: "Comment Deleted Successfully"})

    }catch(error){
        res.status(500).json(error);
    }
}
export {createMovie,getAllMovies,getSpecificMovies,updateMovie,movieReview,deleteMovie,deleteReview};