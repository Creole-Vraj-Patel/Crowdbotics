const express = require("express");
const { Agent } = require("./model");
const Joi = require("joi");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const Agentschema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  agentLicence: Joi.string().required(),
  address: Joi.string().required(),
  practiceAreas: Joi.string(),
  photoUrl: Joi.string(),
  aboutMe: Joi.string(),
});

app.get("/agents", async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

app.post("/agent/create", async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const photoUrl = req.body.photoUrl;
  const agentLicence = req.body.agentLicence;
  const address = req.body.address;
  const practiceAreas = req.body.practiceAreas;
  const aboutMe = req.body.aboutMe;

  console.log(req.body);

  try {
    const value = Agentschema.validate({
      firstName,
      lastName,
      photoUrl,
      agentLicence,
      address,
      practiceAreas,
      aboutMe,
    });
    if (value.error) {
      console.log(value.error.message);
      return res.json({ status: value.error.status, message: value.message });
    }

    await Agent.create({
      firstName,
      lastName,
      photoUrl,
      agentLicence,
      address,
      practiceAreas,
      aboutMe,
    })
      .then(res.json({ status: 200, message: "Agent added successfully" }))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.json({ status: err.status ? err.status : 400, message: err.message });
  }
});

module.exports = app;
