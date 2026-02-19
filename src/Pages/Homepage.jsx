import video from "../Assets/videoHome.mp4"

export default function Homepage () {
    return (
        <>
        <div className="contenitoreHome">
            <video autoPlay loop muted>
                <source src={video} type="video/mp4"/>
            </video>
            <div className="titleHome">
                <h1>I 50 film da guardare prima di morire</h1>
            </div>
        </div>
        </>
    )
}