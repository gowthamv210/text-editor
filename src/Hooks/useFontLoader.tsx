import { useEffect } from "react";

const useFontLoader = (fontUrl: string, fontFamily: string) => {
  useEffect(() => {
    if (!fontUrl || !fontFamily) return;

    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontUrl}');
        font-weight: normal;
        font-style: normal;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontUrl, fontFamily]);
};

export default useFontLoader;
