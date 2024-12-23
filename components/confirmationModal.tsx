import React, { useState } from 'react'

//TODO: změnit datový typ interface? 
interface confirmationModalProps {
  onClose: () => void
  message: string
}

const confirmModal = ({onClose, message} : confirmationModalProps) => {  
  return (
      <div className='fixed inset-0 text-white font-title font-bold text-2xl bg-[#0f0f0f] bg-opacity-50 
        flex items-center justify-center rounded-2xl w-full h-full z-50'>
          <div className='bg-[#141414] w-1/3 h-1/4 rounded-2xl border-2 border-[#3a3aa3] flex flex-col items-center'
                data-aos="fade-down">
          <div className="text-2xl mb-4 pt-10">{message}</div>
          <button
              onClick={onClose}
              className="confirmationCloseButton">                
              Close
          </button>
          </div>
          </div>
    )
}

export default confirmModal