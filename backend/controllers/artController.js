import asyncHandler from "express-async-handler";

import Art from "../models/artModel.js";

const getArts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Art.countDocuments({ ...keyword });

  const arts = await Art.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ arts, page, pages: Math.ceil(count / pageSize) });
});

const getArtById = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);

  if (art) {
    res.json(art);
  } else {
    res.status(404);
    throw new Error("Art Not Found");
  }
});

const deleteArt = asyncHandler(async (req, res) => {
  const art = await Art.findById(req.params.id);

  if (art) {
    await art.remove();
    res.json({ message: "Art Removed" });
  } else {
    res.status(404);
    throw new Error("Art Not Found");
  }
});

const createArt = asyncHandler(async (req, res) => {
  const art = new Art({
    name: "New Art",
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "New Description",
  });

  const createdArt = await art.save();
  res.status(201).json(createdArt);
});

const updateArt = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  const art = await Art.findById(req.params.id);
  if (art) {
    art.name = name;
    art.image = image;
    art.description = description;

    const updatedArt = await art.save();
    res.json(updatedArt);
  } else {
    res.status(404);
    throw new Error("Art Not Found");
  }
});

const createArtReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const art = await Art.findById(req.params.id);
  if (art) {
    const alreadyReviewed = art.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Art Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    art.reviews.push(review);

    art.numReviews = art.numReviews.length;

    art.rating =
      art.reviews.reduce((acc, item) => item.rating + acc, 0) /
      art.reviews.length;
    await art.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Art Not Found");
  }
});

export {
  getArts,
  getArtById,
  deleteArt,
  createArt,
  updateArt,
  createArtReview,
};
