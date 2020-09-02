import React from 'react'

import Header from "./Header";
import Footer from "./Footer";

import "./Layout.css"

const Layout = ({children} ) => (
    <div>
        <Header />
        <div>
            {children}
        </div>
        <Footer />
    </div>
)

export default Layout
