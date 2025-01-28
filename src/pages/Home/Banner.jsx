import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/home/01.jpg";
import img2 from "../../assets/home/02.jpg";
import img3 from "../../assets/home/03.png";
import img4 from "../../assets/home/04.jpg";
import img5 from "../../assets/home/05.png";
import img6 from "../../assets/home/06.png";
import "./Banner.css";

const Banner = () => {
  const images = [
    { src: img1, alt: "Image 1" },
    { src: img2, alt: "Image 2" },
    { src: img3, alt: "Image 3" },
    { src: img4, alt: "Image 4" },
    { src: img5, alt: "Image 5" },
    { src: img6, alt: "Image 6" },
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={true}
      showStatus={false}
      showIndicators={false}
      interval={3000}
      className="max-w-5xl mx-auto"
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.src} alt={image.alt} className="rounded-lg" />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
