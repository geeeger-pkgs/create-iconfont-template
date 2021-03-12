exports.getCodePoints = (codepoints) => {
  const result = {};
  Object.keys(codepoints).forEach(key => {
    result[key] = codepoints[key].code;
  });
  return result;
}

exports.getAlias = (codepoints) => {
  const result = {}
  Object.keys(codepoints).forEach(key => {
    result[codepoints[key].filename] = [key];
  });
  return result;
}
