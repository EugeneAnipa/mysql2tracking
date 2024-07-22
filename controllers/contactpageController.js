import { contactPageModel } from "../models/sequelize.js";

//contactinfo post to be copied to the client side
const contactPost = async function (res, req) {
  try {
    const contactinfoPost = await contactPageModel.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      message: req.body.email,
    });
  } catch (err) {
    console.log(err);
  }
};

export { contactPost };
