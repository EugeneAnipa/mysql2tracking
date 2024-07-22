import {
  trackInfoModel,
  homePageBigImagesModel,
  homePageTestimonialModel,
  homePageNewsModel,
  aboutPageModel,
  contactPageModel,
} from "../models/sequelize.js";
import cloudinary from "../middleware/trackingAppmiddleware.js";
import multer from "multer";
import { test } from "uvu";
import fs from "node:fs"; //just for test to delete
import { randomInt } from "mathjs";

const upload = multer();

/*
var trackingNumberGen = Math.floor(
  Math.random() * (9999999999 - 1000000000) + 1000000000
);
*/

//the random number generator function itself has a problem
//it maybe how you created the fxn post, check the callings
/*
const trackingNumberGen = () => {
  return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
};
*/

const trackingNumberGen = randomInt(1000000000, 9999999999);
const postCreateUserTrackInfo = async function (req, res) {
  try {
    var trackNoInsert = trackingNumberGen;
    console.log(trackingNumberGen);
    var fromBody = req.body.from;
    var locationBody = req.body.location;
    var destinationBody = req.body.destination;

    const postTrackInfo = await trackInfoModel.create({
      trackingNumber: trackNoInsert,
      from: fromBody,
      location: locationBody,
      destination: destinationBody,
    });
    postTrackInfo;
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

//read docs for multer before the frontend form for this, it requires enctype="multipart/form-data"

//since the tables in the db columns values will be set, you need the upadate fxns here
const adminHhomePageBigImages = async function (req, res) {
  console.log(upload);

  var newTest = req.file.buffer;
  console.log(newTest);
  console.log(req.file);

  try {
    const bigImagesToCloudinary = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          asset_folder: "trackApp/homepage",
          //public_id: req.user + "_" + "bigImage",
          //overwrite: true,
          unique_filename: true,
        },
        async function (error, result) {
          console.log(error);
          console.log(result);
          //sequelize insert Url
          /*  await homePageBigImagesModel.create({
            homePageBigUrlOnCloudinary: result.secure_url,
          });  
          */
        }
      )
      .end(newTest);

    bigImagesToCloudinary;
    console.log(bigImagesToCloudinary);
    const bigImageUrlSendDB = await homePageBigImagesModel.create({
      homePageBigUrlOnCloudinary: bigImagesToCloudinary.secure_url,
    });
    bigImageUrlSendDB;
    res.send("done");
  } catch (err) {
    console.log(err);
  }
};

//testimonials
//const adminHomepageTestimonials =

//since the tables in the db columns values will be set, you need the upadate fxns here
const adminHomepageTestimonials = async function (req, res) {
  const testText = req.body.testText;

  const testImage = req.file(upload.single("testimonialImage"));
  try {
    const testimonialsSendCloudinary = await cloudinary.uploader
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
        }
      )
      .end(req.file.buffer);

    testimonialsSendCloudinary;
    const testimonialsUrlSendDB = await homePageBigImagesModel.create({
      testimonialImageUrl: testimonialsSendCloudinary.secure_url,
      testimonialText: testText,
    });
    testimonialsUrlSendDB;
  } catch (err) {
    console.log(err);
  }
};

//news,images that flashing
//since the tables in the db columns values will be set, you need the upadate fxns here
const adminHomepageNews = async function (req, res) {
  const newsText = req.body.newsText;

  const newsImage = req.file(upload.single("newsImages"));
  try {
    const newsImageCloudinary = await cloudinary.uploader
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
        }
      )
      .end(req.file.buffer);

    newsImageCloudinary;
    const newsImageUrlDb = await homePageNews.create({
      newsImageUrl: newsImage,
      newsText: newsText,
    });

    newsImageUrlDb;
  } catch (err) {
    console.log(err);
  }
};

//delete big image
//since the tables in the db columns values will be set, you need the upadate fxns here
const deleteHomeBigImage = async function (req, res) {
  const value = req.params.id;
  try {
    const [selectID] = await homePageBigImagesModel.findByPk(value);
    [selectID] = selectID.bigImagesUrlOnCloudinary;

    const cloudDelete = cloudinary.uploader
      .destroy(selectID, { asset_folder: "trackApp/homepage" })
      .then((result) => console.log(result));

    cloudDelete;

    const deleteUrl = await homePageBigImagesModel.destroy({
      where: {
        id: value,
      },
    });
    deleteUrl;
  } catch (err) {
    console.log(err);
  }
};

//delete news
//since the tables in the db columns values will be set, you need the upadate fxns here

const deleteNews = async function (req, res) {
  const value = req.params.id;

  const [selectID] = await homePageNewsModel.findByPk(value);
  [selectID] = selectID.newsImageUrl;
  try {
    const cloudDelete = cloudinary.uploader
      .destroy(selectID, { asset_folder: "trackApp/homepage" })
      .then((result) => console.log(result));

    cloudDelete;

    const deleteUrl = await homePageNewsModel.destroy({
      where: {
        id: value,
      },
    });
    deleteUrl;
  } catch (err) {
    console.log(err);
  }
};

//delete testimonials
//since the tables in the db columns values will be set, you need the upadate fxns here
const deleteTestimonials = async function (req, res) {
  const value = req.params.id;
  try {
    const [selectID] = await homePageTestimonialModel.findByPk(value);
    [selectID] = selectID.testimonialImageUrl;

    const cloudDelete = cloudinary.uploader
      .destroy(selectID, { asset_folder: "trackApp/homepage" })
      .then((result) => console.log(result));

    cloudDelete;

    const deleteUrl = await homePageTestimonialModel.destroy({
      where: {
        id: value,
      },
    });
    deleteUrl;
  } catch (err) {
    console.log(err);
  }
};

//upadate news

const updateNews = async function (req, res) {
  const value = req.params.id;
  const newsText = req.body.newsText;

  const newsImage = req.file(upload.single("newsImages"));
  try {
    //const textNewsImage = req.file;

    if (req.file == null) {
      const updateNews = await homePageNewsModel.update(
        {
          newsText: newsText,
        },
        {
          where: {
            id: value,
          },
        }
      );
    } else if (!(req.file == null)) {
      const findUrl = await homePageNewsModel.findOne(value);
      findUrl = findUrl.newsImageUrl;

      const cloudDelete = cloudinary.uploader
        .destroy(findUrl, { asset_folder: "trackApp/homepage" })
        .then((result) => console.log(result));

      cloudDelete;

      const newsImageCloudinary = await cloudinary.uploader
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
          }
        )
        .end(newsImage.buffer);

      newsImageCloudinary;

      const updateNews = await homePageNewsModel.update(
        {
          newsText: newsText,
          newsImageUrl: newsImageCloudinary.secure_url,
        },
        {
          where: {
            id: value,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

//update testimonial

const updateTestimonial = async function (req, res) {
  const value = req.params.id;
  const testimonialText = req.body.testimonialText;

  const testimonialImage = req.file(upload.single("testimonialImages"));
  try {
    //const textNewsImage = req.file;

    if (req.file == null) {
      const updateTest = await homePageTestimonialModel.update(
        {
          testimonialText: testimonialText,
        },
        {
          where: {
            id: value,
          },
        }
      );
    } else if (!(req.file == null)) {
      const findUrl = await homePageTestimonialModel.findOne(value);
      findUrl = findUrl.testimonialImageUrl;

      const cloudDelete = cloudinary.uploader
        .destroy(findUrl, { asset_folder: "trackApp/homepage" })
        .then((result) => console.log(result));

      cloudDelete;

      const testimoImageCloudinary = await cloudinary.uploader
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
          }
        )
        .end(testimonialImage.buffer);

      testimoImageCloudinary;

      const updateTest = await homePageTestimonialModel.update(
        {
          testimonialText: testimonialText,
          newsImageUrl: testimoImageCloudinary.secure_url,
        },
        {
          where: {
            id: value,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

/**            ABOUT  */
const aboutpageGet = async function (req, res) {
  const abouttext = req.body.abouttext;

  try {
    const abouttextGet = await aboutPageModel.findByPk(1);
    res.send(abouttextGet);
  } catch (err) {
    console.log(err);
  }
};
const aboutPageUpdate = async function (req, res) {
  const abouttext = req.body.abouttext;

  try {
    const aboutUpdate = await aboutPageModel.update(
      {
        abouttext: abouttext,
      },
      {
        where: {
          id: 1,
        },
      }
    );
    aboutUpdate;
  } catch (err) {
    console.log(err);
  }
};

/**            ABOUT */

/**            CONTACT */

//contactinfo get
const contactGet = async function (res, req) {
  try {
    const contactinfoGet = await contactPageModel.findAll();
    res.send(contactinfoGet);
  } catch (err) {
    console.log(err);
  }
};

//contact info delete
const contactDelete = async function (req, res) {
  const value = req.params.id;

  try {
    const contactInfoDelete = await contactPageModel.destroy(value);
    contactInfoDelete;
  } catch (err) {
    console.log(err);
  }
};

/**            CONTACT */

//getting the homepage from above for the admin side

const getHomePage = async function (req, res) {
  try {
    const allTrackingInfo = await trackInfoModel.findAll();
    const bigImages = await homePageBigImagesModel.findAll();

    const testimonials = await homePageTestimonialModel.findAll();
    const news = await homePageNewsModel.findAll();

    const li = document.createElement("li");
    li.innerHTML = `${bigImages}`;
    res.send(bigImages, testimonials, news, allTrackingInfo);
  } catch (err) {
    console.log(err);
  }
};

/**            HOMEPAGE */

console.log(upload);
export {
  postCreateUserTrackInfo,
  getAllTrackInfo,
  searchUserTracKInfo,
  deleteUserTrackInfo,
  updateUserTrackInfo,
  adminHhomePageBigImages,
  upload,
  getHomePage,
  adminHomepageTestimonials,
  adminHomepageNews,
  deleteHomeBigImage,
  deleteNews,
  deleteTestimonials,
  updateNews,
  updateTestimonial,
  aboutpageGet,
  aboutPageUpdate,
  contactGet,
  contactDelete,
};
