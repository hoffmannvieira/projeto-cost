import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Rodape from './layout/Footer/Rodape'
import Navbar from "./layout/Navbar/Navbar";
import Container from "./layout/Container/Container";
import Contact from "./components/Contact/Contact";
import Company from "./components/Company.js/Company";
import NewProject from "./components/NewProject/NewProject";
import Projects from "./components/Projects/Projects";
import Project from "./components/Project/Project";

const App = () => {''
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route element={<Container customClass='min-height' />}>
                    <Route index element={<Home/>} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/newproject" element={<NewProject />} />
                    <Route path="/projects/:id" element={<Project />} />
                </Route>
            </Routes>
            <Rodape />
        </Router>
    )


}

export default App;