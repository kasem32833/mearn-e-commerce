import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  userName : '',
  email: '',
  password: ''
}

const AuthRegister = () => {

  const [formData, setFormData] =  useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()
  // onsubmit function
   function onSubmit (event ){
    event.preventDefault()

    try {
      dispatch(registerUser(formData)).then((data)=>{
        console.log(data);
        if(data?.payload?.success){
          navigate('/auth/login')
          toast({
            title: data?.payload?.message
          })
        }else{
          toast({
            title: data?.payload?.message,
            variant: "destructive"
          })
        }
      })
    } catch (error) {
      console.log(error);
      toast({
        title: error?.message,
        variant: "destructive"
      })
    }
  } 


  return (
    <div className='mx-auto max-w-md w-full space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl tracking-tight font-bold text-foreground'>Create New Accoutn</h1>
        <p className='mt-2'>Already have an Account <Link className='ml-2 text-primary font-medium hover:underline' to="/auth/login">Login</Link></p>
      </div>
      <CommonForm
      formControls={registerFormControls}
      buttonText={'Sign Up'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit} 
      />
    </div>
  )
}

export default AuthRegister