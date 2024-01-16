import data from "./data.json";

const edges = [];

// JSON verisindeki anahtarları döngü ile dolaşarak bağlantıları oluştur
Object.keys(data).forEach((key) => {
  const items = data[key];

  items.forEach((item) => {
    const source = `div-${key}`;

    if (item.value && typeof item.value === "string") {
      // "custom" kelimesi ile başlayan value değerlerini hedef olarak al
      if (
        item.value.startsWith("custom.") ||
        item.value.startsWith("list.custom.")
      ) {
        const targetKey = item.value.replace("custom.", "");
        const targetKeyWithList = item.value.replace("list.custom.", "");

        if (data[targetKey]) {
          edges.push({
            id: `edge-${source}-${targetKey}`,
            source: `div-${targetKey}`,
            target: source,
          });
        }
        if (data[targetKeyWithList]) {
          edges.push({
            id: `edge1-${source}-${targetKeyWithList}`,
            source: `div-${targetKeyWithList}`,
            target: source,
          });
        }
      }
    }
  });
});

export default edges;
