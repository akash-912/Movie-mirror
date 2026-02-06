import { moviesApiSlice, useDeleteCommentMutation, useGetAllMoviesQuery} from "../../redux/api/movies.js"
import {toast} from "react-toastify"


const AllComment = () => {
  const {data: movie, refetch} = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) =>{
    try{
      await deleteComment({movieId, reviewId}).unwrap();
      toast.success("Comment Deleted");
      refetch();
    }catch(error){
      console.error("Error deleting comment: ", error);
    }
  }
  // if (isLoading) return <p>Loading comments...</p>;
  // if (isError) return <p>Error loading movies.</p>;
  return (
    <div>
      {movie?.map((aryan)=>(
        <section key={aryan._id}>
          {aryan?.reviews.map((review)=>(
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]">
                <div className="flex justify-between">
                  <strong className="text-[#B0B0B0]">{review.name}</strong>
                  <p className="text-[#B0B0B0]">{review.createdAt.substring(0,10)}</p>
                </div>
                <p className="my-4">{review.comment}</p>
                <button
                  className="text-red-500"
                  onClick={()=> handleDeleteComment(aryan._id, review._id)}>
                    Delete
                </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default AllComment