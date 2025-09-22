import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import Loading from "./Loading";
import { useSettings } from "./hooks/useSettings";
import { appWindow } from "@tauri-apps/api/window";
import { useDefaultPets, usePets } from "./hooks/usePets";
import { confirm } from "@tauri-apps/api/dialog";
import { MantineProvider } from "@mantine/core";
import { PrimaryColor } from "./utils";
import { ColorSchemeType } from "./types/ISetting";
import ThoughtBubble from "./ui/components/ThoughtBubble";
import "./ui/components/ThoughtBubble.css";
import { AIMessage } from "./services/petAIService";

const PhaserWrapper = React.lazy(() => import("./PhaserWrapper"));
const SettingWindow = React.lazy(() => import("./SettingWindow"));

function App() {
  useSettings();
  useDefaultPets();
  const { isError, error } = usePets();
  
  // State for AI thought bubble
  const [currentThought, setCurrentThought] = useState<string>("");
  const [isThoughtVisible, setIsThoughtVisible] = useState(false);

  // Listen for AI messages from Phaser scene
  useEffect(() => {
    const handleAIMessage = (event: CustomEvent<AIMessage>) => {
      const message = event.detail;
      setCurrentThought(message.text);
      setIsThoughtVisible(true);
    };

    // Add event listener
    window.addEventListener('ai-message' as any, handleAIMessage);

    return () => {
      window.removeEventListener('ai-message' as any, handleAIMessage);
    };
  }, []);

  if (isError) {
    confirm(`Error: ${error.message}`, {
      title: 'WindowPet Dialog',
      type: 'error',
    }).then((ok) => {
      if (ok !== undefined) {
        appWindow.close();
      }
    });
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PhaserWrapper />} />
          <Route path="/setting" element={
            <Suspense fallback={<Loading />}>
              <MantineProvider
                defaultColorScheme={ColorSchemeType.Dark}
                theme={{
                  fontFamily: 'cursive, Siemreap, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
                  colors: {
                    dark: [
                      "#C1C2C5",
                      "#A6A7AB",
                      "#909296",
                      "#5C5F66",
                      "#373A40",
                      "#2C2E33",
                      // shade
                      "#1A1B1E",
                      // background
                      "#141517",
                      "#1A1B1E",
                      "#101113",
                    ],
                  },
                  primaryColor: PrimaryColor,
                }} >
                <SettingWindow />
              </MantineProvider>
            </Suspense>
          } />
        </Routes>
      </Router>
      
      {/* AI Thought Bubble - Always rendered but conditionally visible */}
      <ThoughtBubble
        message={currentThought}
        isVisible={isThoughtVisible}
        onAnimationComplete={() => {
          setIsThoughtVisible(false);
          setCurrentThought("");
        }}
        duration={12000}
      />
    </>
  );
}

export default App;