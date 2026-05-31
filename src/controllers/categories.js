import { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignment,  } from "../models/categories.js";
import { getProjectDetails, getCategoryByProjectId } from "../models/projects.js";

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoryByProjectId(projectId);

    const title = 'Assign Categories to Project'

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
}

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignment(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
}

export { categoriesPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };