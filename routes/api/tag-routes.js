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

//POST (i.e., create) Tag Route
//req.body needs form:
//   {
//      "tag_name": "",
//      "productIds":[]
//    }
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tag = await Tag.create(req.body);
    //if there's tags with product, need to create pairings to bulk create in the ProductTag model
    if (req.body.productIds.length) {
      const tagProductIdArr = req.body.productIds.map((product_id) => {
        return {
          tag_id: tag.id,
          product_id,
        };
      });
      const tagProductIds = await ProductTag.bulkCreate(tagProductIdArr);
      res.status(200).json(tagProductIds);
    };
    //if tag has no product, just respond
    res.status(200).json(tag)
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


//PUT (i.e, update) Tag Route
router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //find all associated product from ProductTag
    const productTags = await ProductTag.findAll({ where: { tag_id: req.params.id } });
    //get list of current product_ids
    const productTagIds = productTags.map(({ product_id }) => product_id);
    //create filtered list of new product_ids
    const newProductTags = req.body.productIds
      .filter((product_id) => !productTagIds.includes(product_id))
      .map((product_id) => {
        return {
          tag_id: req.params.id,
          product_id,
        };
      });
    //figure out which ones to remove
    const productTagsToRemove = productTags
    .filter(({ product_id }) => !req.body.productIds.includes(product_id))
    .map(({ id }) => id);

    //run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.status(200).json(updatedProductTags);
  }
  catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
