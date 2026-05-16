CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	email VARCHAR(250) NOT NULL,
	logo_filename VARCHAR(250) NOT NULL
);

INSERT INTO organization (organization_id, name, description, email, logo_filename)
VALUES 
(1, 'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
(2, 'GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
(3, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_project (
	project_id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	location TEXT NOT NULL,
	date DATE NOT NULL,
	organization_id INT,
	FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

INSERT INTO service_project (project_id, title, description, location, date, organization_id)
VALUES 
	(1, 'Community Park Renovation', 'Renovation of a local park using sustainable materials.', 'Ciudad de México', '2026-06-10', 1),
	(2, 'Eco Housing Initiative', 'Building affordable eco-friendly housing for low-income families.', 'Guadalajara', '2026-07-05', 1),
	(3, 'School Infrastructure Upgrade', 'Improving classrooms and facilities in rural schools.', 'Oaxaca', '2026-08-12', 1),
	(4, 'Clean Water Systems', 'Installing water filtration systems in underserved communities.', 'Chiapas', '2026-09-01', 1),
	(5, 'Solar Energy Installations', 'Adding solar panels to community centers.', 'Puebla', '2026-10-15', 1),
	(6, 'Urban Garden Workshop', 'Teaching residents how to grow their own food in small spaces.', 'Monterrey', '2026-06-20', 2),
	(7, 'Community Compost Program', 'Launching composting initiatives in neighborhoods.', 'Ciudad de México', '2026-07-18', 2),
	(8, 'School Garden Project', 'Creating educational gardens in elementary schools.', 'Querétaro', '2026-08-25', 2),
	(9, 'Farmers Market Support', 'Helping local farmers sell organic produce.', 'Guadalajara', '2026-09-10', 2),
	(10, 'Sustainable Farming Training', 'Training sessions on eco-friendly farming techniques.', 'Yucatán', '2026-10-05', 2),
	(11, 'Food Drive Campaign', 'Organizing food collection for local shelters.', 'Ciudad de México', '2026-06-05', 3),
	(12, 'Neighborhood Cleanup', 'Volunteer cleanup of public spaces.', 'Toluca', '2026-07-12', 3),
	(13, 'Elderly Support Visits', 'Weekly visits to assist elderly residents.', 'Puebla', '2026-08-03', 3),
	(14, 'Clothing Donation Drive', 'Collecting and distributing clothing to those in need.', 'León', '2026-09-22', 3),
	(15, 'Disaster Relief Support', 'Providing aid and supplies after natural disasters.', 'Veracruz', '2026-10-30', 3);