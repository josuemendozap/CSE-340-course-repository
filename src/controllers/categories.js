import { getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignment, createCategory, updateCategory } from "../models/categories.js";
import { getProjectDetails, getCategoryByProjectId } from "../models/projects.js";
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

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

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
}

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-category');
    }

    const { name } = req.body;
    
    const categoryId = await createCategory(name);

    // Set a success flash message
    req.flash('success', 'Category added successfully!');

    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);

    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-category/' + req.params.id);
    }

    const categoryId = req.params.id;
    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully');

    res.redirect(`/category/${categoryId}`);
}

export { categoriesPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm };