import { createContext, useEffect, useState } from 'react'
export const userContextObj = createContext();

function UserContext({ children }) {

  let [currentUser, setCurrentUser] = useState({
    username: '',
    email: "",
    profileImageUrl: '',
    role: '',
    description:'',
  })
  const [userStatus,setUserStatus]=useState(false)


  useEffect(() => {
    const userInStorage = localStorage.getItem('currentuser');
    if (userInStorage) {
      setCurrentUser(JSON.parse(userInStorage))
    }
    if(currentUser!==null){
        setUserStatus(true);
    }
  }, [])

  return (
    <userContextObj.Provider value={{ currentUser, setCurrentUser,userStatus,setUserStatus }}>
      {children}
    </userContextObj.Provider>
  )
}
export default UserContext;
