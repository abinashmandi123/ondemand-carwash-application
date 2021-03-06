import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import '../css/footer1.css'

export class Footer1 extends Component {
    render() {
        return (
            <>
               
<footer className="section footer-classic context-dark bg-image ">
        <div className="container">
          <div className="row row-30">
            <div className="col-md-4 col-xl-5">
              <div className="pr-xl-4"><a class="brand" href="index.html"><img class="brand-logo-light" src="images/agency/logo-inverse-140x37.png" alt="" width="140" height="37" srcset="images/agency/logo-retina-inverse-280x74.png 2x"/></a>
                <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
                
                <p className="rights"><span>©  </span><span className="copyright-year">2018</span><span> </span><span>Waves</span><span>. </span><span>All Rights Reserved.</span></p>
              </div>
            </div>
            <div class="col-md-4">
              <h5>Contacts</h5>
              <dl class="contact-list">
                <dt>Address:</dt>
                <dd>798 South Park Avenue, Jaipur, Raj</dd>
              </dl>
              <dl class="contact-list">
                <dt>email:</dt>
                <dd><Link to="mailto:#">dkstudioin@gmail.com</Link></dd>
              </dl>
              <dl className="contact-list">
                <dt>phones:</dt>
                <dd><Link to="tel:#">https://karosearch.com</Link> <span>or</span> <a href="tel:#">https://karosearch.com</a>
                </dd>
              </dl>
            </div>
            <div class="col-md-4 col-xl-3">
              <h5>Links</h5>
              <ul class="nav-list">
                <li><Link to="">About</Link></li>
                <li><Link to="">Projects</Link></li>
                <li><Link to="">Blog</Link></li>
                <li><Link to="">Contacts</Link></li>
                <li><Link to="">Pricing</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row no-gutters social-container">
          <div className="col"><NavLink className="social-inner" to=""><span className="icon mdi mdi-facebook"></span><span>Facebook</span></NavLink></div>
          <div className="col"><NavLink className="social-inner" to=""><span className="icon mdi mdi-instagram"></span><span>instagram</span></NavLink></div>
          <div className="col"><NavLink className="social-inner" to=""><span className="icon mdi mdi-twitter"></span><span>twitter</span></NavLink></div>
          <div className="col"><NavLink className="social-inner" to=""><span className="icon mdi mdi-youtube-play"></span><span>google</span></NavLink></div>
        </div>
      </footer> 
            </>
        )
    }
}

export default Footer1
