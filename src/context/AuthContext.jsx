import React,{useState,useContext,useEffect} from "react";

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

function setLocalStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // catch possible errors:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }
  
  function getLocalStorage(key, initialValue) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState( () => getLocalStorage("user",null))
    const [lastPath, setLastPath] = useState( () => getLocalStorage("path",null))
    const [showSidebar,setShowSidebar] = useState(false)
    const [direccionIP,setDireccionIP] = useState("34.176.177.168:8080")
    const [filtrador,setFiltrador] = useState( () => getLocalStorage("filtrador",false))
    //console.log("ip:",direccionIP)
    //const [isLoggedIn, setIsLoggedIn] = useState( () => getLocalStorage("logged",false))

    useEffect( () => {
        setLocalStorage('user', authUser)
    },[authUser])

    const updateAuth = (newAuth) => {
        localStorage.setItem("credenciales",JSON.stringify(newAuth))
        setAuthUser(newAuth)
    }

    //const value = {authUser, updateAuth, isLoggedIn, setIsLoggedIn}

    return(
        <AuthContext.Provider value = {{authUser,updateAuth,showSidebar,setShowSidebar,lastPath,setLastPath,direccionIP,filtrador,setFiltrador}}>

        {props.children}

        </AuthContext.Provider>
    )
}