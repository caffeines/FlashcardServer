const createValidator = (req, res, next) => {
  const topicInfo = Object.keys(req.body);
  const allowedInfo = ['name', 'url', 'tag', 'description', 'skill'];
  const isValidOperation = topicInfo.every((info) => allowedInfo.includes(info));
  if (!isValidOperation) {
    res.badRequest('not a valid request');
    return;
  }
  const { name, description, skill } = req.body;
  if (!name || name === '' || !description || description === '' || skill > 10 || skill < 0) {
    res.badRequest({ message: 'Check your input fields' });
    return;
  }
  next();
};
exports.createValidator = createValidator;
