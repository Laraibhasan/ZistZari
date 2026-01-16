import React, { useState } from 'react'
import { toast } from 'react-toastify'; // Import toast

const NewsletterBox = () => {

    const [email, setEmail] = useState(''); // State to track the email input

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        // 1. Logic to handle the subscription (e.g., API call) would go here
        
        // 2. Trigger the toast notification
        toast.success("Thank you for subscribing!");

        // 3. Clear the input (the email vanishes)
        setEmail('');
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe to our emails!</p>
      <p className='text-gray-400 mt-3'>Be the first to know about new collections and exclusive offers.</p>
     
     <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input 
            className="w-full sm:flex-1 outline-none" 
            type='email' 
            placeholder='Enter your email' 
            required
            value={email} // Controlled component
            onChange={(e) => setEmail(e.target.value)} // Update state on type
        />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
     </form>
    </div>
  )
}

export default NewsletterBox