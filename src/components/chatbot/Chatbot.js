import React, { useState } from 'react';
import OptionButton from '../OptionButton';
import Message from '../message/Message';
import './Chatbot.css'; // For styling

function Chatbot() {
  // Translations for all text and button labels in three languages (English, Sinhala, Tamil)
  const translations = {
    en: {
      welcome: "Hello! Welcome to Trincomalee campus.",
      selectLanguage: "Please select your language",
      confirmation: "Are you selected to the Trincomalee campus?",
      selectFaculty: "Please select your faculty",
      selectDepartment: "Please select your department",
      selectArea: "Please select the area you need help with",
      endSession: "Thank you for visiting. The session has ended.",
      buttons: {
        yes: "Yes",
        no: "No",
        faculties: ["Applied Science", "Communication and Business Studies", "Siddha Medicine"],
        areas: ["General Admission", "Student ID","Sports","Mahapola bursary","Hostel facilities", "More"],
        additionalAreas: ["Hostel facilities", "Library registration", "Mahapola bursary", "Sports", "Transport", "Canteen (foods)", "Health Services"],
        departments: {
          "Applied Science": ["Computer Science", "Physical Science"],
          "Communication and Business Studies": ["Languages and Communication Studies", "Business and Management Studies"],
          "Siddha Medicine": []
        }
      }
    },
    si: {
      welcome: "ආයුබෝවන්! ත්‍රිකුණාමලය විශ්වවිද්‍යාලය වෙත සාදරයෙන් පිළිගනිමු.",
      selectLanguage: "කරුණාකර ඔබේ භාෂාව තෝරන්න",
      confirmation: "ඔබ ත්‍රිකුණාමලය විශ්වවිද්‍යාලයට තෝරාගෙන තිබේද?",
      selectFaculty: "කරුණාකර ඔබේ පීඨය තෝරන්න",
      selectDepartment: "කරුණාකර ඔබේ අධ්‍යයන අංශය තෝරන්න",
      selectArea: "ඔබට උදව් අවශ්‍ය ප්‍රදේශය තෝරන්න",
      endSession: "පැමිණීම පිළිබඳ ස්තුතියි. සැසිය අවසන් වී ඇත.",
      buttons: {
        yes: "ඔව්",
        no: "නැත",
        // more: "තව",
        faculties: ["ව්‍යවහාරික විද්‍යා පීඨය", "සන්නිවේදන හා ව්‍යාපාර අධ්‍යයන පීඨය", "සිද්ධ වෛද්‍ය පීඨය"],
        areas: ["සාමාන්‍ය ඇතුලත් කිරීම", "ශිෂ්‍ය හැඳුනුම්පත","ක්‍රීඩා","මහපොල බසරි","නේවාසික පහසුකම්", "වෙනත්"],
        additionalAreas: ["නේවාසික පහසුකම්", "පුස්තකාල ලියාපදිංචිය", "මහපොල බසරි", "ක්‍රිඩා", "ප්‍රවාහන", "ආපන ශාලා", "සෞඛ්‍ය සේවාවන්"],
        departments: {
          "ව්‍යවහාරික විද්‍යා පීඨය": ["පරිඝණක විද්‍යා අංශය", "භෞතික විද්‍යා අංශය"],
          "සන්නිවේදන හා ව්‍යාපාර අධ්‍යයන පීඨය": ["භාෂා හා සන්නිවේදන අධ්‍යයන අංශය", "ව්‍යාපාර හා කළමනාකරණ අධ්‍යයන අංශය"],
          "සිද්ධ වෛද්‍ය පීඨය": []
        }
      }
    },
    ta: {
      welcome: "வணக்கம்! திரிகோணமலைப் பல்கலைக்கழகத்திற்கு வரவேற்கிறோம்.",
      selectLanguage: "தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
      confirmation: "நீங்கள் திரிகோணமலைப் பல்கலைக்கழகத்திற்கு தேர்வு செய்யப்பட்டவரா?",
      selectFaculty: "தயவுசெய்து உங்கள் பீடத்தைத் தேர்ந்தெடுக்கவும்",
      selectDepartment: "தயவுசெய்து உங்கள் துறைத் தேர்ந்தெடுக்கவும்",
      selectArea: "உங்களுக்கு உதவ தேவைப்படும் பகுதியைத் தேர்ந்தெடுக்கவும்",
      endSession: "வருகைக்கு நன்றி. அமர்வு முடிவடைந்தது.",
      buttons: {
        yes: "ஆம்",
        no: "இல்லை",
        faculties: ["விண்ணப்ப அறிவியல்", "தகவல் தொடர்பு மற்றும் வணிகக்கல்வி", "சித்த மருத்துவம்"],
        areas: ["பொது சேர்க்கை", "மாணவர் ஐடி", "விளையாட்டு", "மஹாபொல பசாரி", "குடியிருப்பு வசதிகள்", "மற்றவை"],
        additionalAreas: ["விடுதி வசதிகள்", "நூலக பதிவு", "மஹபோலா, உதவித்தொகை", "விளையாட்டுகள்", "விளையாட்டு", "உணவகம்", "மருத்துவமனை", "IT சேவைகள்", "மாணவர் சங்கம்", "கோட்பாட்டுக் கூடங்கள்"],
        departments: {
          "விண்ணப்ப அறிவியல்": ["கணினி அறிவியல்", "அறிவியல்"],
          "தகவல் தொடர்பு மற்றும் வணிகக்கல்வி": ["மொழிகள் மற்றும் தொடர்பு பயிற்சி", "வணிக மற்றும் மேலாண்மை"],
          "சித்த மருத்துவம்": []
        }
      }
    }
  };

  const [messages, setMessages] = useState([
    { text: translations["en"].welcome, sender: "bot" },
    { text: translations["en"].selectLanguage, sender: "bot" }
  ]);
  const [step, setStep] = useState(0);
  const [stepHistory, setStepHistory] = useState([]); // Track the history of steps
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language: English
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [userInput, setUserInput] = useState(""); // State for user input
  const [error, setError] = useState(''); // Error state for handling responses

  // Function to update the message text based on the step and selected language
  // const updateMessageForStep = (currentStep) => {
  //   const newMessage = (() => {
  //     switch (currentStep) {
  //       case 0:
  //         return translations[selectedLanguage].selectLanguage;
  //       case 1:
  //         return translations[selectedLanguage].confirmation;
  //       case 2:
  //         return translations[selectedLanguage].selectFaculty;
  //       case 3:
  //         return translations[selectedLanguage].selectDepartment;
  //       case 4:
  //         return translations[selectedLanguage].selectArea;
  //       default:
  //         return "";
  //     }
  //   })();

  //   setMessages(prevMessages => {
  //     const updatedMessages = [...prevMessages];
  //     updatedMessages[updatedMessages.length - 1] = { text: newMessage, sender: 'bot' }; // Update the last bot message
  //     return updatedMessages;
  //   });
  // };

  // Function to handle user input in the text box and send to backend
  const handleUserMessage = async () => {
    if (!userInput) return; // Do not send empty messages
    setMessages([...messages, { text: userInput, sender: 'user' }]);

    // Send request to the backend for response
    try {
      const response = await fetch('http://127.0.0.1:5000/chatbot', { // Update URL if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, language: selectedLanguage }) // Send message and selected language
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
      setError(''); // Clear error state on successful fetch
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Sorry, I couldn't get a response from the server.", sender: 'bot' }]);
      setError("Sorry, I couldn't get a response from the server. " + error.message);
    } finally {
      setUserInput(""); // Clear input field after sending the message
    }
  };

  // Language Selection Handler
  const handleLanguageSelection = (language, languageCode) => {
    setSelectedLanguage(languageCode); // Set the selected language code
    setMessages([
      
      { text: translations[languageCode].welcome, sender: 'bot' },
      { text: translations[languageCode].selectLanguage, sender: 'bot' },
      { text: language, sender: 'user' },
      { text: translations[languageCode].confirmation, sender: 'bot' },

    ]);
    setStepHistory([...stepHistory, step]); // Save the current step before moving to the next one
    setStep(1);
  };

  // Step 1: Confirmation Handler
  const handleSelectionConfirmation = (selection) => {
    
    setMessages([
      ...messages,
    { text: selection === "Yes" ? translations[selectedLanguage].buttons.yes : translations[selectedLanguage].buttons.no, sender: 'user' }]);
    if (selection === "Yes") {
      setMessages(prev => [...prev, { text: translations[selectedLanguage].selectFaculty, sender: 'bot' }]);
      setStepHistory([...stepHistory, step]);
      setStep(2);
    } else {
      setMessages([...messages, { text: translations[selectedLanguage].endSession, sender: 'bot' }]);
      setStep(5);
    }
  };

  // Step 2: Faculty Selection
  const handleFacultySelection = (faculty) => {
    setSelectedFaculty(faculty);
    setMessages([...messages, { text: faculty, sender: 'user' }]);
    if (faculty === "Siddha Medicine") {
      setMessages(prev => [...prev, { text: translations[selectedLanguage].selectArea, sender: 'bot' }]);
      setStepHistory([...stepHistory, step]);
      setStep(4);
    } else {
      setMessages(prev => [...prev, { text: translations[selectedLanguage].selectDepartment, sender: 'bot' }]);
      setStepHistory([...stepHistory, step]);
      setStep(3);
    }
  };

  // Step 3: Department Selection
  const handleDepartmentSelection = (department) => {
    setSelectedDepartment(department);
    setMessages([...messages, { text: department, sender: 'user' }, { text: translations[selectedLanguage].selectArea, sender: 'bot' }]);
    setStepHistory([...stepHistory, step]);
    setStep(4);
  };

  // Step 4: Area Selection
  const handleAreaSelection = async (area) => {
    if (area === translations[selectedLanguage].buttons.more) {
      setShowMore(true);
    } else {
      setMessages([...messages, { text: area, sender: 'user' }]);
      
      // Send the selected area to the backend
      try {
        const response = await fetch('http://127.0.0.1:5000/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: area, language: selectedLanguage }) // Send area and language to backend
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
        setError(''); // Clear error state on successful fetch
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Sorry, I couldn't get a response from the server.", sender: 'bot' }]);
        setError("Sorry, I couldn't get a response from the server. " + error.message);
      }
      
      setStep(5); // Mark the step as completed after receiving the response
    }
  };

  return (
    <div className='chatbox-container'>

<div className="chatbox">
      <div className="chat-header">Trincomalee Campus Chatbot</div>
      <div className="chat-content">
        
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {/* Step 0: Language Selection */}
        {step === 0 && (
          <div className="options-container">
            <OptionButton text="English" onClick={() => handleLanguageSelection("English", "en")} />
            <OptionButton text="සිංහල" onClick={() => handleLanguageSelection("සිංහල", "si")} />
            <OptionButton text="தமிழ்" onClick={() => handleLanguageSelection("தமிழ்", "ta")} />
          </div>
        )}

        {/* Step 1: Confirmation */}
        {step === 1 && (
          <div className="options-container">
            <OptionButton text={translations[selectedLanguage].buttons.yes} onClick={() => handleSelectionConfirmation("Yes")} />
            <OptionButton text={translations[selectedLanguage].buttons.no} onClick={() => handleSelectionConfirmation("No")} />
          </div>
        )}

        {/* Step 2: Faculty Selection */}
        {step === 2 && (
          <div className="options-container">
            {translations[selectedLanguage].buttons.faculties.map(faculty => (
              <OptionButton key={faculty} text={faculty} onClick={() => handleFacultySelection(faculty)} />
            ))}
          </div>
        )}

        {/* Step 3: Department Selection */}
        {step === 3 && selectedFaculty && (
          <div className="options-container">
            {translations[selectedLanguage].buttons.departments[selectedFaculty]?.map(department => (
              <OptionButton key={department} text={department} onClick={() => handleDepartmentSelection(department)} />
            ))}
          </div>
        )}

        {/* Step 4: Area Selection */}
        {step === 4 && (
          <div className="options-container">
            {translations[selectedLanguage].buttons.areas.map(area => (
              <OptionButton key={area} text={area} onClick={() => handleAreaSelection(area)} />
            ))}
            {/* {showMore && translations[selectedLanguage].buttons.additionalAreas.map(area => (
              <OptionButton key={area} text={area} onClick={() => handleAreaSelection(area)} />
            ))} */}
          </div>
        )}

        {/* {step === 5 && (
          <div className="options-container">
            {translations[selectedLanguage].buttons.areas.map(area => (
              <OptionButton key={area} text={area} onClick={() => handleAreaSelection(area)} />
            ))}
            {showMore && translations[selectedLanguage].buttons.additionalAreas.map(area => (
              <OptionButton key={area} text={area} onClick={() => handleAreaSelection(area)} />
            ))}
          </div>
        )} */}
      </div>

      {/* User input field */}
      <div className="chat-input-container">
      <input
    type="text"
    className="chat-input"
    value={userInput}
    placeholder="Type your message"
    onChange={e => setUserInput(e.target.value)}
    onKeyDown={e => e.key === 'Enter' && handleUserMessage()}
    aria-label="Type your message" // Accessibility
    autoComplete="off" // Prevent browser suggestions
  />
  <button 
    className="send-button" 
    onClick={handleUserMessage} 
    disabled={!userInput.trim()} // Disable if input is empty
    aria-label="Send message" // Accessibility
  >
    Send
  </button>
      </div>

      {/* Error message if any */}
      {error && <p className="error-message">{error}</p>}
    </div>
    </div>
  );
}

export default Chatbot;
