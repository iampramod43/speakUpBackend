/* eslint-disable max-len */
const Issue = require('../models/issues');

const add = async objToSave => new Issue(objToSave).save();

const addMany = async (objs, options) => Issue.insertMany(objs, options);

const get = async (criteria, projection, options, populate = '') => Issue.find(criteria, projection, options).populate(populate);

const getOne = async (criteria, projection, options, populate = '') => Issue.findOne(criteria, projection, options).populate(populate);

const updateOne = async (criteria, dataToSet, options) => Issue.findOneAndUpdate(criteria, dataToSet, options);

const updateMany = async (criteria, dataToSet, options) => Issue.updateMany(criteria, dataToSet, options);

const getCount = async criteria => Issue.countDocuments(criteria);

const aggregate = async pipelines => Issue.aggregate(pipelines);

const distinct = async (field, criteria, populate) => Issue.distinct(field, criteria).populate(populate);

module.exports = {
  add,
  addMany,
  get,
  getOne,
  getCount,
  updateOne,
  updateMany,
  distinct,
  aggregate
};