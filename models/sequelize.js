import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  process.env.SEQUELIZEDATABASE,
  process.env.SEQUELIZEUSER,
  process.env.SEQUELIZEPASSWORD,
  {
    host: process.env.SEQUELIZEHOST,

    dialect: "mysql",
  }
);

//tracking info for admin and user track info queries
const trackInfoModel = sequelize.define("trackInfoModel", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  trackingNumber: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//homepage big 5 images to auto slide
const homePageBigImagesModel = sequelize.define("homePageBigImagesModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  bigImagesUrlOnCloudinary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//homepage testimonials
const homePageTestimonialModel = sequelize.define("homePageTestimonialsModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  testimonialText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testimonialImageUrl: {
    type: DataTypes.STRING,
  },
});

//homepage News, image that flashing

const homePageNewsModel = sequelize.define("homePageNewsModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  newsText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  newsImageUrl: {
    type: DataTypes.STRING,
  },
});

await sequelize.sync({ alter: true });
//return trackInfo;

//homepage queries
/***like  1) 5 photos  id big img sliding 
      2)  testimonals  id 3 imgs text
      3 ) new id flasing mgss 

 *  
 * 
 * 
 */

/*  cloudinary will be imported here from middleware then url will be stored in db here */

/*
const homepageModelBigSlidingImages = sequelize.define(
  "homepageModelBigSlidingImages",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homePhotosUrl: {
      type: DataTypes.TEXT,
    },
  }
);

const homepageModelTestimonials = sequelize.define(
  "homepageModelTestimonials",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homepageTestimonialText: {
      type: DataTypes.TEXT,
    },
    homepageTestimonialImageUrl: {
      type: DataTypes.TEXT,
    },
  }
);

const homepageModelFlashingNews = sequelize.define(
  "homepageModelFlashingNews",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homepageFlashingNews: {
      type: DataTypes.TEXT,
    },
  }
);

*/
//try to export everything as one name then call it them from the other end
export {
  trackInfoModel,
  homePageNewsModel,
  homePageTestimonialModel,
  homePageBigImagesModel,
};
