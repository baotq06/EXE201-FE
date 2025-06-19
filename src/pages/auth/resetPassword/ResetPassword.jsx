/* eslint-disable */
import React, { useState } from "react";

import "./ResetPassword.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Header from "@/components/header/Header";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { resetPasswordValidation } from "@/utils/validation/userValidation";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    userName: "",
    newPassword: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await updatePassword(values);
      toast.success("Đổi mật khẩu thành công");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Đổi mật khẩu thất bại");
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />

      <div className="resetPasswordBody">
        <div className="ResetPasswordcontent">
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordValidation}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <h1 className="reset-name">Đổi Mật Khẩu</h1>
                <div className="reset-form-group">
                  <label htmlFor="email" className="reset-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="reset-input"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="reset-form-group">
                  <label htmlFor="userName" className="reset-label">
                    Tên Đăng Nhập
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="userName"
                    className="reset-input"
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="reset-form-group reset-password">
                  <label htmlFor="newPassword" className="reset-label">
                    Mật Khẩu Mới
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    className="reset-input"
                  />
                  <i
                    className={`reset-eye-icon ${
                      showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                    }`}
                    onClick={tooglePasswordVisibility}
                  ></i>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="error"
                  />
                </div>
                <button type="submit" className="reset-btn">
                  Đổi Mật Khẩu
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
