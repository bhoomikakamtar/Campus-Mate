import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function StudentImport({ onImport }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) return;
    onImport(file);
  };

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h2 className="font-bold text-lg">👨‍🎓 Student Import</h2>
      <input type="file" accept=".csv,.xlsx" onChange={handleChange} />
      <Button onClick={handleImport} className="mt-2 bg-blue-600 text-white">Import</Button>
    </div>
  );
}
