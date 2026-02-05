import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast} from "react-toastify"
import { useGetSpecificMovieQuery, useAddMovieReviewMutation } from "../../redux/api/movies"

const MovieDetails = () => {
    const { id: movieId} = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { data: movie, refetch} = useGetSpecificMovieQuery(movieId);
    const { userInfo} = useSelector((state) => state.auth);
    const [ createReview, { isLoading: loadingMovieReview}] = useAddMovieReviewMutation();    
    


  return (
    <div>
      <Link to='/' className="text-white font-semibold hover:underline ml-[20rem]">
        Go Back
      </Link>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center">
          <img src={movie?.image} alt={movie?.name}  className="w-[50%] rounded"/>
        </div>

        {/* Container One */}

        <div className="container flex justify-between ml-[20rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">
              {movie?.name}
            </h2>
            <p className="my-4 xl:m[35rem] lg:w-[35rem] md:w-[30rem] text[#B0B0B0]">
              {movie?.detail}
            </p>
          </section>
        </div>
      </div>

      


    </div>
  )
}

export default MovieDetails