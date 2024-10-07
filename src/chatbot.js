import React, { useState } from 'react';
import ChatInput from './chatInput';
import Dropdown from './dropdown';

const faculties = {
  'Applied Science': ['Computer Science', 'Physical Science'],
  'Communication and Business Studies': ['Languages and Communication Studies', 'Business and Management Studies'],
  'Siddha Medicine': []
};

const problems = [
  'Hostel facilities', 'Student ID', 'Library registration', 'Mahapola, bursary', 
  'General Admission', 'Sports', 'Campus location (Bus routes, train)', 'Canteen (foods)', 
  'About lecturers, staff', 'Other faculties', 'Health Services (Medical Centre)', 
  'IT Services (Wi-Fi, Computer Labs)', 'Activities and Clubs in campus', 'Campus map'
];

function Chatbot() {
  const [language, setLanguage] = useState(null);
  const [campusSelected, setCampusSelected] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [problem, setProblem] = useState(null);
  const [conversation, setConversation] = useState([]);

  const handleLanguageSelect = (value) => {
    setLanguage(value);
    setConversation([...conversation, `Language selected: ${value}`]);
  };

  const handleCampusSelect = (value) => {
    setCampusSelected(value);
    if (value === 'Yes') {
      setConversation([...conversation, 'You selected Yes. Proceeding...']);
    } else {
      setConversation([...conversation, 'You selected No. Conversation ended.']);
    }
  };

  const handleFacultySelect = (value) => {
    setFaculty(value);
    setConversation([...conversation, `Faculty selected: ${value}`]);
  };

  const handleDepartmentSelect = (value) => {
    setDepartment(value);
    setConversation([...conversation, `Department selected: ${value}`]);
  };

  const handleProblemSelect = (value) => {
    setProblem(value);
    setConversation([...conversation, `Problem selected: ${value}. Here's the answer.`]);
  };

  const handleUserInput = (input) => {
    setConversation([...conversation, `User asked: ${input}`]);
    setConversation([...conversation, 'Answer for your question...']);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-display">
        {conversation.map((msg, index) => <div key={index} className="chat-message">{msg}</div>)}
      </div>
      {!language && <Dropdown label="Select Language" options={['English', 'Sinhala', 'Tamil']} onSelect={handleLanguageSelect} />}
      {language && !campusSelected && <Dropdown label="Did you select to our campus?" options={['Yes', 'No']} onSelect={handleCampusSelect} />}
      {campusSelected === 'Yes' && !faculty && <Dropdown label="Select Faculty" options={Object.keys(faculties)} onSelect={handleFacultySelect} />}
      {faculty && !department && <Dropdown label="Select Department" options={faculties[faculty]} onSelect={handleDepartmentSelect} />}
      {department && !problem && <Dropdown label="Select Problem" options={problems} onSelect={handleProblemSelect} />}
      <ChatInput onSubmit={handleUserInput} />
    </div>
  );
}

export default Chatbot;
    