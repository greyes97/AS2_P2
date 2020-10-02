import React from 'react'
import './footer.css'

const Footer = (props)=>{
    return(
        <div className="main-container">
            <div className="containerFooter">
                <div className="row">
                    <div className="col">
                        <h4>Analisis de sistemas II</h4>
                        <ul className="list-unstyled">
                            <li>Mariano Galvez</li>
                            <li>Guatemala S.A.</li>
                            <li>Antigua Guatemala</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Full-Stack Developer</h4>
                        <ul className="list-unstyled">
                            <li>Edy Fernando S.P</li>
                            <li>Universidad</li>
                            <li>Mariano Galvez de Guatemala</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Contact </h4>
                        <ul className="list-unstyled">
                            <li>La Antigua Guatemala, Guatemala.</li>
                            <li>Ciudad Guatemala.</li>
                            <li>UMG</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Todos los derechos reservados | Developer EdyF | Mariano Galvez de Guatemala, Guatemala. 
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;