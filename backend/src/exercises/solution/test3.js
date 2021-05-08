const getFileExtension = (str) => {
  const match = str.split(".");
  return match.length > 1 ? match[match.length - 1] : false;
};
