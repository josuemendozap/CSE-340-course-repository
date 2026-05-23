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

export { getAllProjects, getProjectsByOrganizationId };