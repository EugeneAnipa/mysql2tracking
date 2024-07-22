import { trackInfoModel } from "../models/sequelize.js";

const userTrackGet = async function (req, res) {
  try {
    res.send("user trackpage with form to enter");
  } catch (err) {
    console.log(err);
  }
};

const userTrackPost = async function (req, res) {
  const trackingnNumber = req.body.trackingnNumber;
  try {
    const userTrackInfo = await trackInfoModel.findOne({
      where: {
        trackingnNumber: trackInfoModel,
      },
    });

    res.send(userTrackInfo);
  } catch (err) {
    console.log(err);
  }
};

export { userTrackGet, userTrackPost };
