"use client";

import React, { useState } from "react";

const ContentDescription = () => {
  const [isTruncate, setIsTruncate] = useState(true);
  return (
    <div>
      <p className={`mx-2 text-sm ${isTruncate ? "truncate " : ""}`}>
        Pada pagi yang cerah, sinar matahari menyinari ladang hijau di pinggir desa. Burung-burung berkicau riang, menyambut kedatangan musim semi. Di bawah pohon rindang, seorang petani dengan
        tekunnya mengolah tanah. Dia merasa bahagia karena tanaman yang ditanamnya mulai tumbuh dengan subur. Namun, di kejauhan, awan gelap mulai menggumpal, menandakan adanya badai yang akan segera
        datang. Petani itu segera bergerak cepat untuk menyimpan peralatan pertanian dan mempersiapkan diri menghadapi badai yang akan datang.
      </p>
      <button className="mx-2 text-sm text-gray-400" onClick={() => setIsTruncate(!isTruncate)}>
        {isTruncate ? "See more..." : "See less..."}
      </button>
    </div>
  );
};

export default ContentDescription;
