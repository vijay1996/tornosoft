import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import Header from "./Header"
import { flex } from "../mainStyle"

const flexLocal:{[k:string]: object} = flex 

const PreLogin = () => {
    const [display, setDisplay] = useState('login')
    return (
        <div className="App" style={{...flexLocal.centeredFlex, height: "80vh"}} >
            <div>
                <Header />
            </div>
            <br />
            <div>
                { display === 'login' ? <Login setDisplay={setDisplay} /> : <Signup setDisplay={setDisplay} /> }
            </div>
        </div>
    )
}

export default PreLogin