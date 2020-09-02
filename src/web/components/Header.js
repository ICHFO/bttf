import React from 'react'
import BttfLogo from '../images/bttf_logo.png'

const Header = () => (
    <div id="header">
        <div className="image-center-clip">
            <img src={BttfLogo}
                 className="crop"
            />
        </div>
    </div>
)

export default Header
