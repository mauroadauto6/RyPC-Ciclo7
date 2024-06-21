import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer text-center text-lg-start mt-5">
        <div className="container p-4">
            <div className="row">
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase">¿Quiénes Somos?</h5>
                    <p>
                        Somos la primera botica peruana especializada en ofrecer productos naturales de belleza y salud procedentes de diversas regiones del Perú. Nuestros métodos combinan alternativas naturales a los productos tradicionales convencionales ofrecidos por las farmacias tradicionales.
                    </p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Contacto</h5>
                    <ul className="list-unstyled mb-0">
                        <li>
                            <a href="#!" className="text-white">contacto@tikafarma.com
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">+51 123 456 789</a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">Lima, Perú</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Servicio al Cliente</h5>
                    <ul className="list-unstyled mb-0">
                        <li>
                            <a href="#!" className="text-white">Preguntas Frecuentes</a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">Política de Devoluciones</a>
                        </li>
                        <li>
                            <a href="#!" className="text-white">Terminos y Condiciones</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
