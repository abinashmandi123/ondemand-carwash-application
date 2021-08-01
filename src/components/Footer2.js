import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/footer2.css'

export class Footer2 extends Component {
    render() {
        return (
            <>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="footer-col">
                                <h4>Company</h4>
                                <ul>
                                    <li><Link to="/">about us</Link></li>
                                    <li><Link to="/">our services</Link></li>
                                    <li><Link to="/">privacy policy</Link></li>
                                    <li><Link to="/">affliate program</Link></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>Get Help</h4>
                                <ul>
                                    <li><Link to="/">FAQ</Link></li>
                                    <li><Link to="/">shipping</Link></li>
                                    <li><Link to="/">order status</Link></li>
                                    <li><Link to="/">payment options</Link></li>
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
        )
    }
}

export default Footer2
