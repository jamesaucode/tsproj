import express from "express";
import { Model, Document } from "mongoose";
import console = require("console");

type CrudFunction = (
  req: express.Request,
  res: express.Response,
) => Promise<void | Response>;

export const getOne = (model: Model<Document>): CrudFunction => async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  console.log(req.params.id);
  try {
    const doc = await model
      .findOne({ creator: req.user._id, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) {
      res.status(400).end();
    }
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getMany = (model: Model<Document>): CrudFunction => async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const docs = await model
      .find({ creator: req.user._id })
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const createOne = (model: Model<Document>): CrudFunction => async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    // Test! Take this out later
    if (!req.user._id) {
      res.status(400).end();
    }
    const doc = await model.create({
      ...req.body,
      creator: req.user._id,
      // creator: Types.ObjectId(),
    });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateOne = (model: Model<Document>): CrudFunction => async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          creator: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true },
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      res.status(400).end();
    }
    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const removeOne = (model: Model<Document>): CrudFunction => async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const removed = await model.findOneAndRemove({
      creator: req.user._id,
      _id: req.params.id,
    });

    if (!removed) {
      res.status(400).end();
    }
    res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const crudControllers = (
  model: Model<Document>,
): {
  removeOne: CrudFunction;
  updateOne: CrudFunction;
  getMany: CrudFunction;
  getOne: CrudFunction;
  createOne: CrudFunction;
} => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
