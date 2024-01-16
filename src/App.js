import React, { useState } from "react";
import "reactflow/dist/style.css";
import ReactFlow, { MiniMap } from "reactflow";
import Nodes from "./nodes";
import defaultEdges from "./edges.js";
const edgeOptions = {
  style: {
    stroke: "black",
  },
};

const connectionLineStyle = { stroke: "#41cbf2" };

export default function Flow() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(
        new URL(window.location.href).search
      );
      const idValue = urlParams.get("id");
      const dynamicallyLink = `http://${idValue}.bubbleapps.io/version-test`;

      try {
        // Send a GET request to the Puppeteer endpoint with the dynamic link
        const response = await fetch(
          `http://localhost:3000/scrape-data?id=${idValue}`
        );
        const data = await response.json();

        // Process the `result` from the server and create nodes for ReactFlow
        const reactFlowNodes = createNodesFromResult(data.result);
        setNodes(reactFlowNodes);
      } catch (error) {
        console.error("Error fetching data from Puppeteer:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    const msg = { action: "pasteElementSimple" };
    window.parent.postMessage({ action: msg }, "*");
    var urlParams = new URLSearchParams(new URL(window.location.href).search);
    var idValue = urlParams.get("id");
    const dynamically_link = `http://${idValue}.bubbleapps.io/version-test`;
    console.log(dynamically_link);
    console.log(idValue);

    try {
      // ReactFlow üzerinden puppeteer.js endpoint'ine GET isteği gönder
      const response = await fetch("http://localhost:3000/page", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const receivedReactFlowNodes = await response.json();
        setReactFlowNodes(receivedReactFlowNodes); // ReactFlow node'larını güncelle
      } else {
        console.error("Puppeteer'dan veri alınamadı.");
      }
    } catch (error) {
      console.error("Puppeteer'dan veri alınırken bir hata oluştu.", error);
    }
  };
  handleClick();
  return (
    <ReactFlow
      snapToGrid={true}
      nodes={nodes}
      defaultEdges={defaultEdges}
      defaultEdgeOptions={edgeOptions}
      fitView
      style={{ backgroundColor: "#F4F2FC" }}
      connectionLineStyle={connectionLineStyle}
    >
      <MiniMap zoomable pannable />
    </ReactFlow>
  );
}
function createNodesFromResult(result) {
  // Implement logic to transform the `result` data into an array of ReactFlow nodes
  // Example:
  const nodes = [];
  for (const item of result) {
    nodes.push({
      id: item.id,
      type: item.type,
      data: item.data,
    });
  }
  return nodes;
}
