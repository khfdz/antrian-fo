import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageView from "./pages/PageView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/view" element={<PageView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;