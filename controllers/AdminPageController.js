import { trackInfoModel } from "../models/sequelize.js";
/*
var trackingNumberGen = Math.floor(
  Math.random() * (9999999999 - 1000000000) + 1000000000
);
*/

const trackingNumberGen = () => {
  return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
};

const postUserTrackInfo = async function (req, res) {
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

    res.send("sent");
  } catch (err) {
    console.log(err);
  }
};

const getAllTrackInfo = async function (req, res) {
  res.send("working okay");
  /*
  try {
    const allTrackingInfo = await trackInfoModel.findAll();
    console.log(allTrackingInfo);
    res.send(allTrackingInfo);
  } catch (err) {
    console.log(err);
  } */
};

//create search , put , delete,patch
export { postUserTrackInfo, getAllTrackInfo };
