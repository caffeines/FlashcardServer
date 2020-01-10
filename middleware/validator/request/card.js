/* eslint-disable object-curly-newline */
const createCardValidator = (req, res, next) => {
  const cardInfo = Object.keys(req.body);
  const allowedInfo = ['title', 'back', 'state', 'style', 'topic'];
  const isValidRequest = cardInfo.every((info) => allowedInfo.includes(info));

  if (!isValidRequest) {
    res.badRequest('not a valid request');
    return;
  }
  const { title, back, topic } = req.body;
  if (!title || !back || !topic) {
    res.badRequest({ message: 'Check your input fields' });
    return;
  }
  next();
};
exports.createCardValidator = createCardValidator;
