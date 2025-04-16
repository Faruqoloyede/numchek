import React from 'react'
import { useState, useEffect } from 'react'
import { FcPhoneAndroid } from "react-icons/fc";
import { MdSearch } from "react-icons/md";

type country = {
  name: string,
  code: string
}

type NumberInfo = {
  carrier: string,
  country_code: string,
  country_name: string,
  line_type: string,
  valid: boolean,

}

const App = () => {
  const [selectedCode, setSelectedCode] = useState("");
  const [countryCodes, setCountrycode] = useState<country[]>([]);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false)
  const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_ACCESS_KEY = import.meta.env.VITE_API_KEY;



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
    setNumber(formattedValue);

    if(formattedValue === ""){
      setNumberInfo(null);
    }
  }

  useEffect(()=>{
    const fetchCountrycode = async ()=>{
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const formattedCountries: country[] = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
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

  const verifyNumber = async ()=>{
    if (!selectedCode || number.trim() === "") {
      setError("Please select a country and enter a phone number.");
      setTimeout(()=>{
        setError("");
      }, 2000)
      return;
    }
    setLoading(true)
    try {
      const res = await fetch(`https://apilayer.net/api/validate?access_key=${API_ACCESS_KEY}&number=${number}&country_code=${selectedCode}&format=1`);
      if(!res.ok) throw new Error("failed to verify number");
      const data = await res.json();
      setNumberInfo(data);
    } catch (err) {
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-300 flex items-center justify-center h-screen'>
      <div className='w-md p-6 bg-white mx-auto shadow rounded-[16px]'>
       
        <div className='flex flex-col items-center'>
          <h1 className='font-semibold text-2xl flex items-center'>
            <span><FcPhoneAndroid className='text-5xl ml-3' /></span>
            Number<span className='text-blue-600'>checker</span></h1>
        </div>
        {error && <p className='text-red-500 text-center'>{error}</p>}
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
        <button type='submit'onClick={verifyNumber} className='w-full bg-blue-600 cursor-pointer text-white font-semibold rounded-[16px] mb-3 py-3 px-2'>Verify</button>
        {/* result */}
          
        <div className='flex flex-col items-start'>
        {loading && <p className='text-gray-500 text-center text-xl'>verifying...</p>}
          {numberInfo &&(
            
             <div className='flex flex-col gap-1'>
              <h4 className='flex items-center text-xl gap-2'><MdSearch className='text-2xl' /> search result for {number}</h4>
             <div className='flex items-center gap-2 mt-3'>
               <h3 className='font-semibold text-gray-700'>Carrier: </h3>
               <span className='font-bold'>{numberInfo.carrier}</span>
             </div>
             <div className='flex items-center gap-2 mt-3'>
               <h3 className='font-semibold text-gray-700'>country_code: </h3>
               <span className='font-bold'>{numberInfo.country_code}</span>
             </div>
             <div className='flex items-center gap-2 mt-3'>
               <h3 className='font-semibold text-gray-700'>country_name </h3>
               <span className='font-bold'>{numberInfo.country_name}</span>
             </div>
             <div className='flex items-center gap-2 mt-3'>
               <h3 className='font-semibold text-gray-700'>line_type</h3>
               <span className='font-bold'>{numberInfo.line_type}</span>
             </div>
             <div className='flex items-center gap-2 mt-3'>
               <h3 className='font-semibold text-gray-700'>valid: </h3>
               <span className='font-bold'>{numberInfo.valid ? 'Yes': 'No'}</span>
             </div>
           </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App