import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedImage from '../utilities/FeaturedImage'; // Assuming FeaturedImage is in the same components folder

const ProjectCard = ({ project }) => {
    return (
        <article key={project.id} id={`project-${project.id}`} className="project-card">
            {project.featured_media !== 0 && project._embedded && (
                <Link to={`/project/${project.slug}`}>
                    <FeaturedImage featuredImageObject={project._embedded['wp:featuredmedia'][0]} />
                </Link>
            )}

            <h2>
                <Link to={`/project/${project.slug}`} dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
            </h2>

            {/* You can choose whether or not to display the excerpt here */}
            {project.excerpt && (
                <div className="entry-excerpt" dangerouslySetInnerHTML={{ __html: project.excerpt.rendered }}></div>
            )}
        </article>
    );
};

export default ProjectCard;