import {
  trackInfoModel,
  homePageBigImagesModel,
  homePageTestimonialModel,
  homePageNewsModel,
} from "../models/sequelize.js";
import cloudinary from "../middleware/trackingAppmiddleware.js";
import multer from "multer";
import { test } from "uvu";

const upload = multer();
/*
var trackingNumberGen = Math.floor(
  Math.random() * (9999999999 - 1000000000) + 1000000000
);
*/

//the random number generator function itself has a problem
//it maybe how you created the fxn post, check the callings
const trackingNumberGen = () => {
  return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
};

const postCreateUserTrackInfo = async function (req, res) {
  try {
    var trackNoInsert = trackingNumberGen();

    var fromBody = req.body.from;
    var locationBody = req.body.location;
    var destinationBody = req.body.destination;

    const postTrackInfo = await trackInfoModel.create({
      trackingNumber: trackNoInsert,
      from: fromBody,
      location: locationBody,
      destination: destinationBody,
    });
    postTrackInfo();
    res.send("sent");
  } catch (err) {
    console.log(err);
  }
};

const getAllTrackInfo = async function (req, res) {
  //res.send("working okay");

  try {
    const allTrackingInfo = await trackInfoModel.findAll();
    console.log(allTrackingInfo);
    res.send(allTrackingInfo);
  } catch (err) {
    console.log(err);
  }
};

//create search , put , delete,patch

const updateUserTrackInfo = async function (req, res) {
  const fromUpdate = req.body.from;
  const locationUpdate = req.body.location;
  const destinationUpdate = req.body.destination;

  try {
    const updateUsertrackInfo = await trackInfoModel.update(
      {
        from: fromUpdate,
        location: locationUpdate,
        destination: destinationUpdate,
      },
      {
        where: {
          trackingNumber: req.body.trackingNumber,
        },
      }
    );

    updateUsertrackInfo;
    console.log(updateUsertrackInfo);
    res.send(updateUsertrackInfo);
  } catch (err) {
    console.log(err);
  }
};
const deleteUserTrackInfo = async function (req, res) {
  try {
    const deleteUserTrackingInfoByTraNo = await trackInfoModel.destroy({
      where: {
        trackingNumber: req.body.trackingNumber,
      },
    });
    deleteUserTrackingInfoByTraNo;
    res.send("deleted");
  } catch (err) {
    console.log(err);
  }
};

//search by tracking check how to implement by one
const searchUserTracKInfo = async function (req, res) {
  try {
    const searchTrackInfoByTrackNo = await trackInfoModel.findOne({
      where: {
        trackingNumber: req.body.trackingNumber,
      },
    });
    searchTrackInfoByTrackNo;
    console.log(searchTrackInfoByTrackNo);
    res.send(searchTrackInfoByTrackNo);
  } catch (err) {
    console.log(err);
  }
};

/**            HOMEPAGE */
//const adminHhomePageBigImages = ,think calling the upload rather in the function than the begiining,or declare it as a variable then you call it
const adminHhomePageBigImages = async function (req, res) {
  console.log(req.file);
  //console.log(req.file.buffer);
  try {
    // Upload an image

    //console.log(req.file);
    // so with the req.file, read docs , on how to set it as a variable

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          asset_folder: "trackApp/homepage",
          //public_id: req.user + "_" + "bigImage",
          overwrite: true,
          unique_filename: true,
        },
        async function (error, result) {
          console.log(error);
          console.log(result);
          //sequelize insert Url
          await homePageBigImagesModel.create({
            homePageBigUrlOnCloudinary: result.secure_url,
          });
        }
      )
      .end(req.file.buffer);

    res.send("done");
  } catch (err) {
    console.log(err);
  }
};

//testimonials
//const adminHomepageTestimonials =
const adminHomepageTestimonials = async function (req, res) {
  const testText = req.body.testText;

  const testImage = req.file(upload.single("testimonialImage"));
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          asset_folder: "trackApp/homepage",
          //public_id: req.user + "_" + "bigImage",
          overwrite: true,
          unique_filename: true,
        },
        async function (error, result) {
          console.log(error);
          console.log(result);
          //sequelize insert Url
          await homePageBigImagesModel.create({
            testimonialImageUrl: testImage,
            testimonialText: testText,
          });
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log(err);
  }
};

//news,images that flashing
const adminHomepageNews = async function (req, res) {
  const newsText = req.body.newsText;

  const newsImage = req.file(upload.single("newsImages"));
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          asset_folder: "trackApp/homepage",
          //public_id: req.user + "_" + "bigImage",
          overwrite: true,
          unique_filename: true,
        },
        async function (error, result) {
          console.log(error);
          console.log(result);
          //sequelize insert Url
          await homePageNews.create({
            newsImageUrl: newsImage,
            newsText: newsText,
          });
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log(err);
  }
};

//admin Homepage crud below ,it will display before crud

//getting the homepage from above for the admin side

const getHomePage = async function (req, res) {
  try {
    const bigImages = await homePageBigImagesModel.findAll();

    const testimonials = await homePageTestimonialModel.findAll();
    const news = await homePageNewsModel.findAll();
    res.send("<td>bigImages</td>, <td>testimonials</td>, <td>news</td>");
  } catch (err) {
    console.log(err);
  }
};

/**            HOMEPAGE */

/**            ABOUT  */

/**            ABOUT */

/**            CONTACT */

/**            CONTACT */

/** There must be a big function to display all pages content on the admin side,
 *which will have the crud fxn */

console.log(upload);
export {
  postCreateUserTrackInfo,
  getAllTrackInfo,
  searchUserTracKInfo,
  deleteUserTrackInfo,
  updateUserTrackInfo,
  adminHhomePageBigImages,
  upload,
};
