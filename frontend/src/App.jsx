import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageView from "./pages/PageView";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/view" element={<PageView />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;