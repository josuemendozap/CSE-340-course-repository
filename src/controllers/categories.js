import { getAllCategories, getCategoryById, getProjectsByCategoryId } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    const title = 'Service Project Categories';
    res.render('categories', { title, categories });
};

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projectsByCategory = await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', { title, categoryDetails, projectsByCategory });
};

export { categoriesPage, categoryDetailsPage };