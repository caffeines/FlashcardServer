const Card = require('../../models/Card');
const { error } = require('../../constant/chalkEvent');

const updateCard = async (id, logic) => {
  try {
    const card = await Card.findByIdAndUpdate({ _id: id, ...logic }, { new: true });
    return card;
  } catch (ex) {
    error(ex);
    return Promise.reject(ex);
  }
};
exports.updateCard = updateCard;
