import React, { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import "../styles/HomePage.css";

const HomePage = () => {
    const restPath = restBase + 'pages/2';
    const [restData, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(restPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.error('Could not fetch the data: ', err);
                setError('Failed to fetch page data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [restPath]);

    if (isLoading) {
        return <div>Loading page data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>{`Home | Kelly McLaughlin`}</title> {/* Hardcode the title */}
                </Helmet>

                <div className="homepage-container">
                    <article id={`post-${restData?.id}`}>
                        <h1 className="homepage-h1">
                            Kelly<br />
                            McLaughlin
                        </h1>
                        <div
                            className="homepage-entry-content"
                            dangerouslySetInnerHTML={{ __html: restData?.content?.rendered }}
                        ></div>
                    </article>
                </div>
            </>
        </HelmetProvider>
    );
};

export default HomePage;