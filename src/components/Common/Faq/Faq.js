
import React, { useState } from "react";
function Faq() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (e,index) => {
        const faqItem = e.currentTarget;
        faqItem.classList.toggle("faq-active");
        setActiveIndex(index === activeIndex ? null : index);
    }


    const faqData = [
  {
    question: "Non consectetur a erat nam at lectus urna duis?",
    answer:
      "Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida..."
  },
  {
    question: "Feugiat scelerisque varius morbi enim nunc faucibus?",
    answer:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices..."
  },
  {
    question: "Dolor sit amet consectetur adipiscing elit pellentesque?",
    answer:
      "Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci..."
  },
  {
    question: "Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?",
    answer:
      "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi..."
  },
  {
    question: "Tempus quam pellentesque nec nam aliquam sem et tortor?",
    answer:
      "Molestie a iaculis at erat pellentesque adipiscing commodo..."
  },
  {
    question: "Perspiciatis quod quo quos nulla quo illum ullam?",
    answer:
      "Enim ea facilis quaerat voluptas quidem et dolorem..."
  }
];

  return (
    <div>
        <section id="faq" className="faq section">

        <div className="container section-title" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        </div>

        <div className="container">

        <div className="row justify-content-center">

            <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">

            <div className="faq-container">

                {
                    faqData?.map((item,index)=>{
                        return (
                            <div className={`faq-item ${activeIndex === index ? "faq-active" : ""}`} key={index} onClick={(e) => handleClick(e,index)}>
                                <h3>{item.question}</h3>
                                <div className="faq-content">
                                    <p>{item.answer}</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>
                        )
                    })
                }

            </div>

            </div>

        </div>

        </div>

        </section>
    </div>
  )
}

export default Faq
