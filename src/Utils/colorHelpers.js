/*
Simple helper function to convert HEX color
 values to RGB color values.
 */
function hexToRgb(hexVal) {
  const acceptedLengths = [4, 7];
  let hex = hexVal;
  // Make sure the input value is of type "string".
  if (typeof hex !== "string") {
    return null;
  }
  // Make sure the input value's size is equal to one of
  //   the values: 4(eg: #f3e), 7(eg: #ff33ee)
  if (!acceptedLengths.includes(hex.length)) {
    return null;
  }
  // If the hex code provided is a 3-digit one, expand it
  // to become a 6-digit code.
  if (hex.length === 4) {
    hex = [hex[0], hex[1], hex[1], hex[2], hex[2], hex[3], hex[3]];
  }
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
/*
 * Computes the luminace of the input color, relative to the one of the white
 * color.
 */
function computeLuminance(hexColor) {
  const rgbColor = hexToRgb(hexColor);
  // luminance of color white
  const whiteLum = 255;
  /// luminance of input color
  const lum = 0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b;

  return (lum / whiteLum).toFixed(2);
}

/**A function to dynamically change the font color of a component, based on the color of
 * its backround. Receives the backround color (HEX Format) of the component as input
 * and computes its relative luminance. Based on the value of the luminance, it return the
 * appropriate font color.*/
function computeFontColor(hexColor) {
  if (computeLuminance(hexColor) > 0.6) {
    return "#292929";
  } else {
    return "#FFFFFF";
  }
}

export { computeFontColor };
