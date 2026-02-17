import Card from "../Components/Card"

export default function ListaFilm () {
    return (
        <>
        <div className="contenitoreLista">
            <div className="contenitoreFiltri">
                <form action="" className="formFiltri">
                    <select name="" id="">
                        <option value="">Ordine alfabetico ▼</option>
                        <option value="">A - Z</option>
                        <option value="">Z - A</option>
                    </select>  
                    <select name="" id="">
                        <option value="">Seleziona una categoria ▼</option>
                    </select>
                    <input type="text" placeholder="Cerca per titolo..."/>
                    <button className="btnReset"> Reset</button>
                </form>
            </div>
            <div className="contenitoreFilm">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
        </>
    )
}