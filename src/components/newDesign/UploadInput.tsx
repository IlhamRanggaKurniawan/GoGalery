"use client";

import { Image as ImageIcon, ImageUp } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/hooks/useSession";
import apiClient from "@/lib/apiClient";

const UploadInput = () => {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return setError("please fill all the fields");
    }

    const selectedFile = e.target.files[0];
    const maxSize = 15 * 1024 * 1024;

    if (selectedFile && selectedFile.size > maxSize) {
      setError("File size exceeds the 15MB limit.");
      setFileName("");
      setFile(null);
      return;
    }

    setFileName(selectedFile.name);
    setFile(selectedFile);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!user) return;

      if (!file) {
        return setError("Please select a valid file.");
      }

      const formData = new FormData();

      formData.append("file", file);
      formData.append("uploaderId", `${user.id}`)
      formData.append("caption", e.currentTarget.caption.value);
      // await uploadContent(formData);

      setLoading(true);
      setError("");

      const content = await apiClient.post("/content/upload", {
        body: formData,
        cache: "no-cache"
      })

      if (content) {
        router.push(`/profile/${user.username}`);
      }
    } catch (error) {
      console.error(error)
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold mb-2">Upload Content</h2>
        <span className="text-secondary-foreground text-gray-500">Upload Content you want to share</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="border-dashed border-2 border-gray-300 rounded-md h-64 mb-4">
          <label htmlFor="file" className="flex flex-col items-center cursor-pointer p-6 justify-center w-full h-full">
            <ImageUp className="text-gray-500 mb-2" size={50} />
            <span>Browse</span>
            <span className="text-sm text-gray-500">Upload File Here</span>
            <Input type="file" id="file" name="file" className="hidden" required onChange={handleChange} />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="caption">Caption Here</label>
          <Input type="text" id="caption" name="caption" required />
        </div>

        {fileName && (
          <div className="flex items-center mt-2 justify-between">
            <div className="flex gap-2 w-full">
              <ImageIcon name="file" size={30} />
              <div className="flex gap-2 max-w-[90%] items-center">
                <p className="truncate">{fileName}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button className="w-[50%] border border-primary max-w-72" type="reset" variant={"ghost"} onClick={() => setFileName("")}>
            Cancel
          </Button>
          <Button className="w-[50%] max-w-72" type="submit" onClick={() => setError("")} disabled={loading}>
            Upload Image
          </Button>
        </div>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
      </form>
    </div>
  );
};

export default UploadInput;
