import React, { createContext, useContext, useState } from 'react'

const userInfoContext = createContext();

const UserInfoProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState({})

  return (
    <userInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userInfoContext.Provider>
  )
}

const useUserInfo = () => useContext(userInfoContext);

export { UserInfoProvider, useUserInfo }

