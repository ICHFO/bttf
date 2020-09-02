import React from 'react';
import {Link} from "react-router-dom";

const HeaderNav = () => (
    <ul className='headernav'>
        <Link className='header-link' to='/'>Overview</Link>
        <Link to={'/testpage'}
              className='header-link'
              style={{
                float: 'right'
              }}>Test</Link>
    </ul>
)

export default HeaderNav
