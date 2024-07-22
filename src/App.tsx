import React from "react";
import { useState, useEffect } from "react";
import FontFamilyList from "./components/FontFamilyList";
import Button from "./components/Button";

function App() {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [isItalic, setIsItalic] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("textEditorData") || "{}"
    );
    if (savedData) {
      setText(savedData.text || "");
      setFontFamily(savedData.fontFamily || "");
      setFontWeight(savedData.fontWeight || "");
      setIsItalic(savedData.isItalic || false);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  function handleOnReset() {
    setText("");
  }

  function handleOnSave() {
    const data = {
      text,
      fontFamily,
      fontWeight,
      isItalic,
    };
    localStorage.setItem("textEditorData", JSON.stringify(data));
  }

  return (
    <div className="container">
      <h2>Text Editor</h2>
      <FontFamilyList
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        isItalic={isItalic}
        setIsItalic={setIsItalic}
      />

      <textarea
        className="textbox"
        style={{
          fontFamily,
          fontWeight,
          fontStyle: isItalic ? "italic" : "normal",
        }}
        placeholder="Type here.."
        value={text}
        onChange={handleChange}
        rows={7}
        cols={50}
        required
      />

      <div className="btn-stack">
        <Button handlefunction={handleOnReset}>Reset</Button>
        <Button handlefunction={handleOnSave}>Save</Button>
      </div>
    </div>
  );
}

export default App;
