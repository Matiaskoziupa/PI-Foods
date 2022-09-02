import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"
export default function LandingPage() {
    return (
        <div className='fondo'>
            <div className='flex'>
                <h1 className="box">Welcome to my page</h1>
                <Link to="/home"><button className='box'>Ingresar</button></Link>
            </div>
        </div>
    )
}
