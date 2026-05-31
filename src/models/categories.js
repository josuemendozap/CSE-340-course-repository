import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
    SELECT category_id, name
    FROM category
    WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.location, sp.organization_id
    FROM service_project sp
    JOIN project_categories pc
    ON sp.project_id = pc.project_id
    WHERE pc.category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
    INSERT INTO project_categories (project_id, category_id)
    VALUES ($1, $2);
    `;

    await db.query(query, [projectId, categoryId]);
}

const updateCategoryAssignment = async (projectId, categoryIds) => {
    const deleteQuery = `
    DELETE FROM project_categories
    WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
}

export { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignment };