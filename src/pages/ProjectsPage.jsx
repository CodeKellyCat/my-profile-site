import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { restBase } from '../utilities/Utilities'
import Loading from "../utilities/Loading"
import ProjectCard from '../components/ProjectCard'

const ProjectsPage = () => {
    const restPath = `${restBase}project?_embed&orderby=title&order=asc` // Removed the extra 'wp/v2/'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } catch (err) {
                setError(err.message)
                setLoadStatus(true)
            }
        }
        fetchData()
    }, [restPath])

    if (!isLoaded) {
        return <Loading />
    }

    if (error) {
        return <div className="error">Error loading projects: {error}</div>
    }

    return (
        <main className="projects-page">
            <h1>Projects</h1>
            <div className="projects-grid">
                {restData.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </main>
    )
}

export default ProjectsPage