module.exports = (req, res, next) => {
  const responseTypes = {
    ok: '200',
    badRequest: '400',
    unauthorized: '401',
    forbidden: '403',
    notFound: '404',
    serverError: '500',
  };

  Object.keys(responseTypes).forEach((response) => {
    res[response] = (data, metaData) => {
      const statusCode = responseTypes[response];
      res.status(statusCode);
      const resJSON = {
        status: statusCode,
      };
      if (statusCode !== '200' && statusCode !== '500') {
        resJSON.errors = data;
      }
      if (statusCode === '200') {
        resJSON.data = data;
        resJSON.metaData = metaData;
      }
      if (statusCode === '500') {
        if (process.env.NODE_ENV !== 'production') {
          resJSON.errors = data;
        } else {
          resJSON.errors = 'Something went wrong, try again';
        }
      }
      res.json(resJSON);
    };
  });
  next();
};