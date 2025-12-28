import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function CarouselComponent({ items = [], autoPlay = true, className }) {
  console.log("items",items);
  return (
    <Carousel
      autoPlay={autoPlay}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      swipeable
      stopOnHover
      centerMode
      centerSlidePercentage={33.33}   
    >
      {items.map((item, index) => (
        <div className={className} key={index}>
          <img src={item.src} className="testimonial-img" alt={item.alt || `slide-${index}`} />
          <div className="profile mt-auto">
              {item.alt && <p>{item.alt}</p>}
              {item.caption && <p>{item.caption}</p>}
              {item.text && <p>{item.text}</p>}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
