const createValidator = (req, res, next) => {
  const topicInfo = Object.keys(req.body);
  const allowedInfo = ['name'];
  const isValidOperation = topicInfo.every((info) => allowedInfo.includes(info));
  if (!isValidOperation) {
    res.badRequest('not a valid request');
    return;
  }
  const { name } = req.body;
  if (!name || name === '' || typeof name !== 'string') {
    res.badRequest({ message: 'Check your input fields' });
    return;
  }
  next();
};
exports.createValidator = createValidator;
