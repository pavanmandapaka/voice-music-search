import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognitionComponent = ({ onTranscript }) => {
  // Get speech recognition data
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Start listening function
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  // Stop listening function
  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (onTranscript) onTranscript(transcript); // Send transcript to parent component
  };

  // If the browser does not support SpeechRecognition
  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Voice Search</h2>
      <p>{listening ? "Listening..." : "Click to start speaking"}</p>
      
      {/* Buttons for controlling speech recognition */}
      <button onClick={startListening} style={{ marginRight: "10px" }}>🎤 Start Listening</button>
      <button onClick={stopListening}>🛑 Stop Listening</button>
      <button onClick={resetTranscript} style={{ marginLeft: "10px" }}>🔄 Reset</button>

      {/* Display spoken words */}
      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
