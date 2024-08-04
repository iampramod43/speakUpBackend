/* eslint-disable max-len */
const Organization = require('../models/organizations');

const add = async objToSave => new Organization(objToSave).save();

const addMany = async (objs, options) => Organization.insertMany(objs, options);

const get = async (criteria, projection, options, populate = '') => Organization.find(criteria, projection, options).populate(populate);

const getOne = async (criteria, projection, options, populate = '') => Organization.findOne(criteria, projection, options).populate(populate);

const updateOne = async (criteria, dataToSet, options) => Organization.findOneAndUpdate(criteria, dataToSet, options);

const updateMany = async (criteria, dataToSet, options) => Organization.updateMany(criteria, dataToSet, options);

const getCount = async criteria => Organization.countDocuments(criteria);



const distinct = async (field, criteria, populate) => Organization.distinct(field, criteria).populate(populate);

module.exports = {
  add,
  addMany,
  get,
  getOne,
  getCount,
  updateOne,
  updateMany,
  distinct,
};