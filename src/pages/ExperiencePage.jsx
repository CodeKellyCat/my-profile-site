import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";
import '../styles/ExperiencePage.css';

import vscodeLogo from '../assets/tech-logos/vscode-logo.svg'
import htmlLogo from '../assets/tech-logos/html-logo.svg';
import cssLogo from '../assets/tech-logos/css-logo.svg';
import sassLogo from '../assets/tech-logos/sass-logo.svg';
import jsLogo from '../assets/tech-logos/javascript-logo.svg';
import reactLogo from "../assets/tech-logos/react-logo.svg";
import gitLogo from "../assets/tech-logos/git-logo.svg";
import githubLogo from '../assets/tech-logos/github-logo.svg';
import figmaLogo from '../assets/tech-logos/figma-logo.svg';
import illustratorLogo from '../assets/tech-logos/illustrator-logo.svg';
import photoshopLogo from '../assets/tech-logos/photoshop-logo.png';
import phpLogo from '../assets/tech-logos/php-logo.svg';
import wordpressLogo from '../assets/tech-logos/wordpress-logo.svg.png';
import wooLogo from '../assets/tech-logos/WooCommerce-logo.svg.png';
import mysqlLogo from '../assets/tech-logos/mysql-logo.svg';
import restAPILogo from '../assets/tech-logos/rest-api-logo.svg';
import shopifyLogo from '../assets/tech-logos/shopify-logo.svg';
import liquidLogo from '../assets/tech-logos/liquid-logo.png';


const ExperiencePage = () => {
    const [pageData, setPageData] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(`${restBase}pages/39?_fields=id,title,content,acf&_embed`)
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

    const renderWordPressContent = (targetElement) => {
        if (pageData && targetElement) {
            targetElement.innerHTML = pageData.content.rendered;
        }
    }


    const skillsLogos = [
        { name: 'VS Code', src: vscodeLogo },
        { name: 'HTML', src: htmlLogo },
        { name: 'CSS', src: cssLogo },
        { name: 'Sass', src: sassLogo },
        { name: 'JavaScript', src: jsLogo },
        { name: 'React', src: reactLogo },
        { name: 'Git', src: gitLogo },
        { name: 'GitHub', src: githubLogo },
        { name: 'Figma', src: figmaLogo },
        { name: 'Illustrator', src: illustratorLogo },
        { name: 'Photoshop', src: photoshopLogo },
        { name: 'PHP', src: phpLogo },
        { name: 'WordPress', src: wordpressLogo },
        { name: 'Woo Commerce', src: wooLogo },
        { name: 'MySQL', src: mysqlLogo },
        { name: 'Rest API', src: restAPILogo },
        { name: 'Shopify', src: shopifyLogo },
        { name: 'Liquid', src: liquidLogo },
    ];

    if (!isLoaded) return <div>Loading Experience Page...</div>;
    if (!pageData) return <div className="error">Experience page not loaded</div>;



    return (
        <div className="experience-page-container">
            <main className="experience-page">
                {/* React Content: Headings and Intro */}
                <h1>Experience</h1>
                <h2>My Toolkit</h2>
                <p>I have a foundational understanding and practical experience with the following technologies, which I've used in various projects:</p>

                {/* React Content: Tech & Design Stack Grid */}
                <section className="skills-section">
                    <div className="skills-grid">
                        {skillsLogos.map((skill) => (
                            <div key={skill.name} className="skill-item">
                                <img src={skill.src} alt={skill.name} title={skill.name} />
                                <div className="skill-name-hover">{skill.name}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WordPress Content AFTER the React Grid */}
                <div
                    className="experience-content wp-content after-react"
                    dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
                />
            </main>
        </div>
    );
}

export default ExperiencePage;