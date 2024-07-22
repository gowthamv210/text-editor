import React, { useState, useEffect } from "react";
import axios from "axios";

const serverURL = "http://localhost:9000/fonts";
const serverURL2 = "http://localhost:9001";

interface FontFamilyListProps {
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  fontWeight: string;
  setFontWeight: (fontWeight: string) => void;
  isItalic: boolean;
  setIsItalic: (isItalic: boolean) => void;
}

const FontFamilyList: React.FC<FontFamilyListProps> = ({
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  isItalic,
  setIsItalic,
}) => {
  const [fonts, setFontNames] = useState<string[]>([]);
  const [normalList, setNormalList] = useState<string[]>([]);
  const [italicList, setItalicList] = useState<string[]>([]);
  const [normalLinks, setNormalLinks] = useState<string[]>([]);
  const [italicLinks, setItalicLinks] = useState<string[]>([]);

  const updateCheckbox = () => {
    const checkbox = document.getElementById(
      "italicCheckbox"
    ) as HTMLInputElement;
    const target = `${fontWeight}italic`;
    const isPresent = italicList.some((item) => item.includes(target));
    checkbox.disabled = !isPresent;
  };

  const loadFonts = () => {
    const normalIndex = normalList.indexOf(fontWeight);
    const italicIndex = italicList.indexOf(fontWeight);

    const normalFontLink = normalIndex !== -1 ? normalLinks[normalIndex] : null;
    const italicFontLink =
      isItalic && italicIndex !== -1 ? italicLinks[italicIndex] : null;

    if (normalFontLink) {
      loadGoogleFont(normalFontLink);
    }

    if (italicFontLink) {
      loadGoogleFont(italicFontLink);
    }
  };

  const loadGoogleFont = (fontUrl: string) => {
    // Check if the font is already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.href = fontUrl;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  useEffect(() => {
    const fetchFontNames = async () => {
      try {
        const response = await axios.get(serverURL);
        const keys = Object.keys(response.data);
        setFontNames(keys);
      } catch (error) {
        console.error("Error fetching font names:", error);
      }
    };

    fetchFontNames();
  }, []);

  useEffect(() => {
    const fetchFontLinks = async () => {
      try {
        const response = await axios.get(
          `${serverURL2}/${encodeURIComponent(fontFamily)}`
        );
        const newFontResponse = response.data;

        const normal: string[] = [];
        const italic: string[] = [];
        const temp1: string[] = [];
        const temp2: string[] = [];

        Object.entries(newFontResponse).forEach(([key, value]) => {
          if (key.includes("italic")) {
            italic.push(value as string);
            temp2.push(key as string);
          } else {
            normal.push(value as string);
            temp1.push(key as string);
          }
        });

        setNormalList(temp1);
        setItalicList(temp2);
        setNormalLinks(normal);
        setItalicLinks(italic);
      } catch (error) {
        console.error("Error fetching font links:", error);
      }
    };

    if (fontFamily) {
      fetchFontLinks();
    }
  }, [fontFamily]);

  useEffect(() => {
    updateCheckbox();
    loadFonts();
  }, [fontFamily, fontWeight, isItalic, normalLinks, italicLinks]);

  const handleFontSelect = (value: string) => {
    setFontFamily(value);
  };

  return (
    <div className="fontBox">
      <div className="fontfamily-selector">
        Font Family
        <select
          className="fontfamily-list"
          onChange={(e) => handleFontSelect(e.target.value)}
        >
          {fonts.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="variant-selector">
        Variant
        <select
          className="fontfamily-list"
          onChange={(e) => setFontWeight(e.target.value)}
          required
        >
          {normalList.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="italics-toggle">
        <label>
          Italic:
          <input
            id="italicCheckbox"
            type="checkbox"
            checked={isItalic}
            onChange={(e) => setIsItalic(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};

export default FontFamilyList;
