import { getAllProjects, getUpcomingProjects, getProjectDetails, getCategoryByProjectId } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const projectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categoriesByProject = await getCategoryByProjectId(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, categoriesByProject });
};

export { projectsPage, projectDetailsPage };