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


export { getAllCategories, getCategoryById, getProjectsByCategoryId };