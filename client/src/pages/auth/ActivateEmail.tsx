
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



const ActivateEmail = () => {
  const [loading , setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { token } = useParams();

  useEffect(()=>{

    const completeRegistraion = async () => {
       try {
         const res = await axios.post("http://localhost:4000/api/users/complete-register",{token});
         setMessage(res.data.message)
       } catch (error:any) {
        setMessage(error.response?.data?.message || error.message);
       }finally{
        setLoading(false);
       }
    }

    if(token){
      completeRegistraion();
    }else{
      setMessage('invalid activation link');
      setLoading(false);
    }

  },[token])

  return (
    <>
    <div id="activate-email-page">
    {loading ? <h2>Loading....</h2> : <h2>{message}</h2>}
    </div>
    </>
  )
}

export default ActivateEmail;