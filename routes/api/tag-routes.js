const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET Tags Route
router.get('/', async (req, res) => {
  try {
    // find all tags; include associated Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

//GET Tag by ID Route
router.get('/:id', async (req, res) => {
  try{ 
    // find a single tag by its `id`; include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(400).json({'message': 'No tag found with that ID.'})
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
