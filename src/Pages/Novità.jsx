import novità from "../Utils/novità";

export default function Novità() {

  return (
    <>
      <div className="contenitoreNovità">
        <div className="contTabNovità">
          {novità.map((item) => (
            <a href={item.linkRiferimento} key={item.id}>
              <div key={item.id} className="tabNovità">
                <div>
                  <img
                    className="imgNovità"
                    src={item.immagine}
                    alt={item.titolo}
                  />
                </div>
                <div className="descNovità">
                  <h1>{item.titolo}</h1>
                  <p>{item.descrizione}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
