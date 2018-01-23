import React, { Component } from 'react';
import '../index.css';
import InfoWidget from './InfoWidget.js';
import TwitterWidget from './TwitterWidget.js'
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
                    <TwitterWidget />
                </div>
            </Menu>
        )
    }
}

export default SideBar;