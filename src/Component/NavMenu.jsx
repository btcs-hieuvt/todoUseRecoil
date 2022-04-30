import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/config'

import { AuthContext } from '../Context/AuthProvider'

function NavMenu() {

    const handleSignOut = () => {
        console.log('dang xuat');
        auth.signOut()
        setStatusLogin(false)
    }

    // useEffect(()=>{
    //         db.collection('user').onSnapshot((snapshot)=>{
    //             const data =snapshot.docs.map(doc => ({
    //                 ...doc.data(),
    //                 id:doc.id
    //             }))
    //         })
    // },[])
    const [statusLogin, setStatusLogin] = useState(false)
    const { user: {
        displayName, photoURL,
    }  } = useContext(AuthContext)
    // const idDocUser = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  
    useEffect(() => {
        if (displayName) {
            setStatusLogin(true)
            
        }

    }, [displayName])
  
    return (
        <div
            className='w-[100vw] h-[60px] flex items-center justify-between bg-gradient-to-b from-[#fdfdff] to-[#f4f5f9] px-[40px] border-[1px]'
        >
            <div >
                <img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple111/v4/6e/fd/cb/6efdcbca-633e-e2f7-3b87-e76b859b7e1c/source/512x512bb.jpg" alt=""
                    className='w-[40px] h-[40px]'
                />
            </div>
            <nav
                className='min-w-[200px] flex justify-around items-center'
            >
                <Link to="/">Todos</Link>

                {statusLogin ?
                    (<div
                        id='hasUser'
                        className='flex items-center'
                    >
                        <div
                            className=' cursor-pointer'
                            onClick={handleSignOut}
                        > Logout</div>
                        <div>
                            <img
                                className='mx-[6px] w-[30px] h-[30px]  rounded-[100%]'
                                src={photoURL} alt=''/>
                        </div>
                    </div>)
                    :
                   (<Link to="/login" id='login'>login</Link>)
                    }


            </nav>

        </div>
    )
}

export default NavMenu