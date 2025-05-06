import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import linkedinIcon from '../assets/icons/social/linkedin-icon.svg';
import githubIcon from '../assets/icons/social/github-icon.svg';
import emailIcon from "../assets/icons/social/email-icon.svg";
import '../styles/ContactPage.css';

const ContactPage = () => {
    const [pageData, setPageData] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`${restBase}pages/37?_fields=id,title,content,acf&_embed`)
            .then(res => res.ok ? res.json() : Promise.reject('Page not found'))
            .then(data => {
                setPageData(data);
                setLoaded(true);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoaded(true);
            });
    }, []);

    if (!isLoaded) return <div>Loading contact information...</div>; // Provide a loading state
    if (!pageData) return <div className="error">Contact page not loaded</div>;

    return (
        <div className="contact-page-container">
            <main className="contact-page">
                <div
                    className="contact-content wp-content"
                    dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
                />
                <div className="social-icons-container">
                    <a href="https://www.linkedin.com/in/kellymlaughlin/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                    </a>
                    <a href="https://github.com/CodeKellyCat" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub" className="social-icon" />
                    </a>
                    <a href="mailto:kelly.mclaughlin.dev@gmail.com" target="_blank" rel="noopener noreferrer">
                        <img src={emailIcon} alt="Email" className="social-icon" />
                    </a>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;