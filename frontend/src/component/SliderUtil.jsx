import Slider from "react-slick";;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoviesCard from "../pages/Movies/MoviesCard";


const SliderUtil = ({data}) => {
    const settings = {
        data: true,
        infinte: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
    };


  return (
    <Slider {...settings}>
        {data?.map((movie) =>(
            <MoviesCard key={movie._id} movie={movie}/>
        ))}
    </Slider>
  )
}

export default SliderUtil