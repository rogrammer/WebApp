import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Form";
import NavBar from "./Components/NavBar";
import DropboxReports from "./DropboxReports";
import HomePage from "./Home";
import AddUser from "./AddUser";
function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<Form />} />
          <Route path="/view" element={<DropboxReports />} />
          <Route path="/user" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
