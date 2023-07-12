import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashbored from "./Pages/Dashbored";
import Lead from "./Pages/Lead";
import List from "./Pages/List";
import Export from "./Pages/Export";
import BulkMaster from "./Pages/BulkMaster";

const AppRoutes = () => {
  return (
    <div className="AppRoutes">
        <Routes>
          <Route path="/" element={<Dashbored />}></Route>
          <Route path="/leads" element={<Lead />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/export" element={<Export />}></Route>
          <Route path="/bulk" element={<BulkMaster />}></Route>
        </Routes>
      
    </div>
  );
};

export default AppRoutes;
