const Card = require('../../models/Card');
const { error } = require('../../constant/chalkEvent');

const createCard = async (cardObj) => {
  try {
    const newCard = new Card({ ...cardObj });
    const card = await newCard.save();
    return card;
  } catch (ex) {
    error(ex);
  }
};
exports.createCard = createCard;
