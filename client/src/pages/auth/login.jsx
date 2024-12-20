import CommonForm from '@/components/common/form';
import { loginFormControls, } from '@/config';
import { toast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate,  } from 'react-router-dom'


const initialState = {
  email: '',
  password: ''
}

const AuthLogin = () => {

  const [formData, setFormData] =  useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // onsubmit function
  function onSubmit(event){
    event.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message
        })
      }else{
        toast({
          title: data?.payload?.message,
          variant: "destructive"
        })
      }
    
      if(data?.payload?.success){
        navigate("/shop/home")
      }
      })
  }


  return (
    <div className='mx-auto max-w-md w-full space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl tracking-tight font-bold text-foreground'>Login Your Account</h1>
        <p className='mt-2'>Do not have an Account please go to <Link className='ml-2 text-primary font-medium hover:underline' to="/auth/register">Register</Link></p>
      </div>
      <CommonForm
      formControls={loginFormControls}
      buttonText={'Log in'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit} 
      />
    </div>
  )
}

export default AuthLogin