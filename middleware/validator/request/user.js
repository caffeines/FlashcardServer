const isNameAvilable = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.badRequest({ message: 'Card name is empty' });
    return;
  }
  next();
};
exports.isNameAvilable = isNameAvilable;
