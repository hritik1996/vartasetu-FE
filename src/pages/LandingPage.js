import React from 'react'
import Header from '../components/Common/Header/Header'
import Footer from '../components/Common/Footer/Footer';
import HeroImage from '../content/assets/img/hero-services-img.jpg';
import HeroImageLight from '../content/assets/img/hero-bg-light.jpg';
import AboutCompanyOne from '../content/assets/img/about-company-1.jpg';
import AboutCompanyTwo from '../content/assets/img/about-company-2.jpg';
import AboutCompanyThree from '../content/assets/img/about-company-3.jpg';
import TabOne from "../content/assets/img/tabs-1.jpg";
import TabTwo from "../content/assets/img/tabs-2.jpg";
import TabThree from "../content/assets/img/tabs-3.jpg";
import FeaturesOne from "../content/assets/img/features-1.jpg";
import FeaturesTwo from "../content/assets/img/features-2.jpg";
import FeaturesThree from "../content/assets/img/features-3.jpg";
import ClientOne from "../content/assets/img/clients/client-1.png";
import ClientTwo from "../content/assets/img/clients/client-2.png";
import ClientThree from "../content/assets/img/clients/client-3.png";
import ClientFour from "../content/assets/img/clients/client-4.png";
import ClientFive from "../content/assets/img/clients/client-5.png";
import ClientSix from "../content/assets/img/clients/client-6.png";
import Testimonials from '../components/Testimonials/Testimonials';
import Faq from '../components/Common/Faq/Faq';
import Features from '../components/Common/Features/Features';
import Contact from '../components/Common/ContectUs/Contact';
function LandingPage() {
  return (
    <div>
      <Header />
        <main className="main">

    <section id="hero" className="hero section">
      <div className="hero-bg">
        <img src={HeroImageLight} alt="" />
      </div>
      <div className="container text-center">
        <div className="d-flex justify-content-between align-items-center">
          <div className='text-left'>
            <h1 data-aos="fade-up" className='text-left'>Welcome to <span>Vartasetu</span></h1>
            <p data-aos="fade-up" data-aos-delay="100">Quickly start your project now and set the stage for success<br /></p>
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <a href="#about" className="btn-get-started">Get Started</a>
              <a href="#" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
            </div>
          </div>
          <img src={HeroImage} className="img-fluid hero-img" alt="" data-aos="zoom-out" data-aos-delay="300" />
        </div>
      </div>

    </section>

    <section id="featured-services" className="featured-services section light-background">

      <div className="container">

        <div className="row gy-4">

          <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0"><i className="bi bi-briefcase"></i></div>
              <div>
                <h4 className="title"><a href="#" className="stretched-link">Lorem Ipsum</a></h4>
                <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
              </div>
            </div>
          </div>
          

          <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0"><i className="bi bi-card-checklist"></i></div>
              <div>
                <h4 className="title"><a href="#" className="stretched-link">Dolor Sitema</a></h4>
                <p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exa</p>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item d-flex">
              <div className="icon flex-shrink-0"><i className="bi bi-bar-chart"></i></div>
              <div>
                <h4 className="title"><a href="#" className="stretched-link">Sed ut perspiciatis</a></h4>
                <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>

    <section id="about" className="about section">

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
            <p className="who-we-are">Who We Are</p>
            <h3>Unleashing Potential with Creative Strategy</h3>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <ul>
              <li><i className="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
              <li><i className="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span></li>
            </ul>
            <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
          </div>

          <div className="col-lg-6 about-images" data-aos="fade-up" data-aos-delay="200">
            <div className="row gy-4">
              <div className="col-lg-6">
                <img src={AboutCompanyOne} className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6">
                <div className="row gy-4">
                  <div className="col-lg-12">
                    <img src={AboutCompanyTwo} className="img-fluid" alt="" />
                  </div>
                  <div className="col-lg-12">
                    <img src={AboutCompanyThree} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <section id="clients" className="clients section">

      <div className="container" data-aos="fade-up">

        <div className="row gy-4">

          <div className="col-xl-2 col-md-3 col-6 client-logo">
            <img src={ClientOne} className="img-fluid" alt="" />
          </div>

          <div className="col-xl-2 col-md-3 col-6 client-logo">
            <img src={ClientTwo} className="img-fluid" alt="" />
          </div>

          <div className="col-xl-2 col-md-3 col-6 client-logo">
            <img src={ClientThree} className="img-fluid" alt="" />
          </div>

          <div className="col-xl-2 col-md-3 col-6 client-logo">
            <img src={ClientFour} className="img-fluid" alt="" />
          </div>

          <div className="col-xl-2 col-md-3 col-6 client-logo">
            <img src={ClientFive} className="img-fluid" alt="" />
          </div>

          <div className="col-xl-2 col-md-3 col-6 client-logo">
            <img src={ClientSix} className="img-fluid" alt="" />
          </div>

        </div>

      </div>

    </section>

   
    <section id="features" className="features section">

      <div className="container section-title" data-aos="fade-up">
        <h2>Features</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">
        <div className="row justify-content-between">

          <div className="col-lg-5 d-flex align-items-center">

            <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
              <li className="nav-item">
                <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                  <i className="bi bi-binoculars"></i>
                  <div>
                    <h4 className="d-none d-lg-block">Modi sit est dela pireda nest</h4>
                    <p>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                      velit esse cillum dolore eu fugiat nulla pariatur
                    </p>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                  <i className="bi bi-box-seam"></i>
                  <div>
                    <h4 className="d-none d-lg-block">Unde praesenti mara setra le</h4>
                    <p>
                      Recusandae atque nihil. Delectus vitae non similique magnam molestiae sapiente similique
                      tenetur aut voluptates sed voluptas ipsum voluptas
                    </p>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                  <i className="bi bi-brightness-high"></i>
                  <div>
                    <h4 className="d-none d-lg-block">Pariatur explica nitro dela</h4>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                      Debitis nulla est maxime voluptas dolor aut
                    </p>
                  </div>
                </a>
              </li>
            </ul>

          </div>

          <div className="col-lg-6">

            <div className="tab-content" data-aos="fade-up" data-aos-delay="200">

              <div className="tab-pane fade active show" id="features-tab-1">
                <img src={TabOne} alt="" className="img-fluid" />
              </div>

              <div className="tab-pane fade" id="features-tab-2">
                <img src={TabTwo} alt="" className="img-fluid" />
              </div>
              <div className="tab-pane fade" id="features-tab-3">
                <img src={TabThree} alt="" className="img-fluid" />
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
    <section id="features-details" className="features-details section">

      <div className="container">

        <div className="row gy-4 justify-content-between features-item">

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <img src={FeaturesThree} className="img-fluid" alt="" />
          </div>

          <div className="col-lg-5 d-flex align-items-center" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h3>Corporis temporibus maiores provident</h3>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
              <a href="#" className="btn more-btn">Learn More</a>
            </div>
          </div>

        </div>

        <div className="row gy-4 justify-content-between features-item">

          <div className="col-lg-5 d-flex align-items-center order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">

            <div className="content">
              <h3>Neque ipsum omnis sapiente quod quia dicta</h3>
              <p>
                Quidem qui dolore incidunt aut. In assumenda harum id iusto lorena plasico mares
              </p>
              <ul>
                <li><i className="bi bi-easel flex-shrink-0"></i> Et corporis ea eveniet ducimus.</li>
                <li><i className="bi bi-patch-check flex-shrink-0"></i> Exercitationem dolorem sapiente.</li>
                <li><i className="bi bi-brightness-high flex-shrink-0"></i> Veniam quia modi magnam.</li>
              </ul>
              <p></p>
              <a href="#" className="btn more-btn">Learn More</a>
            </div>

          </div>

          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
            <img src={FeaturesTwo} className="img-fluid" alt="" />
          </div>

        </div>

      </div>

    </section>


    <section id="services" className="services section light-background">

     
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">

        <div className="row g-5">

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item item-cyan position-relative">
              <i className="bi bi-activity icon"></i>
              <div>
                <h3>Nesciunt Mete</h3>
                <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
                <a href="#" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item item-orange position-relative">
              <i className="bi bi-broadcast icon"></i>
              <div>
                <h3>Eosle Commodi</h3>
                <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
                <a href="#" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item item-teal position-relative">
              <i className="bi bi-easel icon"></i>
              <div>
                <h3>Ledo Markt</h3>
                <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
                <a href="#" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
            <div className="service-item item-red position-relative">
              <i className="bi bi-bounding-box-circles icon"></i>
              <div>
                <h3>Asperiores Commodi</h3>
                <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
                <a href="#" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
            <div className="service-item item-indigo position-relative">
              <i className="bi bi-calendar4-week icon"></i>
              <div>
                <h3>Velit Doloremque.</h3>
                <p>Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.</p>
                <a href="#" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="600">
            <div className="service-item item-pink position-relative">
              <i className="bi bi-chat-square-text icon"></i>
              <div>
                <h3>Dolori Architecto</h3>
                <p>Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.</p>
                <a href="#" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
   {/* <Features /> */}
    
    <section id="pricing" className="pricing section">

      
      <div className="container section-title" data-aos="fade-up">
        <h2>Pricing</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="100">
            <div className="pricing-item">
              <h3>Free Plan</h3>
              <p className="description">Ullam mollitia quasi nobis soluta in voluptatum et sint palora dex strater</p>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <a href="#" className="cta-btn">Start a free trial</a>
              <p className="text-center small">No credit card required</p>
              <ul>
                <li><i className="bi bi-check"></i> <span>Quam adipiscing vitae proin</span></li>
                <li><i className="bi bi-check"></i> <span>Nec feugiat nisl pretium</span></li>
                <li><i className="bi bi-check"></i> <span>Nulla at volutpat diam uteera</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Pharetra massa massa ultricies</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Voluptate id voluptas qui sed aperiam rerum</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Iure nihil dolores recusandae odit voluptatibus</span></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
            <div className="pricing-item featured">
              <p className="popular">Popular</p>
              <h3>Business Plan</h3>
              <p className="description">Ullam mollitia quasi nobis soluta in voluptatum et sint palora dex strater</p>
              <h4><sup>$</sup>29<span> / month</span></h4>
              <a href="#" className="cta-btn">Start a free trial</a>
              <p className="text-center small">No credit card required</p>
              <ul>
                <li><i className="bi bi-check"></i> <span>Quam adipiscing vitae proin</span></li>
                <li><i className="bi bi-check"></i> <span>Nec feugiat nisl pretium</span></li>
                <li><i className="bi bi-check"></i> <span>Nulla at volutpat diam uteera</span></li>
                <li><i className="bi bi-check"></i> <span>Pharetra massa massa ultricies</span></li>
                <li><i className="bi bi-check"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                <li><i className="bi bi-check"></i> <span>Voluptate id voluptas qui sed aperiam rerum</span></li>
                <li className="na"><i className="bi bi-x"></i> <span>Iure nihil dolores recusandae odit voluptatibus</span></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4" data-aos="zoom-in" data-aos-delay="300">
            <div className="pricing-item">
              <h3>Developer Plan</h3>
              <p className="description">Ullam mollitia quasi nobis soluta in voluptatum et sint palora dex strater</p>
              <h4><sup>$</sup>49<span> / month</span></h4>
              <a href="#" className="cta-btn">Start a free trial</a>
              <p className="text-center small">No credit card required</p>
              <ul>
                <li><i className="bi bi-check"></i> <span>Quam adipiscing vitae proin</span></li>
                <li><i className="bi bi-check"></i> <span>Nec feugiat nisl pretium</span></li>
                <li><i className="bi bi-check"></i> <span>Nulla at volutpat diam uteera</span></li>
                <li><i className="bi bi-check"></i> <span>Pharetra massa massa ultricies</span></li>
                <li><i className="bi bi-check"></i> <span>Massa ultricies mi quis hendrerit</span></li>
                <li><i className="bi bi-check"></i> <span>Voluptate id voluptas qui sed aperiam rerum</span></li>
                <li><i className="bi bi-check"></i> <span>Iure nihil dolores recusandae odit voluptatibus</span></li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </section>
    <Faq />
    <Testimonials />
   <Contact />
  </main>

      <Footer />
    </div>
  )
}

export default LandingPage;
