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

const createCategory = async (name) => {
    const query = `
      INSERT INTO category (name)
      VALUES ($1)
      RETURNING category_id;
    `;

    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
  UPDATE category
  SET name = $1
  WHERE category_id = $2
  RETURNING category_id;
  `;

    const queryParams = [name, categoryId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated Category With ID:', categoryId);
    }

    return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignment, createCategory, updateCategory };