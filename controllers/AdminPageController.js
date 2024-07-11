import { random } from "mathjs";
import { trackInfoModel } from "../models/sequelize.js";

const postUserTrackInfo = async function (req, res) {
  var trackingNumberGen = Math.floor(
    Math.random() * (9999999999 - 1000000000) + 1000000000
  );
  console.log(trackingNumberGen);

  var fromBody = req.body.from;
  var locationBody = req.body.location;
  var destinationBody = req.body.destination;

  try {
    const postTrackInfo = await trackInfoModel.create({
      trackingNumber: trackingNumberGen,
      from: fromBody,
      location: locationBody,
      destination: destinationBody,
    });
  } catch (err) {
    onsole.log(err);
  }
};

const getAllTrackInfo = async function (req, res) {
  //res.send("working okay");
  try {
    const allTrackingInfo = await trackInfoModel.findAll();
    console.log(allTrackingInfo);
    res.send("working okay");
  } catch (err) {
    console.log(err);
  }
};

export { postUserTrackInfo, getAllTrackInfo };
