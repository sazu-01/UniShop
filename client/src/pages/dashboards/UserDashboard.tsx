

import { useAppSelector , useAppDispatch } from "../../app/hook";
import { logout } from "../../features/authSlice";

const UserDashboard = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state)=>state.auth);


    //
    const handleLogout = () => {
        dispatch(logout());
        
    }

  return (
    <>
     <div className="text-center mt-5">
        <img src={user?.image} alt="" />
        <p>name : {user?.name}</p>
        <p>email : {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
     </div>
    </>
  )
}

export default UserDashboard