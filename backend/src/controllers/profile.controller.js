const db = require("../database");

// Select all profiles from the database.
exports.all = async (req, res) => {
  // Eager load the pets.
  const profiles = await db.profile.findAll({
    include: { model: db.pet, as: "pets" }
  });

  res.json(profiles);
};

// Select one profile from the database.
exports.one = async (req, res) => {
  const profile = await db.profile.findByPk(req.params.email);

  res.json(profile);
};

// Update a profile in the database.
exports.update = async (req, res) => {
  const profile = await db.profile.findByPk(req.body.email);
  
  // Update profile fields.
  profile.first_name = req.body.first_name;
  profile.last_name = req.body.last_name;
  profile.mobile = req.body.mobile;
  profile.street = req.body.street;
  profile.city = req.body.city;
  profile.state = req.body.state;
  profile.postcode = req.body.postcode;

  await profile.save();

  res.json(profile);
};
