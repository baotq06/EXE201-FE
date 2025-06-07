/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ConfirmOTP.css';
import emailIcon from '@/assets/images/image5.png';
import Header from '@/components/header/Header';
import { resendOTP, verifyOTP } from '@/api/userAPI/user';
import { toast } from 'react-toastify';
const ConfirmOTP = () => {

    const [otp, setOtp] = useState();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const userId = localStorage.getItem('userId');
        const data = {
            userId,
            otp: Number(otp),
        };
        try {
            console.log("data", data);
            await verifyOTP(data);
            toast.success('Xác thực OTP thành công');
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error('Xác thực OTP thất bại');
        }
    };

    const handleResendOTP = async () => {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        const fullName = localStorage.getItem('fullName');
        const data = {
            userId,
            email,
            fullName,
        };
        try {
            await resendOTP(data);
            toast.success('Gửi lại OTP thành công');
        } catch (error) {
            console.log(error);
            toast.error('Gửi lại OTP thất bại');
        };
    };
    return (
        <>
            <Header />
            <div className='confirmOTP-body'>
                <div className="container">
                    <div className="otp-content">
                        <img src={emailIcon} alt="Email Icon" className="email-icon" />
                        <p className="text">Mã OTP gồm 6 chữ số đã được gửi đến bạn qua email {localStorage.getItem("email")} </p>
                        <input type="text" placeholder="######" className="otp-input" maxLength={6} value={otp} name='otp' onChange={(e) => setOtp(e.target.value)}/> <br />
                        <p className="resent-OTP" href="" onClick={handleResendOTP}>Gửi lại OTP</p>
                        <button className="submit-button" onClick={handleSubmit} type='submit'>Tiếp</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOTP;