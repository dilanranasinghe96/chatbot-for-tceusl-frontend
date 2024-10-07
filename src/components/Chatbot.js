import React, { useState } from 'react';
import Message from './Message';
import OptionButton from './OptionButton';
import './Chatbot.css'; // For styling

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Trncomalee campus.", sender: "bot" },
    { text: "Please select your language", sender: "bot" }
  ]);
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const faculties = [
    { name: "Applied Science", departments: ["Computer Science", "Physical Science"] },
    { name: "Communication and Business Studies", departments: ["Languages and Communication Studies", "Business and Management Studies"] },
    { name: "Siddha Medicine", departments: [] }
  ];

  const areas = [
    "Hostel facilities", "Student ID", "Library registration", "Mahapola", "Bursary", 
    "General Admission", "Sports", "Campus location", "Canteen", "About lecturers",
    "Health Services", "IT Services", "Activities and Clubs", "Campus map"
  ];

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setMessages([...messages, { text: language, sender: 'user' }, { text: "Please select your faculty", sender: 'bot' }]);
    setStep(1);
  };

  const handleFacultySelection = (faculty) => {
    setSelectedFaculty(faculty);
    setMessages([...messages, { text: faculty, sender: 'user' }, { text: "Please select your department", sender: 'bot' }]);
    setStep(2);
  };

  const handleDepartmentSelection = (department) => {
    setSelectedDepartment(department);
    setMessages([...messages, { text: department, sender: 'user' }, { text: "Please select the area you need help with", sender: 'bot' }]);
    setStep(3);
  };

  const handleAreaSelection = (area) => {
    setMessages([...messages, { text: area, sender: 'user' }]);
    setStep(4); // Completed
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

        {/* Step 1: Faculty Selection */}
        {step === 1 && (
          <div className="options-container">
            {faculties.map((faculty, index) => (
              <OptionButton key={index} text={faculty.name} onClick={() => handleFacultySelection(faculty.name)} />
            ))}
          </div>
        )}

        {/* Step 2: Department Selection */}
        {step === 2 && (
          <div className="options-container">
            {faculties.find(faculty => faculty.name === selectedFaculty).departments.map((dept, index) => (
              <OptionButton key={index} text={dept} onClick={() => handleDepartmentSelection(dept)} />
            ))}
          </div>
        )}

        {/* Step 3: Area Selection */}
        {step === 3 && (
          <div className="options-container">
            {areas.map((area, index) => (
              <OptionButton key={index} text={area} onClick={() => handleAreaSelection(area)} />
            ))}
          </div>
        )}
      </div>

      {/* Text input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your question..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setMessages([...messages, { text: e.target.value, sender: 'user' }]);
              e.target.value = '';
            }
          }}
        />
        <button onClick={() => setMessages([...messages, { text: "Thank you!", sender: 'user' }])}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
