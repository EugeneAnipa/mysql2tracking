import express from "express";

import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

const app = express();

/*

const TestAppdb = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "TestDB",
  password: "",
});
await trackAppdb.query("create database if not exist");

*/

const sequelize = new Sequelize("testSeQDB", "root", "", {
  host: "localhost",

  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//this is how you insert into the db
/*
const Jane = User.build({ firstName: "Jane", lastName: "Joe" });
await Jane.save();

//shortcut method

const John = User.create({ firstName: "John", lastName: "Evans" });

console.log(Jane instanceof User);
console.log(Jane.lastName);

//stringedfy well
// pulls out the column and display it in object
console.log(Jane.toJSON());

console.log(JSON.stringify(Jane, null));

//using built instance to get values

console.log(Jane.firstName);

//Updating all Instance
const Jane1 = await User.create({ firstName: "kojo", lastName: "Kue" });
Jane1.firstName = "Non";

await Jane1.save();

//update specific instance
const Doe1 = await User.create({ firstName: "doe", lastName: "Doe" });
Doe1.firstName = "roe";
await Doe1.update({ lastName: "Loe" });
await Doe1.save();

//delete
const Troy = await User.create({ lastName: "Troy", firstName: "DEs" });
console.log(Troy.lastName);
await Troy.destroy();

//reloading

//for only a specific table await User.sync();
await sequelize.sync();
//drop table await sequelize.drop() or await User.drop();
//defaultValue --attribute to set
// DataTypes.Now current time
//DataTypes.Float for banking data
//DataTypes.UUIDVA or defaultVAlue : UUID1-4 , use for unique ID
//npm i inflections --single to plurals words
//ENUM ["foot","CREDIT","DEBIT"] primarykey ,unique
/*
bar_id : {
type:DataTypes.INTEGER,
references: {
model :Bar
key : "id"}
}
/*
*/
//console.log(Jane.id);

//selecting * from
//const users = await User.findAll();
//console.log(users);
//console.log(JSON.stringify(users));

//select only certain attributes
/*
const users = await User.findAll({
  attributes: ["lastName"],
});

console.log(users);

*/

//where
/*
const users = User.findAll({
  where: {},
});

console.log(users);



*/

//update

/*
const users = await User.update(
  {
    lastName: "Mama",
  },
  {
    where: {
      id: 58,
    },
  }
);
console.log(users);


*/
//delete
/*
const users = await User.destroy({
  where: {
    id: 56,
  },
});
console.log(users);


*/

//finding or select one ,all ,findPK--only by primary key ,--something by id ,the up one did not work  and also find or create , count
/*
const users = await User.findByPk(55);
console.log(users);

*/

//findOne
const users = await User.findOne({
  where: { id: 55 },
});
console.log(User === sequelize.models.USer);

const serverPort = 8000;
app.listen(8000, () => {
  console.log("server is running on " + 8000);
});
