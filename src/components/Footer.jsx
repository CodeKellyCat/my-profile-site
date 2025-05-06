import React from 'react';
import '../styles/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    const yourName = "| Kelly McLaughlin"; // Replace with your actual name
    const incorporatedSymbol = "©"; // Or your preferred symbol

    return (
        <footer className="site-footer">
            <p>{incorporatedSymbol} {currentYear} {yourName}</p>
        </footer>
    );
}

export default Footer;