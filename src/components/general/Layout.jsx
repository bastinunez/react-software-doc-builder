import { Navigate, Outlet , useLocation,Route,Routes} from "react-router-dom"
import { NavBarExport } from "./Navbar"
import Footer from "./Footer"
import { useAuth } from "../../context/AuthContext"
import { useEffect} from "react"



const Layout = ({children}) => {

    const {authUser,updateAuth,lastPath,setLastPath} = useAuth()
    const location = useLocation();
    const currentPathname = location.pathname;

    useEffect(() => {
        setLastPath(currentPathname)
    },[])

    useEffect(() => {
        //console.log("Layout path:",lastPath)
    },[lastPath])

    //console.log("Pasa por layout")
    return (
        <main className="App">
            <Outlet />
            {/* <Footer /> */}
        </main>
    )
}

export default Layout
