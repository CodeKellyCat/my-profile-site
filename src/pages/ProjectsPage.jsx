import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restBase } from '../utilities/Utilities';
import Loading from '../utilities/Loading';
import '../styles/ProjectsPage.css';

const ProjectsPage = () => {
    const restPath = `${restBase}project?_embed&orderby=title&order=asc`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data.slice(0, 4)); // Get the first 4 projects
                setLoadStatus(true);
            } catch (err) {
                setError(err.message);
                setLoadStatus(true);
            }
        };
        fetchData();
    }, [restPath]);

    if (!isLoaded) {
        return <Loading />;
    }

    if (error) {
        return <div className="error">Error loading projects: {error}</div>;
    }

    return (
        <div className='project-page-container'>
            <main className="projects-page">
                <h1>Projects</h1>
                <div className="projects-grid">
                    {restData.map(project => {
                        const featuredImage = project._embedded && project._embedded['wp:featuredmedia'] && project._embedded['wp:featuredmedia'][0];
                        return (
                            <article key={project.id} className="project-item">
                                <Link to={`/project/${project.slug}`}>
                                    {featuredImage && (
                                        <img
                                            src={featuredImage.source_url}
                                            alt={featuredImage.alt_text}
                                        />
                                    )}
                                    <h2 dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default ProjectsPage;