import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage } from './controllers/organizations.js';
import { projectsPage } from './controllers/projects.js';
import { categoriesPage, categoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { organizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectDetailsPage } from './controllers/projects.js';
import { getCategoryById } from './models/categories.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

router.get('/test-error', testErrorPage);

router.get('/organization/:id', organizationDetailsPage);
router.get('/project/:id', projectDetailsPage);
router.get('/category/:id', categoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/edit-organization/:id', showEditOrganizationForm);

router.post('/edit-organization/:id', processEditOrganizationForm, processEditOrganizationForm);


export default router;