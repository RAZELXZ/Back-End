import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./Header";
import AuthBox from "./AuthBox";
import { useGlobalContext } from "../context/GlobalContext";
import Dashboard from "./Dashboard";
const Layout = () => {
    const {fetchingUser} = useGlobalContext();

    return fetchingUser ? (
        <div className="loading">
            <h1>Loading</h1>
        </div>
    ) : (
        <Router>
            <Header />
            
            <Routes>
                <Route exact path= "/" element={<AuthBox />}/>
                <Route path= "/register" element={<AuthBox register={true}/>}/>
                <Route path= "/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    )
}

export default Layout;