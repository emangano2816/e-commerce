const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET Products Route
router.get('/', async (req, res) => {
  try {
    // find all products; include associated category and tag data
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } 
  catch(err) {
    res.status(500).json(err);
  };
});

// GET Product by ID Route
router.get('/:id', async (req, res) => {
  try {
    // find a single product by its `id`; include assoicated Category and Tag data
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category}, { model: Tag }]
    });
    //if no product found for supplied ID, return error message; otherwise return product
    if (!productData) {
      res.status(400).json({'message': 'No product found with that ID.'})
    }
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// POST (i.e., create) Product Route
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(productTagIds);
    }
    // if no product tags, just respond
    res.status(200).json(product);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT (i.e., update) Product Route
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
    // get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.json(updatedProductTags);
  }
  catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});

//DELETE Product by ID
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
