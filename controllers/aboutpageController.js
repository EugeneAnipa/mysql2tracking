import { aboutPageModel } from "../models/sequelize.js";

const aboutpageGet = async function (req, res) {
  const abouttext = req.body.abouttext;

  try {
    const abouttextGet = await aboutPageModel.findByPk(1);
    res.send(abouttextGet);
  } catch (err) {
    console.log(err);
  }
};

export { aboutpageGet };
