"use client";

import { Image, ImageUp, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Test = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  return (
    <div className="p-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Content</h2>
        <span className="text-secondary-foreground text-gray-500">Upload Content you want to share</span>
      </div>
      <form className="flex flex-col gap-4">
        <div className="border-dashed border-2 border-gray-300 rounded-md">
          <label htmlFor="file" className="flex flex-col items-center cursor-pointer p-6 justify-center h-72">
            <ImageUp className="w-8 h-8 text-gray-500 mb-2" />
            <span>Browse</span>
            <span className="text-sm text-gray-500">Upload File Here</span>
            <Input type="file" accept="image/png, image/jpeg, image/webp" id="file" name="file" multiple className="hidden" />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Input type="text" id="caption" name="caption" placeholder="Caption" required />

        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            Upload
          </Button>
        </div>
      </form>

      <ul className="mt-6 flex flex-col gap-1">
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file" />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"/>
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file" />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
        <li className="flex justify-between items-center">
          <div className="flex items-center">
            <Image name="file"  />
            <span>halo</span>
          </div>
          <Button variant="outline" size="sm">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Test;
