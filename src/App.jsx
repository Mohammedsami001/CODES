import React, { useState } from 'react';
import SnippetCard from './components/SnippetCard';

const dbmsSnippets = [
  {
    title: "Performing practical by using DDL statements (creating & managing tables, apply Constraints).",
    icon: "📝",
    code: `CREATE TABLE Patient (
    patient_id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    gender VARCHAR(10),
    phone VARCHAR(15)
);

CREATE TABLE Doctor (
    doctor_id INT PRIMARY KEY,
    name VARCHAR(50),
    specialization VARCHAR(50)
);

CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    date DATE,
    time TIME
);

CREATE TABLE Bill (
    bill_id INT PRIMARY KEY,
    patient_id INT,
    amount INT,
    date DATE
);
INSERT INTO Patient VALUES (1, 'Rohan', 20, 'Male', '9999999999');
INSERT INTO Patient VALUES (2, 'Amit', 22, 'Male', '8888888888');

INSERT INTO Doctor VALUES (1, 'Dr. Sharma', 'Cardiology');
INSERT INTO Doctor VALUES (2, 'Dr. Mehta', 'Orthopedic');

INSERT INTO Appointment VALUES (1, 1, 1, '2026-04-22', '10:00:00');
INSERT INTO Appointment VALUES (2, 2, 2, '2026-04-23', '11:00:00');

INSERT INTO Bill VALUES (1, 1, 5000, '2026-04-22');
INSERT INTO Bill VALUES (2, 2, 3000, '2026-04-23');`
  },
  {
    title: "Performing practical by using Aggregate functions.",
    icon: "📋",
    code: `SELECT COUNT(*) AS total_patients FROM Patient;
SELECT AVG(amount) AS avg_bill FROM Bill;
`
  },
  {
    title: "Performing practical by using SET operators like Union,Intersect etc.",
    icon: "📋",
    code: `SELECT name FROM Patient
UNION
SELECT name FROM Doctor;

SELECT name FROM Patient
INTERSECT
SELECT name FROM Doctor;

SELECT name FROM Patient
EXCEPT
SELECT name FROM Doctor;`
  },
  {
    title: "Perform practical by using GROUP BY and ORDERBY Clause.",
    icon: "📋",
    code: `SELECT doctor_id, COUNT(*) AS total_appointments
FROM Appointment
GROUP BY doctor_id
ORDER BY total_appointments DESC;
`
  },
  {
    title: "Perform practical by using HAVING Clause.",
    icon: "📋",
    code: `SELECT doctor_id, COUNT(*) AS total_appointments
FROM Appointment
GROUP BY doctor_id
HAVING COUNT(*) > 5;
`
  },
  {
    title: "Execute Queries using Inner JOIN operation.",
    icon: "📋",
    code: `SELECT P.name AS patient, D.name AS doctor
FROM Appointment A
INNER JOIN Patient P ON A.patient_id = P.patient_id
INNER JOIN Doctor D ON A.doctor_id = D.doctor_id;`
  },
  {
    title: "Execute Queries using Left outer JOIN operation.",
    icon: "📋",
    code: `SELECT P.name AS patient, D.name AS doctor
FROM Appointment A
LEFT JOIN Patient P ON A.patient_id = P.patient_id
LEFT JOIN Doctor D ON A.doctor_id = D.doctor_id;`
  },
  {
    title: "Execute Queries using Right outer JOIN operation.",
    icon: "📋",
    code: `SELECT P.name AS patient, D.name AS doctor
FROM Appointment A
RIGHT JOIN Patient P ON A.patient_id = P.patient_id
RIGHT JOIN Doctor D ON A.doctor_id = D.doctor_id;`
  },
  {
    title: "Execute Queries using Full outer JOIN operation.",
    icon: "📋",
    code: `SELECT P.name AS patient, D.name AS doctor
FROM Appointment A
FULL OUTER JOIN Patient P ON A.patient_id = P.patient_id
FULL OUTER JOIN Doctor D ON A.doctor_id = D.doctor_id;`
  },
  {
    title: "Performing practical by using Views.",
    icon: "📋",
    code: `CREATE VIEW AppointmentView AS
SELECT P.name AS patient, D.name AS doctor
FROM Appointment A
INNER JOIN Patient P ON A.patient_id = P.patient_id
INNER JOIN Doctor D ON A.doctor_id = D.doctor_id;`
  },
  {
    title: "Performing practical by using TRIGGER concept",
    icon: "📋",
    code: `CREATE TRIGGER after_appointment
AFTER INSERT ON Appointment
BEGIN
    INSERT INTO Audit (action, table_name, row_id, changed_by)
    VALUES ('INSERT', 'Appointment', NEW.appointment_id, USER());
END;`
  },
  {
    title: "Execute queries for Exist and NOT EXIST.",
    icon: "📋",
    code: `SELECT * FROM Patient
WHERE EXISTS (
    SELECT 1 FROM Appointment A
    WHERE A.patient_id = Patient.patient_id
);
SELECT * FROM Patient
WHERE NOT EXISTS (
    SELECT 1 FROM Appointment A
    WHERE A.patient_id = Patient.patient_id
);
`
  },
  {
    title: "Performing practical by using DCL (Grant ,Revoke) statements.",
    icon: "📋",
    code: `GRANT SELECT ON Appointment TO user1;
REVOKE UPDATE ON Bill FROM user1;`
  },
  {
    title: "Performing practical on stored procedures.",
    icon: "📋",
    code: `CREATE PROCEDURE GetPatientByID(
    IN p_id INT,
    OUT p_name VARCHAR(50),
    OUT p_age INT
) 
BEGIN
    SELECT name, age INTO p_name, p_age
    FROM Patient WHERE patient_id = p_id;
END;`
  },
];

const osSnippets = [
  {
    title: "System Calls (File Operations)",
    icon: "💻",
    code: `#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    int fd;
    char buffer[50];

    // Open or create file
    fd = open("test.txt", O_CREAT | O_RDWR, 0644);

    // Write to file
    write(fd, "Hello OS Lab", 12);

    // Move file pointer to beginning
    lseek(fd, 0, SEEK_SET);

    // Read from file
    read(fd, buffer, 12);

    // Null terminate the string
    buffer[12] = '\\0';

    // Print output
    printf("Data from file: %s\\n", buffer);

    // Close file
    close(fd);

    return 0;
}`
  },
  {
    title: "Process Creation using fork()",
    icon: "🔱",
    code: `#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t p = fork();
    if (p < 0) {
        printf("Fork failed\\n");
    } else if (p == 0) {
        printf("Hello from Child Process!\\n");
    } else {
        printf("Hello from Parent Process!\\n");
    }
    return 0;
}`
  },
  {
    title: "CPU Scheduling Algorithms",
    icon: "⏱️",
    code: `// FCFS, SJF, Round Robin
// Add your scheduling code here...`
  },
  {
    title: "Inter-Process Communication",
    icon: "📡",
    code: `// Pipes, Shared Memory, Message Queues
// Add your IPC code here...`
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('DBMS');

  const currentSnippets = activeTab === 'DBMS' ? dbmsSnippets : osSnippets;

  return (
    <div className="container">
      <header className="header">
        <h1>Code Snippet Gallery</h1>
        <p>A professional collection of code snippets for DBMS and OS.</p>
        
        <div className="nav-container">
          <button 
            className={`nav-btn ${activeTab === 'DBMS' ? 'active' : ''}`}
            onClick={() => setActiveTab('DBMS')}
          >
            DBMS Practicals
          </button>
          <button 
            className={`nav-btn ${activeTab === 'OS' ? 'active' : ''}`}
            onClick={() => setActiveTab('OS')}
          >
            OS Practicals
          </button>
        </div>
      </header>

      <main className="snippet-grid">
        {currentSnippets.map((snippet, index) => (
          <SnippetCard 
            key={`${activeTab}-${index}`}
            title={snippet.title}
            icon={snippet.icon}
            code={snippet.code}
          />
        ))}
      </main>

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
        <p>&copy; 2026. Designed for professionals.</p>
      </footer>
    </div>
  );
}

export default App;
