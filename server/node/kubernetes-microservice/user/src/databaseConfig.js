module.exports = () => {
  const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/user';
  const options = { useNewUrlParser: true };

  if (process.env.MONGODB_ADMIN_NAME) {
    options.user = process.env.MONGODB_ADMIN_NAME;
    options.pass = process.env.MONGODB_ADMIN_PASS;
    options.auth = { authSource: 'admin' };
  }

  return {
    dbUrl,
    options
  };
};
