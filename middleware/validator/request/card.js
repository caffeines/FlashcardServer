/* eslint-disable object-curly-newline */
const createCardValidator = (req, res, next) => {
  const cardInfo = Object.keys(req.body);
  const allowedInfo = ['title', 'description', 'url', 'topic'];
  const isValidRequest = cardInfo.every((info) => allowedInfo.includes(info));

  if (!isValidRequest) {
    res.badRequest('not a valid request');
    return;
  }
  const { title, description, topic } = req.body;
  if (!title || !description || !topic || !topic.length) {
    res.badRequest({ message: 'Check your input fields' });
    return;
  }
  next();
};
exports.createCardValidator = createCardValidator;
