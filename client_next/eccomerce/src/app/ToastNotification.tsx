'use client'
// Hey, I am toast component 
import React from 'react'

 interface ToastProps {
    message: string;
    transitionPercentage: number;
    color: string;
    duration: number;

 }
 
const Toast:React.FC<ToastProps> = ( props: ToastProps  ): JSX.Element => {
    return ( 
        <>
        

        </>
    )
  }
            export default Toast