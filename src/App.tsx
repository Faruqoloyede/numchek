import React from 'react'
import { useState, useEffect } from 'react'
import { FcPhoneAndroid } from "react-icons/fc";
import { MdSearch } from "react-icons/md";

const countryCodes = [
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+234', name: 'Nigeria' },
  { code: '+81', name: 'Japan' },
  { code: '+81', name: 'Japan' },
];

const App = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [number, setNumber] = useState("");


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
    setNumber(formattedValue);
  }

  return (
    <div className='bg-gray-300 flex items-center justify-center h-screen'>
      <div className='w-md p-6 bg-white mx-auto shadow rounded-[16px]'>
        <div className='flex flex-col items-center'>
          <h1 className='font-semibold text-2xl flex items-center'>
            <span><FcPhoneAndroid className='text-5xl ml-3' /></span>
            Number<span className='text-blue-600'>check</span></h1>
        </div>
        <div className='flex items-center justify-between my-5'>
          <div className='flex flex-col items-start'>
            <label htmlFor="countryCode" className='text-[18px] font-medium text-gray-700 mb-2'  >Country code*</label>
            <select name="countryCode" id="countryCode" onChange={(e)=> setSelectedCode(e.target.value)} value={selectedCode} className='w-full border border-gray-300 py-2 px-3 shadow-sm focus:outline-none overflow-y-auto rounded'>
              <option value="" disabled hidden>country</option>
              {countryCodes.map((country)=>(
                <option key={country.code} value={country.code}>
                  <div className='flex items-center text-sm gap-3'>
                    <span>{country.name}</span>
                    <span>{country.code}</span>
                  </div>
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col items-start'>
              <label htmlFor="tel" className='text-[18px] font-medium text-gray-700 mb-2'>Phone number</label>
              <input type="number" placeholder='Enter a valid number' className='w-full border rounded border-gray-300 py-2 px-3 shadow-sm focus:outline-none' value={number} onChange={handleInputChange} />
          </div>
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white font-semibold rounded-[16px] mb-3 py-3 px-2'>Verify</button>
        {/* result */}
        <div className='flex flex-col items-start'>
          <h4 className='flex items-center text-xl gap-2'><MdSearch className='text-2xl' /> Search result for <span className='text-[18px] text-blue-600'>{number}</span></h4>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2 mt-3'>
              <h3 className='font-semibold text-gray-700'>Valid: </h3>
              <span className='font-bold'>yes</span>
            </div>
            <div className='flex items-center gap-2 mt-3'>
              <h3 className='font-semibold text-gray-700'>Carrier: </h3>
              <span className='font-bold'>MTN Nigeria</span>
            </div>
            <div className='flex items-center gap-2 mt-3'>
              <h3 className='font-semibold text-gray-700'>Country code: </h3>
              <span className='font-bold'>+234</span>
            </div>
            <div className='flex items-center gap-2 mt-3'>
              <h3 className='font-semibold text-gray-700'>Line-type: </h3>
              <span className='font-bold'>mboile</span>
            </div>
            <div className='flex items-center gap-2 mt-3'>
              <h3 className='font-semibold text-gray-700'>Country: </h3>
              <span className='font-bold'>Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App