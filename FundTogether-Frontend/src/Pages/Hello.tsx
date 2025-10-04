// import { BrowserRouter as Router, Routes, Route  } from "react-router"
import { Link } from "react-router"
// import App from "../App"
export default function Hello() {
    
    return (
        <div>
            hELLO
            <Link to="/Pages/Login">toLogin</Link>
            {/* <p>My Hello</p>
            <a title='hehe' rel='noopener noreferrer' href='../'>
        <button>myhello</button></a> */}
            {/* <Router>
            <Routes>
            <Route path="" element={<App />} />
            </Routes>
            </Router>  */}
        </div>
    )
}
// export default Hello