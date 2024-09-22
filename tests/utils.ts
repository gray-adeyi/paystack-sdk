export function generateRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  const randomValues = new Uint32Array(length);

  // Generate cryptographically secure random values
  crypto.getRandomValues(randomValues);

  // Convert the random values to characters from the charset
  for (let i = 0; i < length; i++) {
    randomString += charset[randomValues[i] % charset.length];
  }

  return randomString;
}
