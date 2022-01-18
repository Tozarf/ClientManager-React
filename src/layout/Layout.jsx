import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div>
            <h1>From layout</h1>
            <Outlet />
        </div>
    );
};
