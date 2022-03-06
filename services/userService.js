const createError = require("http-errors");
const User = require("../models/User");
const { MESSAGE } = require("../constants");

const createFile = async (req, res, next) => {
  const { id } = req.params;
  const { min, sec, title, frequency, subThemes, userPitch, selectedTone } =
    req.body;
  const { location } = req.file;

  const newFile = {
    title,
    min: Number(min),
    sec: Number(sec),
    url: location,
    subThemes: JSON.parse(subThemes),
    selectedTone: JSON.parse(selectedTone),
    userPitch: JSON.parse(userPitch),
    pitchStatus: JSON.parse(frequency),
    createdAt: new Date().toISOString(),
  };

  try {
    const result = await User.findByIdAndUpdate(
      id,
      {
        $push: { files: newFile },
      },
      { new: true },
    );

    console.log(result);

    res.json({
      message: MESSAGE.OK,
      data: {
        files: result.files,
      },
    });
  } catch (err) {
    next(createError(500, MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { createFile };
