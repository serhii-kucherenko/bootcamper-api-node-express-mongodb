const { forEach, replace, toInteger } = require("lodash");

const advancedResults = (model, populate) => async (req, res, next) => {
  // Copy request query
  let reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from
  forEach(removeFields, param => delete reqQuery[param]);

  // Stringify request query
  let queryStr = JSON.stringify(reqQuery);

  // Create operators like $gt, $gte, $lt, etc...
  queryStr = replace(queryStr, /\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resources
  let query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  // Pagination
  const page = toInteger(req.query.page) || 1;
  const limit = toInteger(req.query.limit, 10) || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = { total };

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
};

module.exports = advancedResults;
