import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  

  const user = useSelector((state) => state.auth.user) || "";
  const userEmail = user ? user.email : null;
  const userName = user ? user.name : null;
  const userLogged = user ? true : false;
  var userAdmin = false
  var userAuth = false
 
 // console.log(userEmail);

  if(user.role === 'student'){//admin, user
    var userAdmin = true 
  } 

  if(user.role === 'user'){//admin, user
    var userAuth = true 
  } 
 
 

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!userLogged && (
          <>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>

            <li>
                <Link to="/login">Log In</Link>
            </li>
          </>
        )}

        

        { userLogged && (

          <>

        <li>
          <div>{userEmail}</div>
           <div>{userName}</div>
        </li>

        <li>
          <Logout />
        </li>


        </>

      )}





      {/*
        <li>
          <div>Cart</div> {/*Badge Content from material ui default 4 items/}
        </li>

        <li>
          <Link to="/newhome">New Home</Link>
        </li>
        */}

      </ul>
    </div>
  );
};

export default ProfilePage;