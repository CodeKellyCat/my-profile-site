import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restBase } from '../utilities/Utilities';
import Loading from '../utilities/Loading';

const SingleProject = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);
    const [error, setError] = useState(null);
    const restPath = `${restBase}project?slug=${slug}&_embed`; // Corrected restPath

    useEffect(() => {
        const fetchSingleProject = async () => {
            try {
                const response = await fetch(restPath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data && data.length > 0) {
                    setProject(data[0]);
                    setLoadStatus(true);
                } else {
                    setLoadStatus(true);
                    setError('Project not found.');
                }
            } catch (err) {
                setError(err.message);
                setLoadStatus(true);
            }
        };

        fetchSingleProject();
    }, [restPath, slug]);

    if (!isLoaded) {
        return <Loading />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!project) {
        return <div>Project not found.</div>;
    }

    return (
        <article className="project-detail">
            <h1>{project.title.rendered}</h1>
            {project._embedded && project._embedded['wp:featuredmedia'] && (
                <img
                    src={project._embedded['wp:featuredmedia'][0].source_url}
                    alt={project._embedded['wp:featuredmedia'][0].alt_text}
                />
            )}
            <div className="entry-content" dangerouslySetInnerHTML={{ __html: project.content.rendered }}></div>
            {/* Add other project details here */}
        </article>
    );
};

export default SingleProject;