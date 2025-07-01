/* eslint-disable */
import React, { useEffect, useState } from "react";

import "./Information.css";
import Header from "@/components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import { editProfile, getUserById, uploadAvatar } from "@/api/userAPI/user";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import {
  validateEmail,
  validatePhoneNumber,
} from "@/utils/validation/validation";

const Information = () => {
  const [userInf, setUserInf] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    staffCode: "",
    role: "",
    address: "",
    gender: "",
    startDate: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
  });

  const [isRefresh, setIsRefresh] = useState(false);

  const [avatar, setAvatar] = useState("");

  const { userId } = useParams();

  const dispath = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const respone = await getUserById(userId);
      const dateObj = new Date(respone.startDate);
      const day = dateObj.getUTCDate();
      const month = dateObj.getUTCMonth() + 1;
      const year = dateObj.getUTCFullYear();

      respone.startDate = `${day}/${month}/${year}`;
      setUserInf({
        fullName: respone.fullName,
        userName: respone.userName,
        email: respone.email,
        phoneNumber: respone.phoneNumber,
        staffCode: respone.staffCode,
        role: respone.role,
        address: respone.address,
        gender: respone.gender,
        startDate: respone.startDate,
        avatar: respone.avatar,
      });

      setAvatar(respone.avatar);

      dispath(setUser(respone));
    };

    getUser();
  }, [isRefresh]);

  // Validate từng trường
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) error = "Vui lòng nhập họ và tên";
        else if (value.length < 2) error = "Họ và tên phải có ít nhất 2 ký tự";
        else if (value.length > 50)
          error = "Họ và tên không được vượt quá 50 ký tự";
        break;
      case "email":
        const emailCheck = validateEmail(value);
        if (!emailCheck.isValid) error = emailCheck.message;
        break;
      case "phoneNumber":
        const phoneCheck = validatePhoneNumber(value);
        if (!phoneCheck.isValid) error = phoneCheck.message;
        break;
      case "address":
        if (!value) error = "Vui lòng nhập địa chỉ";
        else if (value.length < 5) error = "Địa chỉ phải có ít nhất 5 ký tự";
        else if (value.length > 200)
          error = "Địa chỉ không được vượt quá 200 ký tự";
        break;
      case "gender":
        if (!value) error = "Vui lòng chọn giới tính";
        else if (!["male", "fermale", "other"].includes(value))
          error = "Giới tính không hợp lệ";
        break;
      default:
        break;
    }
    return error;
  };

  // Validate realtime khi nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInf({
      ...userInf,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  // Validate toàn bộ form khi submit
  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", userInf.fullName),
      email: validateField("email", userInf.email),
      phoneNumber: validateField("phoneNumber", userInf.phoneNumber),
      address: validateField("address", userInf.address),
      gender: validateField("gender", userInf.gender),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== "");
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }
    await editProfile(userInf, userId);
    toast.success("Cập nhật thông tin thành công");
    setIsRefresh(!isRefresh);
    navigate("/");
  };

  const handleCancel = () => {
    setIsRefresh(!isRefresh);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);

    await uploadAvatar(file, userId);
    toast.success("Cập nhật ảnh đại diện thành công");
    setIsRefresh(!isRefresh);
  };

  return (
    <div>
      <Header className="info-header" />
      <NavBar className="info-navBar" />
      <div className="infoBody">
        <div className="infoAvatar">
          <img className="infoImage" src={avatar} alt="" />
          <label
            style={{
              marginLeft: "80%",
              marginTop: "-30px",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <i
              className="fa-solid fa-pen"
              style={{
                color: "black",
                cursor: "pointer",
              }}
            ></i>
          </label>
          <p className="infoUsername">
            <b>{userInf.userName}</b>
          </p>
        </div>
        <div className="infoContainer">
          <div className="inforForm">
            <h2 className="info-h2">THÔNG TIN CÁ NHÂN</h2>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoFullName">
                Họ và tên
              </label>
              <input
                className={`info-input ${errors.fullName ? "error" : ""}`}
                value={userInf.fullName}
                name="fullName"
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="error-message">{errors.fullName}</div>
              )}
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoEmail">
                Email
              </label>
              <input
                className={`info-input ${errors.email ? "error" : ""}`}
                value={userInf.email}
                name="email"
                onChange={handleChange}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoPhone">
                Số điện thoại
              </label>
              <input
                className={`info-input ${errors.phoneNumber ? "error" : ""}`}
                value={userInf.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <div className="error-message">{errors.phoneNumber}</div>
              )}
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoStaffCode">
                Mã nhân viên
              </label>
              <input
                className="info-input"
                value={userInf.staffCode}
                readOnly
              />
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoPosition">
                Chức vụ
              </label>
              <input
                className="info-input"
                value={userInf.role == "manager" ? "Quản lý" : "Nhân viên"}
                readOnly
              />
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoAddress">
                Địa chỉ
              </label>
              <input
                className={`info-input ${errors.address ? "error" : ""}`}
                value={userInf.address}
                name="address"
                onChange={handleChange}
              />
              {errors.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoGender">
                Giới tính
              </label>
              <select
                name="gender"
                value={userInf.gender}
                onChange={handleChange}
                className={`info-input ${errors.gender ? "error" : ""}`}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #dedbdb",
                  padding: "0 20px",
                }}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="fermale">Nữ</option>
                <option value="other">Khác</option>
              </select>
              {errors.gender && (
                <div className="error-message">{errors.gender}</div>
              )}
            </div>
            <div className="info-group-field">
              <label className="info-label" htmlFor="infoDate">
                Ngày vào làm
              </label>
              <input
                className="info-input"
                value={userInf.startDate}
                readOnly
              />
            </div>

            <div className="button-section">
              <button className="cancel-button" onClick={handleCancel}>
                Hủy
              </button>
              <button
                className="save-button"
                type="submit"
                onClick={handleUpdate}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
