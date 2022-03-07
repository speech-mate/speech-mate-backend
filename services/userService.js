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

const updateFile = async (req, res, next) => {
  const { id, fileId } = req.params;
  const { subThemes } = req.body;

  try {
    const user = await User.findById(id);
    const newFiles = user.files.map((file) => {
      if (file._id.toString() === fileId) {
        const {
          title,
          min,
          sec,
          url,
          selectedTone,
          userPitch,
          createdAt,
          _id,
        } = file;
        return {
          _id,
          title,
          min,
          sec,
          url,
          selectedTone,
          userPitch,
          createdAt,
          subThemes,
        };
      }
      return file;
    });

    const result = await User.findByIdAndUpdate(
      id,
      { files: newFiles },
      { new: true },
    );

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

const deleteFile = async (req, res, next) => {
  const { id, fileId } = req.params;

  try {
    const user = await User.findById(id);
    const newFiles = user.files.filter(
      (file) => file._id.toString() !== fileId,
    );

    const result = await User.findByIdAndUpdate(
      id,
      { files: newFiles },
      { new: true },
    );

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

module.exports = { createFile, updateFile, deleteFile };
