import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import VentanaModal from "../general/VentanaModal";
import Pagination from "react-bootstrap/Pagination";
import { useAuth } from "../../context/AuthContext"


const InstanciaModulo = () => {
  const {authUser,updateAuth,lastPath,setLastPath,direccionIP} = useAuth()
  return (
    <div>
      
    </div>
  )
}

export default InstanciaModulo
