import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = ["2.jpg", "1n.jpg", "3.jpg", "4.jpg"];

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
          <div
            className="keen-slider__slide flex items-center justify-center h-[250px] md:h-[400px] relative"
            key={index}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-top rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarosalSection;
