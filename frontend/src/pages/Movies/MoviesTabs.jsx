import { Link } from "react-router-dom"
const MoviesTabs = ({ userInfo, submitHandler, comment, setComment, movie}) => {
  return (
    <div>
        <section>
            {userInfo ? (
                <form onSubmit={submitHandler}>
                    <div className="my-2">
                    <label htmlFor="comment" className="black text-xl mb-2">Write Your Review</label>
                    <textarea id="comment" rows={3} required value={comment} onChange={(e) => setComment(e.target.value)}
                        className="p-2 border rounded-lg xl:w-[40rem] text-black"></textarea>

                        <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 px-4 rounded-lg">
                            Submit
                        </button>
                        </div>
                </form>):(
                    <p>
                        Please <Link to='/login'> Sign In</Link> to write comment
                    </p>
                )}
        </section>
    </div>
  )
}

export default MoviesTabs