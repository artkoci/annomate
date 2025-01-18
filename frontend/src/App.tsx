import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Landing } from "@/pages/Landing";
import Annotate from "@/pages/Annotate";
import Download from "@/pages/Download";
import { ImageProvider } from "@/context/ImageContext";

function App() {
  return (
    <ImageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/annotate" element={<Annotate />} />
          <Route path="/download" element={<Download />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </ImageProvider>
  );
}

export default App;
