const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//GET Categories
router.get('/', async (req, res) => {
  try {
    // find all categories; include associated Products
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch(err) {
    res.status(500).json(err);
    };
});

//GET Category by ID
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value; include associated Products
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //if no category id found, return error message; otherwise, return category
    if (!catData) {
      res.status(400).json({message: 'No category found with that id.'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST (ADD new) Category
router.post('/', async (req, res) => {
  try {
    // create a new category
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json([{'message': 'Category added successfully.'}, {id: catData.id, category_name: catData.category_name}]);
  } catch (err) {
    res.status(400).json(err)
  };
});

//PUT (Update) Category name
router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //if category ID doesn't exist return error message; otherwise, return message with updated category
    if (!catData) {
      res.status(400).json({'message': 'No category with that ID. Check ID and try again.'});
    }
    res.status(200).json([{'message': 'Category updated successfully.'}, {id: req.body.id, category_name: req.body.category_name}]);
  } catch (err) {
    res.status(400).json(err);
  } 
});

//DELETE Category by ID
router.delete('/:id', async (req, res) => {
  try {
    const catDataDeleted = await Category.findByPk(req.params.id);
    // delete a category by its `id` value
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    //if category ID doesn't exist return error message; otherwise, return message with deleted category
    if (!catDataDeleted) {
      res.status(400).json({'message': 'No category with that ID. Check ID and try again.'});
    }
    res.status(200).json([{'message': 'Category deleted successfully.'}, {id: catDataDeleted.id, category_name: catDataDeleted.category_name}]);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
