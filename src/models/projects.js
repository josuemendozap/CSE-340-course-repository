import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT project_id, title, sp.description, location, date, o.name AS organization_name
      FROM public.service_project sp
      JOIN public.organization o
      ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
  SELECT project_id,
  title, description, location, date, organization_id
  FROM service_project
  WHERE organization_id = $1
  ORDER BY date;
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
}

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
  SELECT project_id, title, sp.description, date, location, sp.organization_id, o.name AS organization_name
  FROM service_project sp
  JOIN organization o
  ON sp.organization_id = o.organization_id
  WHERE date >= CURRENT_DATE
  ORDER BY date ASC
  LIMIT $1;
  `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);

  return result.rows;
}

const getProjectDetails = async (projectId) => {
  const query = `
  SELECT project_id, title, sp.description, date, location, sp.organization_id, o.name AS organization_name
  FROM service_project sp
  JOIN organization o
  ON sp.organization_id = o.organization_id
  WHERE project_id = $1
  `
  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows[0];
}

const getCategoryByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM category c
    JOIN project_categories pc
    ON c.category_id = pc.category_id
    WHERE pc.project_id = $1;
    `;

  const queryParams = [projectId]
  const result = await db.query(query, queryParams);

  return result.rows;
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getCategoryByProjectId };