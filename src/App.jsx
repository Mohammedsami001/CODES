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

import vlan1 from './assets/vlan_config_1.jpg';
import vlan2 from './assets/vlan_config_2.jpg';
import vlan3 from './assets/vlan_config_3.jpg';

const mdmSnippets = [
  {
    title: "Cisco Switch & VLAN Configuration (Packet Tracer)",
    icon: "🌐",
    images: [vlan1, vlan2, vlan3],
    code: `// Basic Switch Configuration
Switch> enable
Switch# configure terminal
Switch(config)# hostname smit

// VLAN Interface Configuration
smit(config)# interface vlan1
smit(config-if)# ip address 10.0.0.1 255.0.0.0
smit(config-if)# no shutdown
smit(config-if)# exit

// Verify Configuration
smit# show ip interface brief`
  },
  {
    title: "Basic CRUD - Inserting Documents into MongoDB",
    icon: "🍃",
    code: `// Insert a single document
db.patients.insertOne({
    name: "Rohan",
    age: 20,
    gender: "Male",
    phone: "9999999999",
    records: []
});

// Insert multiple documents
db.doctors.insertMany([
    { name: "Dr. Sharma", specialization: "Cardiology" },
    { name: "Dr. Mehta", specialization: "Orthopedic" }
]);`
  },
  {
    title: "Querying with Filters and Projection",
    icon: "🍃",
    code: `// Find all patients older than 21
db.patients.find({ 
    age: { $gt: 21 } 
});

// Find specific doctor and return only name and specialization
db.doctors.find(
    { specialization: "Cardiology" },
    { name: 1, specialization: 1, _id: 0 }
);`
  },
  {
    title: "Aggregation Pipeline (Group & Sort)",
    icon: "🍃",
    code: `// Count number of appointments per doctor
db.appointments.aggregate([
    { 
        $group: { 
            _id: "$doctor_id", 
            total_appointments: { $sum: 1 } 
        } 
    },
    { 
        $sort: { total_appointments: -1 } 
    }
]);`
  },
  {
    title: "Update and Delete Operations",
    icon: "🍃",
    code: `// Update patient's age and add a visit record
db.patients.updateOne(
    { name: "Rohan" },
    { 
        $set: { age: 21 },
        $push: { visits: { date: "2026-04-23", reason: "Checkup" } }
    }
);

// Delete all appointments before a certain date
db.appointments.deleteMany({
    date: { $lt: "2026-01-01" }
});`
  },
  {
    title: "Indexing for Performance",
    icon: "🍃",
    code: `// Create a single field index
db.doctors.createIndex({ specialization: 1 });

// Create a compound index for patient name and age
db.patients.createIndex({ name: 1, age: -1 });

// List all indexes
db.patients.getIndexes();`
  },
  {
    title: "Schema Validation (JSON Schema)",
    icon: "🍃",
    code: `db.createCollection("staff", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "role", "email" ],
         properties: {
            name: { bsonType: "string" },
            role: { enum: [ "Nurse", "Admin", "Tech" ] },
            email: {
               bsonType: "string",
               pattern: "^.+@.+$"
            }
         }
      }
   }
});`
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('DBMS');

  const currentSnippets = activeTab === 'DBMS' ? dbmsSnippets : mdmSnippets;

  return (
    <div className="container">
      <header className="header">
        <h1></h1>
        <p>guess who helped u</p>
        
        <div className="nav-container">
          <button 
            className={`nav-btn ${activeTab === 'DBMS' ? 'active' : ''}`}
            onClick={() => setActiveTab('DBMS')}
          >
            DBMS 
          </button>
          <button 
            className={`nav-btn ${activeTab === 'MDM' ? 'active' : ''}`}
            onClick={() => setActiveTab('MDM')}
          >
            MDM 
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
            images={snippet.images}
          />
        ))}
      </main> 

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
        <b><p>THE NOMADSTALLION.</p></b>
      </footer>
    </div>
  );
}

export default App;

