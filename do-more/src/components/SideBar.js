import React, { Component } from 'react';
import '../index.css';
import InfoWidget from './InfoWidget.js';
import { push as Menu } from 'react-burger-menu';


class SideBar extends Component {

    showSideBar (event) {
        event.preventDefault();
    }

    render() {
        return (
         
            <Menu pageWrapId = { "page-wrap" }>
                
                    <div className="side-bar-top">
                        <InfoWidget />
                    </div>

                    <div className="side-bar-bottom">

                        <a id="home" className="menu-item" href="/">Home</a>

                        <a id="about" className="menu-item" href="/about">About</a>

                        <a id="contact" className="menu-item" href="/contact">Contact</a>

                        <a onClick={this.showSideBar} className="menu-item--small" href="">Settings</a>

                 

                </div>
            
          

            </Menu>
            
           
        )

    }

}

export default SideBar;