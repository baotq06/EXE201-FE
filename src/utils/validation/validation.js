/* eslint-disable */
import * as Yup from "yup";

// Regex patterns
const REGEX = {
  PHONE: /^(03[2-9]|05[2-9]|07[0-9]|08[1-9]|09[0-9])\d{7}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Schema validate cho form thông tin cá nhân
export const profileValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("Vui lòng nhập họ và tên")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(50, "Họ và tên không được vượt quá 50 ký tự"),

  email: Yup.string()
    .required("Vui lòng nhập email")
    .matches(REGEX.EMAIL, "Email không hợp lệ"),

  phoneNumber: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(REGEX.PHONE, "Số điện thoại không hợp lệ"),

  address: Yup.string()
    .required("Vui lòng nhập địa chỉ")
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự"),

  gender: Yup.string()
    .required("Vui lòng chọn giới tính")
    .oneOf(["male", "fermale", "other"], "Giới tính không hợp lệ"),
});

// Hàm validate riêng lẻ
export const validateEmail = (email) => {
  if (!email) {
    return {
      isValid: false,
      message: "Email không được để trống",
    };
  }

  if (!REGEX.EMAIL.test(email)) {
    return {
      isValid: false,
      message: "Email không hợp lệ. Ví dụ: example@gmail.com",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return {
      isValid: false,
      message: "Số điện thoại không được để trống",
    };
  }

  if (!REGEX.PHONE.test(phoneNumber)) {
    return {
      isValid: false,
      message: "Số điện thoại không hợp lệ. Ví dụ: 0912345678",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

const handleChange = (e) => {
  const { name, value } = e.target;
  const error = validateField(name, value);

  if (error) {
    alert(error);
    return;
  }

  setUserInf({
    ...userInf,
    [name]: value,
  });
  setErrors({
    ...errors,
    [name]: "",
  });
};
