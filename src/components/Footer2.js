import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer2.css';

const Footer2 = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Our Services</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">Affiliate Program</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Help</h4>
              <ul>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">Shipping</Link></li>
                <li><Link to="/">Order Status</Link></li>
                <li><Link to="/">Payment Options</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Online Shop</h4>
              <ul>
                <li><Link to="/">Wash Accessories</Link></li>
                <li><Link to="/">Wash Tools</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className="social-links">
                <Link to="/"><i className="fa fa-facebook"></i></Link>
                <Link to="/"><i className="fa fa-twitter"></i></Link>
                <Link to="/"><i className="fa fa-instagram"></i></Link>
                <Link to="/"><i className="fa fa-google"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer2;
