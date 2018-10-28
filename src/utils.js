const parseUrl = (s) => {
  const splitUrl = s.split('=');
  return {
    page: parseInt(splitUrl[1], 10),
    name: splitUrl[2],
  };
};

export default parseUrl;
