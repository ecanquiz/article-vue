/**
   * Important: It's crucial to note that these functions can't guarantee 100% that a string is Base64, but they do provide robust verification. In some cases, malformed strings may pass character validation but fail decoding.
   * Alternative (Node.js): If you're working with Node.js, you can use the Buffer module to verify the string.
   * 
   * // Node.js
   * function isBase64Node(str) {
   *   try {
   *     const buffer = Buffer.from(str, 'base64');
   *     return str === buffer.toString('base64');
   *   } catch (error) {
   *     return false;
   *   }
   * }
   */

export const isBase64 = function(str: string) {
  const regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return regex.test(str);
}

export const isValidBase64 = function(str: string) {
  try {
    const decoded = atob(str);
    const encoded = btoa(decoded);
    return str === encoded;
  } catch (error) {
    return false;
  }
}

export const validateBase64DataURL = function(dataURL: string) {
  const base64Regex = /^data:image\/[a-zA-Z]+;base64,(.+)$/;
  const match = dataURL.match(base64Regex);
  if (match) {
    const base64String = match[1];
    return isBase64(base64String) && isValidBase64(base64String);
  }
  return false;
}
