# E-Commerce Back End

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Link(s)

[GitHub Repository](https://github.com/emangano2816/e-commerce)

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria
```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

## Summary of Application Functionality
Sequelize uses information included in the .env file to establish a connection with the MySQL database for this application.  

Prior to seeding the database, the database must be created.  From the mysql command, type, 'source schemas.sql'.  This will create a database called ecommerce_db.  Once the database has been created it can be seeded by typing 'npm run seed' in the terminal command.  Once the database has been seeded, type 'node server.js' in the terminal command window to start the server and to sync the sequelize models with the MySQL database.

Once the server has been started the routes can be tested using Insomnia Core.  The following routes are available:

For Categories:
  * GET Categories:  returns all categories with any existing product assoications
  * GET Category by ID:  returns a single category with any existing product associations by ID
  * POST Category:  creates a category (adding it the Category table)
  * PUT Category: updates the category details in the Category table
  * DELETE Category: deletes a category (removes it from the Cateogry table) by ID; removing the category also sets the category_id to NULL for any products associated with the category
  
For Products:
  * GET Products:  returns all products with any existing category and tag associations
  * GET Product by ID:  returns a single product with any existing category and tag associations by ID
  * POST Product:  creates a product (adding it to the Product table) and adds new product-tag associations to the ProductTag table
  * PUT Product: updates the product details in the Product table and makes necessary updates to the ProductTag table based on any new/removed associations
  * DELETE Product: deletes a Product (removes it from the Product table) by ID and aslo removes the product-tag associations for the deleted product from the ProductTag table
  
 For Tags:
  * GET Tags:  returns all tags with any existing product associations
  * GET Tag by ID:  returns a single tag with any existing product associations by ID
  * POST Tag:  creates a tag (adding it to the Tag table) and adds new product-tag associations to the ProductTag table
  * PUT Tag: updates the tag details in the Tag table and makes necessary updates to the ProductTag table based on any new/removed associations
  * DELETE Tag: deletes a tag (removes it from the Tag table) by ID and aslo removes the product-tag associations for the deleted tag from the ProductTag table
    
## Tecnhologies Used

1. Node.js
2. Express, Dotenv, Mysql2, Sequelize
3. MySQL Workbench
4. JavaScript
5. Insomnia

## Installation

1. Create DB using db/schemas.sql.  From mysql command type:  source schemas.sql
2. Install npm dependencies.  From terminal type: npm i
3. Rename .env.EXAMPLE to .env and update credentials accordingly.
4. Seed DB using using provided data.  From terminal type: npm run seed
5. Start server. From terminal type: node server.js

## Video Demonstration



## License

This application is covered under the MIT license.
