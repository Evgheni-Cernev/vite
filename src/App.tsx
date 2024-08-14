import { BrowserRouter, Routes, Route } from "react-router-dom";

import withAuth from "./hoc/withAuth";

import { SingIn, Home, Error } from "./pages";

const ProtectedHome = withAuth(Home);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedHome />} />
        <Route path="/signin" element={<SingIn />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
