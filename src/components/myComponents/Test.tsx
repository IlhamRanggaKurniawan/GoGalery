"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { imageGenerate, textGeneration } from "@/lib/actions/ai";
import { Input } from "../ui/input";
import ContentMain from "./content/ContentMain";

const Test = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true)
    const response = await imageGenerate({ prompt: input });

    if (!response || !response.data[0] || !response.data[0].url) return;

    setImageUrl(response.data[0].url);
    setLoading(false)
  };

  return (
    <div>
      <Input placeholder="input ai" type="text" onChange={(e) => setInput(e.target.value)} />
      <Button onClick={() => generate()} disabled={loading}>tes</Button>

      {imageUrl && <ContentMain alt="tes" url={imageUrl} />}
    </div>
  );
};

export default Test;
