import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

function MostrarBlog(){

    return (
        <div className="mostrar-blog">
            <Link to={"/Inicio"} className="blog-link">
                <p className="blog-title"><p className="texto-button">Ver blog</p></p>
            </Link>
        </div>
    );


}

export default MostrarBlog;
