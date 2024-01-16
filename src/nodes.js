import React from "react";
import { IonIcon } from "@ionic/react";

import {
  textOutline,
  checkmarkCircleOutline,
  imageOutline,
  calendarNumberOutline,
  calendarOutline,
  folderOutline,
  personOutline,
  linkOutline,
} from "ionicons/icons"; // Ionic Icons
import data from "./data.json";
const groupedData = {};

function getIconByType(type) {
  switch (type) {
    case "text":
      return textOutline;
    case "boolean":
      return checkmarkCircleOutline;
    case "image":
      return imageOutline;
    case "number":
      return calendarNumberOutline;
    case "date":
      return calendarOutline;
    case "file":
      return folderOutline;
    case "user":
      return personOutline;
    default:
      return textOutline; // Varsayılan olarak text ikonunu göster
  }
}
// JSON verisini gruplama
Object.keys(data).forEach((key) => {
  data[key].forEach((item) => {
    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });
});

const nodes = [];
const elementsPerRow = 8; // Her satırda kaç element olacak
let currentRow = 0; // Mevcut satır numarası

let renderedKeys = []; // Render edilen anahtarları tutmak için bir dizi oluşturuldu

Object.keys(groupedData).forEach((key, index) => {
  // Sadece "deleted" özelliği null olan objeleri al
  const filteredItems = groupedData[key].filter(
    (item) => item.deleted === null
  );

  if (filteredItems.length > 0) {
    const rowIndex = Math.floor(index / elementsPerRow);
    const colIndex = index % elementsPerRow;
    const xPos = colIndex * 300; // X pozisyonunu her bir element için farklı bir değer olarak ayarlayın
    const yPos = 25 + rowIndex * 600; // Y pozisyonunu her 5 elementte bir artırarak sıralamayı düzenleyin

    nodes.push({
      id: `div-${key}`, // ID'yi başlığa göre belirle
      type: "default",
      data: {
        label: (
          <div key={`div-${index}`} className="div">
            {/* Anahtarı daha önce render edilmediyse ekle */}
            {!renderedKeys.includes(key) && <h2 className="heading">{key}</h2>}
            <div className="padding_div">
              {filteredItems.map((item, innerIndex) => (
                <div key={`inner-div-${index}-${innerIndex}`} className="test">
                  <div className="spaceBetween">
                    <p>
                      {item.value.includes("custom") || key.includes("custom")
                        ? `${item.display} `
                        : `${item.display} `}
                    </p>
                  </div>

                  <div className="spaceBetween_2">
                    {item.value.startsWith("custom") ||
                    item.value.startsWith("list.custom") ? (
                      <>
                        <p className="link_icon_p">
                          {item.value}{" "}
                          <IonIcon className="icons_link" icon={linkOutline} />{" "}
                        </p>
                        {/* Zincir ikonu */}
                      </>
                    ) : (
                      <>
                        <IonIcon
                          className="icons"
                          icon={getIconByType(item.value)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      position: { x: xPos, y: yPos },
      style: {
        backgroundColor: "#f7f7f7",
        width: "auto",
        minWidth: "150px",
        border: "none",
        fontSize: "8px",
        textAlign: "left",
        borderRadius: "10px",
        padding: "5px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        sourceHandle: {
          background: "#4caf50",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
        },
      },
    });
    // Eğer anahtar daha önce render edilmediyse renderedKeys dizisine ekle
    if (!renderedKeys.includes(key)) {
      renderedKeys.push(key);
    }
  }
});

export default nodes;
