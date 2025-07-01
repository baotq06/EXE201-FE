/* eslint-disable */
import React, { useState } from "react";

// import image4 from '../../../assets/images/image4.png'
import "./Login.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import hinhnen from "../../../assets/images/hinhnen.jpg";
import Header from "@/components/header/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { setUser } from "@/store/userSlice";
import { loginValidation } from "@/utils/validation/userValidation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const user = await login(values);
      toast.success("Đăng nhập thành công");
      dispath(setUser(user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    }
  };

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickForgetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <Header />
      <div className="login-body">
        <div className="login-contain">
          <div className="login-left">
            <img src={hinhnen} alt="" className="login-image" />
          </div>
          <div className="login-right">
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidation}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="login-h1">Đăng nhập vào tài khoản</div>

                  <div className="login-group">
                    <label htmlFor="userName" className="login-label">
                      Tên đăng nhập:{" "}
                    </label>
                    <Field
                      name="userName"
                      className="login-input"
                      type="text"
                    />
                    <ErrorMessage
                      name="userName"
                      style={{ color: "red", fontSize: "12px" }}
                      component="div"
                    />
                  </div>

                  <div className="login-group login-eye">
                    <label htmlFor="password" className="login-label">
                      Mật khẩu:{" "}
                    </label>
                    <Field
                      name="password"
                      className="login-input"
                      type={showPassword ? "text" : "password"}
                    />
                    <i
                      className={`login-eye-icon ${
                        showPassword ? "fa fa-eye" : "fa fa-eye-slash"
                      }`}
                      onClick={tooglePasswordVisibility}
                    ></i>
                    <ErrorMessage
                      name="password"
                      style={{ color: "red", fontSize: "12px" }}
                      component="div"
                    />
                  </div>

                  <div className="login-s3">
                    <div className="rememberPW">
                      <input
                        type="checkbox"
                        name="recomendPassword"
                        id="login-radio"
                      />
                      <label htmlFor="recomendPassword" className="login-label">
                        Ghi nhớ tôi
                      </label>
                    </div>

                    <div className="forgetPW">
                      <p
                        href="#"
                        className="foget-text"
                        onClick={handleClickForgetPassword}
                      >
                        Quên mật khẩu?
                      </p>
                    </div>
                  </div>

                  <div className="login-btn">
                    <button type="submit" id="loginBTN">
                      Đăng nhập
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
