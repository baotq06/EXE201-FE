/* eslint-disable */
import React from 'react';
import './ForgetPassword.css';
import Header from '@/components/header/Header';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { forgetPassword } from '@/api/userAPI/user';
import { toast } from 'react-toastify';
import { forgetPasswordValidation } from '@/utils/validation.js/userValidation';

const ForgetPassword = () => {

  const initialState = {
    email: '',
    userName: '',
  };

  const handleSubmit = async (values) => {
    try {
      await forgetPassword(values);
      toast.success('Gửi lại mật khẩu thành công. Vui lòng kiểm tra email của bạn');
    } catch (error) {
      console.log(error);
      toast.error('Gửi lại mật khẩu thất bại');
    }
  }

  return (
    <div >
      <Header />
      <Formik
        initialValues={initialState}
        validationSchema={forgetPasswordValidation}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <div className="main-content">
              <div className="form-card">
                <h2 className="form-title">QUÊN MẬT KHẨU</h2>
                  <div className="form-group-fogot">
                    <label htmlFor="email" className='foget-label'>Email</label>
                    <Field type="email" id="email" name="email" className='foget-input' />
                    <ErrorMessage name="email" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
                  </div>
                  <div className="form-group-fogot">
                    <label htmlFor="userName" className='foget-label'>Tên đăng nhập</label>
                    <Field type="text" id="username" name="userName" className='foget-input' />
                    <ErrorMessage name="userName" component='div' style={{ "color": 'red', "fontSize": '12px' }} />
                  </div>
                  <button type="submit" className="submit-btn">Gửi lại mật khẩu</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;