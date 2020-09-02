import React from 'react';
import './Accordion.css';

const Accordion = ({ text, children}) => (
    <div className={'accordion'}>
        <button className={'accordion-button'}
                onClick={ (e) => {
                    console.log(e.target);
                    e.target.classList.toggle('active');
                    const panel = e.target.nextElementSibling;
                    if (panel.style.display === 'block') {
                        panel.style.display = 'none';
                    } else {
                        panel.style.display = 'block';
                    }
                }}>
            {text}
        </button>
        <div className={'panel'}>
            {children}
        </div>
    </div>
);

function onClick() {
    function handleClick(e) {
        console.log("ok")
        e.preventDefault()
        console.log(e.target)
    }
}

export default Accordion;
