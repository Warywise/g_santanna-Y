
const clientRegEx = (/[^çãôéáíúa-z\s\']+/gi);
const foodDrinkRegEx = (/([\-\,\'\"\s\wçãâáêéíõôú]+)(\s+)?\=(\s+)?\d+([\.]?[\d]+)?/gi);

const firstValidation = (string) => {
  let newString = string.replace(/([\w|\s])\.+([\w|\s])/g, '$1,$2');
  return newString.replace(/(\d+)[\,|\.]+(\d+)/g, '$1.$2');
}


export { firstValidation, clientRegEx, foodDrinkRegEx }