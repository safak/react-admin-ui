import Home from "./pages/home/Home"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss"

function App() {

  const Layout = ()=>{
    return(
      <div className="main">
        <NavBar/>
        <div className="conteiner">
          <div className="menuConteiner">
             <Menu/>
          </div>
          <div className="contentConteiner">
            <Outlet/>
          </div>
        </div>
        <Footer/>

      </div>
    )
  } 


  const router = createBrowserRouter([
{
  path:"/",
  element:<Layout/>,
  children:[
    {
      path:"/",
      element:<Home/>
    }, 
    {
      path:"/users",
      element:<Users/>
    },
    {
      path:"/products",
      element:<Products/>
    }
    
            ]
},
    {
      path:"/login",
      element:<Login/>
    }

  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
