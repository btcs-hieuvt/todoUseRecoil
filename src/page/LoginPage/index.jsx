import React from 'react'
// import {useNavigate } from 'react-router-dom'
import firebase,{ auth } from '../../firebase/config'
import { addDocument } from '../../firebase/services';


const ggProvider =new firebase.auth.GoogleAuthProvider()
function LoginPage() {

    const handleGgLogin =async ()=>{

    const {additionalUserInfo,user} = await auth.signInWithPopup(ggProvider)
    //   console.log(data);
    if(additionalUserInfo?.isNewUser){
        addDocument('user',{
            displayName:user.displayName,
            email :user.email,
            photoURL:user.photoURL,
            uid:user.displayName,
            providerId:additionalUserInfo.providerId
        })
    }
        // const Navigate = useNavigate()
        // Navigate('/')
    }
    
    
  return (
    <div
        className='w-[100vw] h-[100vh] bg-[#f4f4f4] pt-[20px] rounded-[3px] drop-shadow-md border-[1px]'
    >
        <div 
                className='w-[500px] min-h-[300px] mx-[auto] bg-[#fff] pt-[25px] '
        >
                <h1
                    className='text-[30px] text-center font-[600]'
                >
                    Login
                </h1> 
                <div 
                        className='flex w-[80%] p-[25px] h-[50px] bg-[#f5f5f5] items-center  m-[auto] mt-[15px] border-[1px]
                                    cursor-pointer hover:opacity-[0.8]
                        '
                        onClick={handleGgLogin}
                >
                    <img 
                        src="https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo.jpg" alt=""
                        className='w-[50px] h-[30px] mr-[8px]'
                    />
                    <p 
                        className='flex-1 text-center'
                    >
                        Sign in with Google
                    </p>
                </div>
        </div>
    </div>
  )
}

export default LoginPage