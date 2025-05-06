import { useState, useEffect } from "react";
import { restBase } from "../utilities/Utilities";

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

    if (!isLoaded) return;
    if (!pageData) return <div className="error">Experience page not loaded</div>;

    return (
        <div className="page-container">
            <div className="centered-content">
                <main className="experience-page">

                    <div
                        className="experience-content wp-content"
                        dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
                    />
                </main>
            </div>
        </div>
    );
};

export default ExperiencePage;