const jwt = require('jsonwebtoken');
import moment from 'moment';
/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (userId, expires, type) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000), 
    // Ensure 'expires' is also in seconds
    exp: Math.floor(Date.now() + 3600000 / 1000),
    type,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
// const saveToken = async (token, userId, expires, type, blacklisted = false) => {
//   const tokenDoc = await Token.createToken({
//     token,
//     user: userId,
//     expires: expires.toDate(),
//     type,
//     blacklisted,
//   });
//   return tokenDoc;
// };

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   const tokenDoc = await Token.getToken(payload.id,type);
//   if (!tokenDoc) {
//     throw new Error('Token not found');
//   }
//   return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
// const generateAuthTokens = async (user) => {
//   const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
//   const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

//   const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
//   const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
//   await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

//   return {
//     access: {
//       token: accessToken,
//       expires: accessTokenExpires.toDate(),
//     },
//     refresh: {
//       token: refreshToken,
//       expires: refreshTokenExpires.toDate(),
//     },
//   };
// };

// /**
//  * Generate reset password token
//  * @param {string} email
//  * @returns {Promise<string>}
//  */
// const generateResetPasswordToken = async (email) => {
//   const user = await userService.getUserByEmail(email);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
//   }
//   const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
//   const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
//   await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
//   return resetPasswordToken;
// };

// /**
//  * Generate verify email token
//  * @param {User} user
//  * @returns {Promise<string>}
//  */
// const generateVerifyEmailToken = async (user) => {
//   const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
//   const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
//   await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
//   return verifyEmailToken;
// };
