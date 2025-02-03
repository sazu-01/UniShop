
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { api } from '@/app/utili/axiosConfig';
import { useAppDispatch } from '@/app/lib/hook';
import Link from 'next/link';
import { ShowModalFun } from '@/app/lib/features/variableSlice';

export default function Token() {

    const { token } = useParams();

    const dispatch = useAppDispatch();

    const [status, setStatus] = useState('verifying')

    const handleCompleteRegister = async () => {
        try {
            const response = await api.post(`/users/complete-register`, {token});
            if(response.data.success) {
                setStatus('success');
            }
        } catch (error) {
           console.log(error);
           setStatus("error")
           
        }
    }

    useEffect(()=>{
        handleCompleteRegister()
    },[])
    
  return (
    <div className="container">
    <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm">
                <div className="card-body p-5">
                    {status === 'verifying' && (
                        <div className="text-center">
                            <div className="spinner-border text-primary mb-4" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <h3 className="mb-3">Verifying your email...</h3>
                            <p className="text-muted">Please wait while we confirm your email address</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="text-center">
                            <div className="mb-4">
                                <i className="bi bi-check-circle-fill text-success" style={{fontSize: "3rem"}}></i>
                            </div>
                            <h3 className="text-success mb-3">Email Verified Successfully!</h3>
                            <p className="text-muted mb-4">Your email has been verified successfully.</p>
                            <Link 
                                href="/fashion-shop/" 
                                className="btn btn-primary px-4 py-2"
                                onClick={()=>dispatch(ShowModalFun())}
                            >
                                Continue to Login
                            </Link>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="text-center">
                            <div className="mb-4">
                                <i className="bi bi-x-circle-fill text-danger" style={{fontSize: "3rem"}}></i>
                            </div>
                            <h3 className="text-danger mb-3">Verification Failed</h3>
                            <p className="text-muted mb-4">We couldn't verify your email. Please try again or contact support.</p>
                            <Link 
                                href="/register" 
                                className="btn btn-outline-primary px-4 py-2"
                            >
                                Back to Registration
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
