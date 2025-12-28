// ...existing code...
import React from 'react'

function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">Vartasetu</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
              <p><strong>Email:</strong> <span>info@example.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#" aria-label="twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#terms">Terms of service</a></li>
              <li><a href="#privacy">Privacy policy</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#web-design">Web Design</a></li>
              <li><a href="#web-dev">Web Development</a></li>
              <li><a href="#product">Product Management</a></li>
              <li><a href="#marketing">Marketing</a></li>
              <li><a href="#graphic">Graphic Design</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
            <form action="/forms/newsletter.php" method="post" className="php-email-form">
              <div className="newsletter-form">
                <input type="email" name="email" placeholder="Your email" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </div>
              <div className="loading" aria-hidden="true">Loading</div>
              <div className="error-message" role="status" aria-live="polite"></div>
              <div className="sent-message" role="status" aria-live="polite">Your subscription request has been sent. Thank you!</div>
            </form>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">Vartasetu</strong><span> All Rights Reserved</span></p>
        {/* <div className="credits">
          Designed by <a href="#" target="_blank" rel="noopener noreferrer"></a>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer