'use client'

import { useEffect } from "react";
import React from 'react'

interface errorProps {
    error: string | Error;
    reset: () => void;
  }
  


const Error:React.FC<errorProps>  = ( {error, reset}) => {
    useEffect(() => {   
        console.log (error);
    }, [error]);

  return (
    <div className="text-center mt-10">
      <h1>something went wrong please try again later</h1>
      <button className="hover:text-amber-600" onClick={() => reset()}> try again</button>
    </div>
  )
}

export default Error
