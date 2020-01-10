const createRoadMapValidator = (req, res, next) => {
  const roadMapInfo = Object.keys(req.body);
  const allowedInfo = ['name', 'ownStatus'];
  const { name, ownStatus } = req.body;
  const isValidRequset = roadMapInfo.every((info) => allowedInfo.includes(info));
  if (!isValidRequset) {
    res.badRequest('not a valid request');
    return;
  }
  if (!name || !ownStatus || typeof name !== 'string' || typeof ownStatus !== 'string') {
    res.badRequest({ message: 'Check your input fields' });
    return;
  }
  next();
};
exports.createRoadMapValidator = createRoadMapValidator;
