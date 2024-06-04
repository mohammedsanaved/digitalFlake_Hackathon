// export const PaginationResult = (model) => {
//   return async (req, res, next) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     // const categories = await model.find();
//     const results = {};

//     if (endIndex < (await model.countDocuments().exec()))
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     try {
//       results.rows = await model.find().limit(limit).skip().exec();
//       res.PaginationResult = results;
//       next();
//     } catch (e) {
//       res.status(500).json({
//         message: e.message,
//       });
//     }

//     res.PaginationResult = results;
//     next();
//   };
// };
export const PaginationResult = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    try {
      // Count total documents
      const totalDocuments = await model.countDocuments().exec();

      if (endIndex < totalDocuments) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      results.totalPages = Math.ceil(totalDocuments / limit);
      results.currentPage = page;
      results.totalItems = totalDocuments;

      // Fetch the paginated data
      results.rows = await model.find().limit(limit).skip(startIndex).exec();

      res.PaginationResult = results;
      next();
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };
};
