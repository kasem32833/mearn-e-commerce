import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  userName : '',
  email: '',
  password: ''
}

const AuthRegister = () => {

  const [formData, setFormData] =  useState(initialState);

  // onsubmit function
  function onSubmit(){

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