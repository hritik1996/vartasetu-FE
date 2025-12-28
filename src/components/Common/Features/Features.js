import React from 'react'
import FeaturesOne from "../../../content/assets/img/features-1.jpg";
import FeaturesTwo from "../../../content/assets/img/features-2.jpg";
import FeaturesThree from "../../../content/assets/img/features-3.jpg";
function Features() {
  return (
    <div>
       <section id="more-features" className="more-features section">

      <div className="container">

        <div className="row justify-content-around gy-4">

          <div className="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">
            <h3>Enim quis est voluptatibus aliquid consequatur</h3>
            <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi</p>

            <div className="row">

              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-easel flex-shrink-0"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias </p>
                </div>
              </div>

              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-patch-check flex-shrink-0"></i>
                <div>
                  <h4>Nemo Enim</h4>
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiise</p>
                </div>
              </div>

              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-brightness-high flex-shrink-0"></i>
                <div>
                  <h4>Dine Pad</h4>
                  <p>Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit</p>
                </div>
              </div>

              <div className="col-lg-6 icon-box d-flex">
                <i className="bi bi-brightness-high flex-shrink-0"></i>
                <div>
                  <h4>Tride clov</h4>
                  <p>Est voluptatem labore deleniti quis a delectus et. Saepe dolorem libero sit</p>
                </div>
              </div>

            </div>

          </div>
          <div className="features-image col-lg-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
            <img src={FeaturesOne} alt="" />
          </div>
           <div className="features-image col-lg-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
            <img src={FeaturesTwo} alt="" />
          </div>

        </div>

      </div>

    </section>

    </div>
  )
}

export default Features;
