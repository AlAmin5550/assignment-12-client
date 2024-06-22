import { Outlet } from "react-router-dom"
import Navbar from "./Components/Shared/Navbar"
import Footer from "./Components/Shared/Footer"



function App() {

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
