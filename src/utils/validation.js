const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

export const validatePassword = (password) => {
  if (!PASSWORD_REGEX.test(password)) {
    return {
      isValid: false,
      error:
        "Password must be at least 12 characters long and contain uppercase, lowercase, number, and special character",
    };
  }
  return { isValid: true };
};

export const validateEmail = (email) => {
  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      error: "Invalid email format",
    };
  }
  return { isValid: true };
};

export const validateUsername = (username) => {
  if (!USERNAME_REGEX.test(username)) {
    return {
      isValid: false,
      error:
        "Username must be 3-20 characters and contain only letters, numbers, underscore, or hyphen",
    };
  }
  return { isValid: true };
};
