import {
  homePageBigImagesModel,
  homePageTestimonialModel,
  homePageNewsModel,
} from "../models/sequelize.js";

const homepageUserBigImages = async function (req, res) {
  try {
    //if images are than five,it will output all till the db values are set to only five values or select only five
    const userHomeBig = await homePageBigImagesModel.findAll();
    res.send(userHomeBig);
  } catch (err) {
    console.log(err);
  }
};

const homepageUserTestimonials = async function (req, res) {
  try {
    const userTestimonials = await homePageTestimonialModel.findAll();
    res.send(userTestimonials);
  } catch (err) {
    console.log(err);
  }
};

const homepageUserNews = async function (req, res) {
  try {
    const userNews = await homePageNewsModel.findAll();
    res.send(userNews);
  } catch (err) {
    console.log(err);
  }
};

const homeUser = {
  homepageUserBigImages,
  homepageUserTestimonials,
  homepageUserNews,
};
export { homeUser };
