import React from 'react'
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton
} from 'react-share'

function Share() {
    const shareURL ='https://todo-use-recoil.vercel.app'
  return (
    <div
        className='w-[100%] mt-[25px]'
    >
        <h3
            className='mb-[10px]'
        >Chia sẻ</h3>
        <FacebookShareButton url={shareURL} >
            <FacebookIcon 
                className='rounded-full'
                size={38}
            />
        </FacebookShareButton>

        {/* <FacebookMessengerShareButton url={shareURL} appId={''}>
            <FacebookMessengerIcon
                className='rounded-full'
                size={38}
            />
        </FacebookMessengerShareButton> */}
    
    </div>
  )
}

export default Share