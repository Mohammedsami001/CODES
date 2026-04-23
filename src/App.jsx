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

CREATE TABLE Audit (
    action VARCHAR(20),
    table_name VARCHAR(50),
    row_id INT,
    changed_by VARCHAR(50)
);

-- 1. Add a new column
ALTER TABLE Patient
ADD email VARCHAR(100);

-- 2. Modify an existing column
ALTER TABLE Doctor
MODIFY name VARCHAR(100);

-- 3. Rename a column
ALTER TABLE Patient
RENAME COLUMN phone TO contact_no;

-- 4. Add a FOREIGN KEY constraint
ALTER TABLE Appointment
ADD CONSTRAINT fk_patient
FOREIGN KEY (patient_id) REFERENCES Patient(patient_id);

-- 5. Drop a column
ALTER TABLE Patient
DROP COLUMN email;

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
    code: `-- 1. COUNT: Total patients
SELECT COUNT(*) AS total_patients
FROM Patient;

-- 2. SUM: Total revenue
SELECT SUM(amount) AS total_revenue
FROM Bill;

-- 3. AVG: Average bill amount
SELECT AVG(amount) AS avg_bill
FROM Bill;

-- 4. MAX & MIN: Highest and lowest bill
SELECT MAX(amount) AS highest_bill,
       MIN(amount) AS lowest_bill
FROM Bill;

-- 5. GROUP BY: Total bill per patient
SELECT patient_id, SUM(amount) AS total_bill
FROM Bill
GROUP BY patient_id;
`
  },
  {
    title: "Performing practical by using SET operators like Union,Intersect etc.",
    icon: "📋",
    code: `-- 1. UNION: Get all names from Patient and Doctor (no duplicates)
SELECT name FROM Patient
UNION
SELECT name FROM Doctor;

-- 2. UNION ALL: Get all names including duplicates
SELECT name FROM Patient
UNION ALL
SELECT name FROM Doctor;

-- 3. INTERSECT: Patients who also have bills
SELECT patient_id FROM Patient
INTERSECT
SELECT patient_id FROM Bill;

-- 4. EXCEPT: Patients who do NOT have bills
SELECT patient_id FROM Patient
EXCEPT
SELECT patient_id FROM Bill;

-- 5. UNION with condition: Patients and Doctors with similar criteria
SELECT name FROM Patient WHERE age > 21
UNION
SELECT name FROM Doctor WHERE specialization = 'Cardiology';
-- INTERSECT and EXCEPT may not work in MySQL.`
  },
  {
    title: "Perform practical by using GROUP BY and ORDERBY Clause.",
    icon: "📋",
    code: `-- 1. GROUP BY: Number of patients by gender
SELECT gender, COUNT(*) AS total_patients
FROM Patient
GROUP BY gender;

-- 2. GROUP BY: Total bill per patient
SELECT patient_id, SUM(amount) AS total_bill
FROM Bill
GROUP BY patient_id;

-- 3. ORDER BY: Patients sorted by age (ascending)
SELECT * 
FROM Patient
ORDER BY age ASC;

-- 4. ORDER BY: Bills sorted by amount (descending)
SELECT * 
FROM Bill
ORDER BY amount DESC;

-- 5. GROUP BY + ORDER BY: Total bill per patient (highest first)
SELECT patient_id, SUM(amount) AS total_bill
FROM Bill
GROUP BY patient_id
ORDER BY total_bill DESC;
`
  },
  {
    title: "Perform practical by using HAVING Clause.",
    icon: "📋",
    code: `-- 1. Patients whose total bill is greater than 4000
SELECT patient_id, SUM(amount) AS total_bill
FROM Bill
GROUP BY patient_id
HAVING SUM(amount) > 4000;

-- 2. Doctors having more than 0 appointments
SELECT doctor_id, COUNT(*) AS total_appointments
FROM Appointment
GROUP BY doctor_id
HAVING COUNT(*) > 0;

-- 3. Gender groups with average age greater than 21
SELECT gender, AVG(age) AS avg_age
FROM Patient
GROUP BY gender
HAVING AVG(age) > 21;

-- 4. Patients having more than 1 bill
SELECT patient_id, COUNT(*) AS bill_count
FROM Bill
GROUP BY patient_id
HAVING COUNT(*) > 1;

-- 5. Total bill per patient greater than average bill amount
SELECT patient_id, SUM(amount) AS total_bill
FROM Bill
GROUP BY patient_id
HAVING SUM(amount) > (SELECT AVG(amount) FROM Bill);
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
LEFT JOIN Patient P ON A.patient_id = P.patient_id
LEFT JOIN Doctor D ON A.doctor_id = D.doctor_id

UNION

SELECT P.name AS patient, D.name AS doctor
FROM Appointment A
RIGHT JOIN Patient P ON A.patient_id = P.patient_id
RIGHT JOIN Doctor D ON A.doctor_id = D.doctor_id;`
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
    code: `DELIMITER $$

CREATE TRIGGER after_appointment
AFTER INSERT ON Appointment
FOR EACH ROW
BEGIN
    INSERT INTO Audit (action, table_name, row_id, changed_by)
    VALUES ('INSERT', 'Appointment', NEW.appointment_id, USER());
END$$

DELIMITER ;`
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
    code: `CREATE USER 'user1'@'localhost' IDENTIFIED BY 'password';

GRANT SELECT ON your_database.Appointment TO 'user1'@'localhost';

REVOKE UPDATE ON your_database.Bill FROM 'user1'@'localhost';`
  },
  {
    title: "Performing practical on stored procedures.",
    icon: "📋",
    code: `DELIMITER $$

CREATE PROCEDURE GetPatientByID(
    IN p_id INT,
    OUT p_name VARCHAR(50),
    OUT p_age INT
)
BEGIN
    SELECT name, age INTO p_name, p_age
    FROM Patient
    WHERE patient_id = p_id;
END$$

DELIMITER ;

-- To CALL it 
CALL GetPatientByID(1, @name, @age);
SELECT @name, @age;
`
  },
];

import vlan1 from './assets/vlan_config_1.jpg';
import vlan2 from './assets/vlan_config_2.jpg';
import vlan3 from './assets/vlan_config_3.jpg';
import router1 from './assets/router_config_1.jpg';

const mdmSnippets = [
  {
    title: "EXP 2",
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
smit# show ip interface brief
Writeup:
Expt no.2
AIM:-To identify modem, router, and switch hardware and demonstrate their working in a computer network.
Objectives:-
1.	To identify the physical components of modem, router, and switch
2.	To understand the function of each device
3.	To demonstrate data communication using these devices

Apparatus / Requirements:-
•	Modem
•	Router
•	Switch
•	Ethernet (LAN) cables
•	Computer / Laptop
•	Power supply
Theory
1. Modem
A modem (Modulator–Demodulator) converts digital signals from a computer into analog signals for transmission and converts incoming analog signals back into digital form.
Functions:
•	Provides internet connectivity
•	Converts digital ↔ analog signals
________________________________________
2. Router
A router connects multiple networks and forwards data packets using IP addresses.
Functions:
•	Routes data between networks
•	Assigns IP addresses (DHCP)
•	Provides network security
________________________________________
3. Switch
A switch connects multiple devices within a Local Area Network (LAN) and forwards data using MAC addresses.
Functions:
•	Enables device-to-device communication
•	Reduces network collisions
•	Improves network speed
Procedure (Step-by-Step)
A. Identification of Hardware
1.	Observe the modem and identify:
o	Power port
o	Line/DSL/Coaxial port
o	LAN port
o	LED indicators
2.	Observe the router and identify:
o	WAN port
o	LAN ports
o	Antennas
o	Status LEDs
3.	Observe the switch and identify:
o	Ethernet ports
o	Power connector
o	Activity LEDs
________________________________________
B. Demonstration of Working
1.	Connect the modem to the ISP line.
2.	Connect the modem to the router using an Ethernet cable.
3.	Connect the router to the switch.
4.	Connect computers to the switch.
5.	Switch ON all devices.
6.	Access the internet or transfer data between computers.
________________________________________
Observation
•	Modem successfully provides internet access.
•	Router routes data between networks.
•	Switch enables communication among LAN devices.
•	Data transmission is successful.
________________________________________
Conclusion:-
Modem, router, and switch are essential networking devices. Together, they enable internet access, routing, and efficient local communication in a network.
`
  },
  {
    title: "EXP 5",
    icon: "🌐",
    code: `Experiment No. 5
Aim:
To study and demonstrate the transmission of signals through wireless media.
Apparatus / Requirements:
- Computer / Laptop
- Cisco Packet Tracer
- Wireless Router / Access Point
- Wireless End Devices
- Power Supply
Theory:
Wireless communication is the transfer of information without physical cables using electromagnetic waves like radio waves.
Block Diagram:
Data Source → Transmitter → Antenna → Air → Antenna → Receiver → Destination
Procedure:
1. Open Cisco Packet Tracer.
2. Add wireless router and devices.
3. Configure SSID and security.
4. Connect devices wirelessly.
5. Test connectivity using ping.
Observation:
Wireless transmission was successful without cables.
Conclusion:
Wireless media provides mobility and flexibility but has interference issues.
`
  },
  {
    title: "EXP 3",
    icon: "🌐",
    code: `Exp no 3
Aim:-
To study and understand the basic components of a mobile (cellular) network and demonstrate their roles in providing mobile communication services.
Objectives
•	To identify major mobile network components
•	To understand the function of each component
•	To study call flow and data communication in a mobile network
•	To demonstrate mobile network architecture using diagrams / simulation
________________________________________
Apparatus / Tools Required
•	Computer / Laptop
•	Cisco Packet Tracer (optional – for network understanding)
•	Mobile phone (for real-time observation)
•	Internet connection
•	Lab manual / PPT
________________________________________
Theory
A mobile network (cellular network) allows wireless communication over large areas by dividing the coverage region into cells. Each cell is served by a Base Station and controlled by the core network.
Main Components of Mobile Network
________________________________________
1️⃣ Mobile Station (MS)
•	User equipment such as mobile phone or smartphone
•	Consists of:
o	Mobile Equipment (ME)
o	SIM card
•	Functions:
o	Voice calls
o	SMS
o	Data services (Internet)
________________________________________
2️⃣ Base Transceiver Station (BTS) / Node B / eNodeB / gNodeB
•	Provides radio communication with mobile users
•	Terminology changes with generation:
o	2G → BTS
o	3G → Node B
o	4G → eNodeB
o	5G → gNodeB
•	Functions:
o	Transmits and receives radio signals
o	Covers a specific geographical area (cell)
________________________________________
3️⃣ Base Station Controller (BSC) / Radio Network Controller (RNC)
•	Controls multiple base stations
•	Functions:
o	Call handover
o	Channel allocation
o	Power control
•	Used mainly in 2G and 3G networks
________________________________________
4️⃣ Mobile Switching Center (MSC)
•	Core network component for voice calls
•	Functions:
o	Call setup and routing
o	Call termination
o	Billing and mobility management
________________________________________
5️⃣ Home Location Register (HLR)
•	Central database of subscribers
•	Stores:
o	User profile
o	Mobile number
o	Services allowed
________________________________________
6️⃣ Visitor Location Register (VLR)
•	Temporary database
•	Stores information of users currently roaming in a network area
________________________________________
7️⃣ Authentication Center (AuC)
•	Provides security and authentication
•	Verifies user identity using SIM credentials
________________________________________
8️⃣ Packet Core (for Data Services)
•	Handles internet and packet data
•	Examples:
o	SGSN, GGSN (3G)
o	EPC (4G)
o	5G Core (5G)
________________________________________
Block Diagram of Mobile Network
Mobile Station
      |
   BTS / NodeB / eNodeB
      |
   BSC / RNC
      |
   MSC / Core Network
      |
 PSTN / Internet
(Draw neatly in exam / practical file)
________________________________________
Procedure / Demonstration Steps
1.	Identify the mobile phone as a Mobile Station.
2.	Observe nearby cell towers (BTS/eNodeB).
3.	Explain how signals travel from:
o	Mobile → Base Station → Core Network
4.	Demonstrate:
o	Voice call flow
o	SMS transmission
o	Mobile data access
5.	(Optional) Use Cisco Packet Tracer to:
o	Create a simple wireless network
o	Connect devices through a simulated core network
6.	Perform ping test or data access to show connectivity.
________________________________________
Observation
•	Mobile phone successfully connects to the network.
•	Voice calls and data services work through base stations.
•	Core network manages routing and authentication.
________________________________________
Conclusion
Mobile networks use a combination of radio access network and core network components to provide seamless communication. Each component plays a vital role in ensuring connectivity, mobility, and security.
`
  },
  {
    title: "EXP 7",
    icon: "🌐",
    images: [router1],
    code: `Router> enable
Router# configure terminal
Router(config)# interface fastethernet 0/1
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit`
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

