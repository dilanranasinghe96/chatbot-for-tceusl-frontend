import React, { useState } from 'react';
import OptionButton from '../OptionButton';
import Message from '../message/Message';
import './Chatbot.css'; // For styling

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Trincomalee campus. 😊", sender: "bot" },
    { text: "Please select your language", sender: "bot" }
  ]);
  const [step, setStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([]); // Track the history of steps
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [userInput, setUserInput] = useState(""); // State for user input

  const faculties = [
    { name: "Applied Science", departments: ["Computer Science", "Physical Science"] },
    { name: "Communication and Business Studies", departments: ["Languages and Communication Studies", "Business and Management Studies"] },
    { name: "Siddha Medicine", departments: [] }
  ];

  const initialAreas = [
    "General Admission", "About Degree Program", "Academic Staff", "More"
  ];

  const additionalAreas = [
    "Student ID", "Hostel facilities", "Library registration", "Mahapola, bursary",
    "Sports", "Campus location (Bus route)", "Canteen (foods)", "Health Services (Medical Centre)", 
    "IT Services (Wi-Fi, Computer Labs)", "Activities and Clubs in campus", "Campus map"
  ];

  // Function to go back to the previous step
  const handleGoBack = () => {
    if (stepHistory.length > 0) {
      const lastStep = stepHistory.pop();
      setStep(lastStep);
      setStepHistory([...stepHistory]);
      updateMessageForStep(lastStep); // Update message for the last step
    }
  };

  // Update message for each step
  const updateMessageForStep = (currentStep) => {
    let newMessage;
    switch (currentStep) {
      case 0:
        newMessage = "Please select your language";
        break;
      case 1:
        newMessage = "Are you selected to the Trincomalee campus?";
        break;
      case 2:
        newMessage = "Please select your faculty";
        break;
      case 3:
        newMessage = "Please select your department";
        break;
      case 4:
        newMessage = "Please select the area you need help with";
        break;
      default:
        newMessage = "How can I assist you?";
    }
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = { text: newMessage, sender: 'bot' }; // Update the last bot message
      return updatedMessages;
    });
  };

  // Function to handle user input in the text box and send to backend
  const handleUserMessage = async () => {
    if (!userInput) return; // Do not send empty messages
    setMessages([...messages, { text: userInput, sender: 'user' }]);

    // Send request to the backend for response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
      
      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Sorry, I couldn't get a response from the server.", sender: 'bot' }]);
    } finally {
      setUserInput(""); // Clear input field after sending the message
    }
  };

  // Language Selection Handler
  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setMessages([...messages, { text: language, sender: 'user' }, { text: "Are you selected to the Trincomalee campus?", sender: 'bot' }]);
    setStepHistory([...stepHistory, step]); // Save the current step before moving to the next one
    setStep(1);
  };

  // Step 1: Confirmation Handler
  const handleSelectionConfirmation = (selection) => {
    if (selection === "Yes") {
      setMessages([...messages, { text: selection, sender: 'user' }, { text: "Please select your faculty", sender: 'bot' }]);
      setStepHistory([...stepHistory, step]);
      setStep(2);
    } else {
      setMessages([...messages, { text: selection, sender: 'user' }, { text: "Thank you for visiting. The session has ended.", sender: 'bot' }]);
      setStep(5);
    }
  };

  // Step 2: Faculty Selection
  const handleFacultySelection = (faculty) => {
    setSelectedFaculty(faculty);
    if (faculty === "Siddha Medicine") {
      setMessages([...messages, { text: faculty, sender: 'user' }, { text: "Please select the area you need help with", sender: 'bot' }]);
      setStepHistory([...stepHistory, step]);
      setStep(4);
    } else {
      setMessages([...messages, { text: faculty, sender: 'user' }, { text: "Please select your department", sender: 'bot' }]);
      setStepHistory([...stepHistory, step]);
      setStep(3);
    }
  };

  // Step 3: Department Selection
  const handleDepartmentSelection = (department) => {
    setSelectedDepartment(department);
    setMessages([...messages, { text: department, sender: 'user' }, { text: "Please select the area you need help with", sender: 'bot' }]);
    setStepHistory([...stepHistory, step]);
    setStep(4);
  };

  // Step 4: Area Selection
  const handleAreaSelection = (area) => {
    if (area === "More") {
      setShowMore(true);
    } else {
      setMessages([...messages, { text: area, sender: 'user' }]);
      setStep(5);
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-header">Chatbot</div>
      <div className="chat-content">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Step 0: Language Selection */}
        {step === 0 && (
          <div className="options-container">
            <OptionButton text="English" onClick={() => handleLanguageSelection("English")} />
            <OptionButton text="සිංහල" onClick={() => handleLanguageSelection("සිංහල")} />
            <OptionButton text="தமிழ்" onClick={() => handleLanguageSelection("தமிழ்")} />
          </div>
        )}

        {/* Step 1: Confirmation */}
        {step === 1 && (
          <div className="options-container">
            <OptionButton text="Yes" onClick={() => handleSelectionConfirmation("Yes")} />
            <OptionButton text="No" onClick={() => handleSelectionConfirmation("No")} />
          </div>
        )}

        {/* Step 2: Faculty Selection */}
        {step === 2 && (
          <div className="options-container">
            {faculties.map((faculty, index) => (
              <OptionButton key={index} text={faculty.name} onClick={() => handleFacultySelection(faculty.name)} />
            ))}
          </div>
        )}

        {/* Step 3: Department Selection */}
        {step === 3 && selectedFaculty !== "Siddha Medicine" && (
          <div className="options-container">
            {faculties.find(faculty => faculty.name === selectedFaculty).departments.map((dept, index) => (
              <OptionButton key={index} text={dept} onClick={() => handleDepartmentSelection(dept)} />
            ))}
          </div>
        )}

        {/* Step 4: Initial Area Selection */}
        {step === 4 && !showMore && (
          <div className="options-container">
            {initialAreas.map((area, index) => (
              <OptionButton key={index} text={area} onClick={() => handleAreaSelection(area)} />
            ))}
          </div>
        )}

        {/* Step 4: Additional Area Selection */}
        {step === 4 && showMore && (
          <div className="options-container">
            {additionalAreas.map((area, index) => (
              <OptionButton key={index} text={area} onClick={() => handleAreaSelection(area)} />
            ))}
          </div>
        )}

        {/* Back button */}
        {stepHistory.length > 0 && (
          <div className="options-container">
            <OptionButton text="Back" onClick={handleGoBack} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)} // Update userInput state
          placeholder="Type your message..."
        />
        <button onClick={handleUserMessage}>Send</button> {/* Send button */}
      </div>
    </div>
  );
}

export default Chatbot;
