import { useState } from "react";
import { DocumentList } from "./DocumentList";
import { Document } from "./Document";

const AUTOMERGE_URLS = [
  "automerge:2ukjjAmeKgADB2N5hAfkARYoRNF5",
  "automerge:4EpVFKCeJoncYfL3C1u7GE2EdiMX",
  "automerge:3oVqpZdnqQbYGg3xbVcefaqYex2G",
  "automerge:2XpehVhL4KFGHdF8UKDVoJAYcxAy",
  "automerge:FMkYqPxCLoRqHNzrrftyhzixVXF",
  "automerge:ZrcEwR49Te66KTxquAKSJyJQDKU",
  "automerge:3pqKkr8q8xmB8rbg7zU895ZsCsJo",
  "automerge:3uzHQ5TGNpmoJSx6VBhBLeHMCm1o",
  "automerge:2gxwEh9c4ktDoe1CUEdVGWDbZmvR",
  "automerge:3pCaEaEe2aXd9ENXEgT9qqVBQ2ET",
  "automerge:2JjNPW9fcg1GjoYUaChQCRgVpne2",
  "automerge:24fAuqMVCmGhGzG4mM6LH2Ljyzvk",
  "automerge:s8628Fr8vYniqmfCe9e5gnmQ4g7",
];

export const App = () => {
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [urls, setUrls] = useState(AUTOMERGE_URLS);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        fontFamily: "monospace",
      }}
    >
      <DocumentList
        urls={urls}
        selectedUrl={selectedUrl}
        onClick={setSelectedUrl}
        style={{
          order: 2,
          padding: "1em 2em 1em 2em",
          borderRight: "1px solid white",
        }}
      />
      <Document url={selectedUrl} />
      <button
        onClick={(e) => {
          const hasUrls = urls.length === 0;
          setUrls(hasUrls ? AUTOMERGE_URLS : []);
          if (!hasUrls) setSelectedUrl(null);
        }}
        style={{
          position: "absolute",
          bottom: "1em",
          left: "1em",
        }}
      >
        *** Toggle detected URLs ***
      </button>
    </div>
  );
};
