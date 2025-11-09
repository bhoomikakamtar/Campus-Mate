import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BulkDocumentUpload({ onUpload }) {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    onUpload(files);
  };

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h2 className="font-bold text-lg">📂 Bulk Document Upload</h2>
      <input type="file" multiple onChange={handleChange} />
      <Button onClick={handleUpload} className="mt-2 bg-green-600 text-white">Upload</Button>
    </div>
  );
}
