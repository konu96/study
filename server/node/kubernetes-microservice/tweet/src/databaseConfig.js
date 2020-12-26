module.exports = () => {
  const dbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/tweet";

  const options = {
    useNewUrlParser: true
  };

  if (process.env.MONGODB_ADMIN_NAME) {
    options.user = process.env.MONGODB_ADMIN_NAME;
    options.password = process.env.MONGODB_ADMIN_PASSWORD;
    options.auth = { authSource: "admin" };
  }

  return {
    dbUrl,
    options
  };
};
