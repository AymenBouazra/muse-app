/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Fetch user data from localStorage or API on component mount
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user-data"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // Function to update user data
  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem("user-data", JSON.stringify(newUserData));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};