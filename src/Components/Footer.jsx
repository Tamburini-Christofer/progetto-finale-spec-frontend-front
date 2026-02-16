export default function Footer() {
  return (
    <>
      <div className="contenitoreFooter">
        <div>
          <ul className="linkFooter">
            <li>
              <a href="#">Termini di utilizzo</a>
            </li>
            <li>
              <a href="#">Informativa sulla privacy</a>
            </li>
            <li>
              <a href="#">Servizio clienti</a>
            </li>
          </ul>
        </div>
        <p>
          © 1992-2026 Tamburini Christofer All Rights Reserved.
        </p>
        <div>
          <ul className="iconSocial">
            {/* Facebook */}
            <li>
              <a
                href="#"
                target="_blank"
              >
                <i className="fa-brands fa-square-facebook"></i>
              </a>
            </li>
            {/* X (Twitter) */}
            <li>
              <a href="#" target="_blank">
                <i className="fa-brands fa-square-x-twitter"></i>
              </a>
            </li>
            {/* Instagram */}
            <li>
              <a
                href="#"
                target="_blank"
              >
                <i className="fa-brands fa-square-instagram"></i>
              </a>
            </li>
            {/* YouTube */}
            <li>
              <a href="#" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            {/* Twitch */}
            <li>
              <a
                href="#"
                target="_blank"
              >
                <i className="fa-brands fa-twitch"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
