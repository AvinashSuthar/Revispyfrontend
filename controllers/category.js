const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({success:true , categories});
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
