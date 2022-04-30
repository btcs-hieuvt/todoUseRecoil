import React, { createContext, useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import {auth} from '../firebase/config'

export const AuthContext = createContext()

const SpinLoading =()=>{
    return(
        <div>
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            </svg>
            Loading...
        </div>    
    )
}
function AuthProvider({children}) {

    const [user,setUser] =useState({})
    const [isLoading ,setIsLoading] =useState(true)
    const Navigate = useNavigate ()
    
    useEffect(()=>{

        const unsub = auth.onAuthStateChanged((user)=>{
            if(user){
                const {displayName ,email ,uid ,photoURL} =user
                setUser({displayName ,email ,uid ,photoURL})
                setIsLoading(false)
                Navigate('/')
            }else{
                setIsLoading(false)
                Navigate('/login')  
            } 
            
        })
        // clean fnc
        return ()=>{
            unsub()
        }

    },[Navigate])
  return (
    <AuthContext.Provider  value={{user}}>
        {isLoading ? <SpinLoading/> :children}
    </AuthContext.Provider>
  )
}

export default  AuthProvider


