import _ from 'underscore';


class Util {
  static checkRequired(obj, ...requiredProps) {
    requiredProps.forEach((propName) => {
      if (!(propName in obj))
        throw `Required property "${propName}" not supplied to constructor`;
    });
  }
  static partialExtend(dest, source, ...keys) {
    return Object.assign(dest, _.pick(source, ...keys));
  }
}
export default Util;
