import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = ["logo-un.jpeg", "logo.png", "logonew.png", "newlogo.png"];

const CarosalSection = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div className="w-full px-4 md:px-10 py-7">
      <div
        ref={sliderRef}
        className="keen-slider rounded-xl overflow-hidden shadow-lg"
      >
        {images.map((src, index) => (
          <div className="keen-slider__slide" key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-50 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarosalSection;
