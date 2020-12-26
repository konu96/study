export default callback => {
  // ここで非同期で data を取得するが、今回は適当な値
  const data = 'peanut butter';

  callback(data);
};
