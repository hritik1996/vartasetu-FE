import React from 'react'
import CarouselComponent from "../Carousel/Carousel.js";
import TestimonialsOne from "../../content/assets/img/testimonials/testimonials-1.jpg";
import TestimonialsTwo from "../../content/assets/img/testimonials/testimonials-2.jpg";
import TestimonialsThree from "../../content/assets/img/testimonials/testimonials-3.jpg";
import TestimonialsFour from "../../content/assets/img/testimonials/testimonials-4.jpg";
import TestimonialsFive from "../../content/assets/img/testimonials/testimonials-5.jpg";
function Testimonials() {

    const testimonialItems = [
    {
      src: TestimonialsOne,
      alt: "Saul Goodman",
      caption: "Saul Goodman — CEO & Founder",
      text:
        "Proin iaculis purus consequat sem cure digni ssim donec porttitora..."
    },
    {
      src: TestimonialsTwo,
      alt: "Sara Wilsson",
      caption: "Sara Wilsson — Designer",
      text:
        "Export tempor illum tamen malis malis eram quae irure esse labore..."
    },
    {
      src: TestimonialsThree,
      alt: "Jena Karlis",
      caption: "Jena Karlis — Store Owner",
      text:
        "Enim nisi quem export duis labore cillum quae magna enim sint..."
    },
    {
      src: TestimonialsFour,
      alt: "Matt Brandon",
      caption: "Matt Brandon — Freelancer",
      text:
        "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos..."
    },
    {
      src: TestimonialsFive,
      alt: "John Larson",
      caption: "John Larson — Entrepreneur",
      text:
        "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua..."
    },
    {
      src: TestimonialsThree,
      alt: "Jena Karlis",
      caption: "Jena Karlis — Store Owner",
      text:
        "Enim nisi quem export duis labore cillum quae magna enim sint..."
    },
    {
      src: TestimonialsFour,
      alt: "Matt Brandon",
      caption: "Matt Brandon — Freelancer",
      text:
        "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos..."
    },
    {
      src: TestimonialsFive,
      alt: "John Larson",
      caption: "John Larson — Entrepreneur",
      text:
        "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua..."
    }
  ];

  return (
    <div>
    <section id="testimonials" className="testimonials section light-background">
    <div className="container section-title" data-aos="fade-up">
      <h2>Testimonials</h2>
      <p>
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </p>
    </div>

    <div className="container" data-aos="fade-up" data-aos-delay="100">
      <CarouselComponent items={testimonialItems} autoPlay={true}  className="testimonial-item"/>
    </div>
  </section>
    </div>
  )
}

export default Testimonials
