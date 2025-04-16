import React from 'react'
import { useState, useEffect } from 'react'
import { FcPhoneAndroid } from "react-icons/fc";
import { MdSearch } from "react-icons/md";

type country = {
  name: string,
  code: string
}

const App = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [countryCodes, setCountrycode] = useState<country[]>([]);
  const [number, setNumber] = useState("");


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
    setNumber(formattedValue);
  }

  useEffect(()=>{
    const fetchCountrycode = async ()=>{
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const formattedCountries: country[] = data.map((country: any) => ({
          name: country.name.common,
          code: country.idd?.root && country.idd?.suffixes?.length > 0
            ? country.idd.root + country.idd.suffixes[0]
            : '',
        })).filter((country: country) => country.code !== '');
        const sortedCountries = formattedCountries.sort((a, b)=>{
          return a.name.localeCompare(b.name);
        })
        setCountrycode(sortedCountries);
      } catch (error) {
        console.log(error)
      }
    }
    fetchCountrycode();
  }, [])

  return (
    <div className='bg-gray-300 flex items-center justify-center h-screen'>
      <div className='w-md p-6 bg-white mx-auto shadow rounded-[16px]'>
        <div className='flex flex-col items-center'>
          <h1 className='font-semibold text-2xl flex items-center'>
            <span><FcPhoneAndroid className='text-5xl ml-3' /></span>
            Number<span className='text-blue-600'>check</span></h1>
        </div>
        <div className='flex flex-col gap-y-3 items-center my-5'>
            <select name="countryCode" id="countryCode" onChange={(e)=> setSelectedCode(e.target.value)} value={selectedCode} className='w-full border border-gray-300 py-2 px-3 shadow-sm focus:outline-none overflow-y-auto rounded cursor-pointer'>
              <option value="" disabled hidden>country</option>
              {countryCodes.map((country)=>(
                <option key={country.name} value={country.code}>
                    {country.name}
                    ({country.code})
                </option>
              ))}
            </select>
            <input type="number" placeholder='Enter a valid number' className='w-full border rounded border-gray-300 py-2 px-3 shadow-sm focus:outline-none' value={number} onChange={handleInputChange} />
        </div>
        <button type='submit' className='w-full bg-blue-600 cursor-pointer text-white font-semibold rounded-[16px] mb-3 py-3 px-2'>Verify</button>
        {/* result */}
        <div className='flex flex-col items-start'>
          <h4 className='flex items-center text-xl gap-2'><MdSearch className='text-2xl' /> Search result for <span className='text-[18px] text-blue-600 '>{number}</span></h4>
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