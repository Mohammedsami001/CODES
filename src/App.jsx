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
    icon: "💻",
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
    title: "Child Process Creation (fork demonstration)",
    icon: "💻",
    code: `#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid;

    pid = fork();  // Create child process

    if (pid < 0) {
        printf("Fork failed");
    } 
    else if (pid == 0) {
        printf("This is child process");
    } 
    else {
        printf("This is parent process");
    }

    return 0;
}`
  },
  {
    title: "FIFO Page Replacement Algorithm",
    icon: "💻",
    code: `#include <stdio.h>

#define FRAMES 3

int main() {
    int pages[20], frame[FRAMES];
    int n, i, j, k = 0, fault = 0, found;

    printf("Enter number of pages: ");
    scanf("%d", &n);

    printf("Enter page reference string: ");
    for (i = 0; i < n; i++) {
        scanf("%d", &pages[i]);
    }

    // Initialize frames to -1 (empty)
    for (i = 0; i < FRAMES; i++) {
        frame[i] = -1;
    }

    // FIFO Page Replacement Logic
    for (i = 0; i < n; i++) {
        found = 0;

        // Check if page is already in frame
        for (j = 0; j < FRAMES; j++) {
            if (frame[j] == pages[i]) {
                found = 1;
                break;
            }
        }

        // If not found → page fault
        if (!found) {
            frame[k] = pages[i];       // Replace using FIFO
            k = (k + 1) % FRAMES;      // Circular increment
            fault++;
        }
    }

    printf("Page Faults = %d", fault);

    return 0;
}`
  },
  {
    title: "Least Recently Used (LRU) Page Replacement Algorithm",
    icon: "💻",
    code: `#include <stdio.h>

#define FRAMES 3

int main() {
    int pages[20], frame[FRAMES], time[FRAMES];
    int n, i, j, pos, fault = 0, found, least;

    printf("Enter number of pages: ");
    scanf("%d", &n);

    printf("Enter page reference string: ");
    for (i = 0; i < n; i++) {
        scanf("%d", &pages[i]);
    }

    // Initialize frames and time
    for (i = 0; i < FRAMES; i++) {
        frame[i] = -1;
        time[i] = 0;
    }

    // LRU Page Replacement Logic
    for (i = 0; i < n; i++) {
        found = 0;

        // Check if page is already in frame
        for (j = 0; j < FRAMES; j++) {
            if (frame[j] == pages[i]) {
                found = 1;
                time[j] = i;   // Update recent use
                break;
            }
        }

        // If page not found → page fault
        if (!found) {
            least = 0;

            // Find least recently used page
            for (j = 1; j < FRAMES; j++) {
                if (time[j] < time[least]) {
                    least = j;
                }
            }

            frame[least] = pages[i];
            time[least] = i;
            fault++;
        }
    }

    printf("Page Faults = %d", fault);

    return 0;
}`
  },
  {
    title: "Memory Allocation (First Fit, Best Fit, Worst Fit)",
    icon: "💻",
    code: `#include <stdio.h>

int main() {
    int block[10], process[10], allocation[10];
    int i, j, nb, np;

    printf("Enter number of blocks: ");
    scanf("%d", &nb);

    printf("Enter block sizes: ");
    for (i = 0; i < nb; i++) {
        scanf("%d", &block[i]);
    }

    printf("Enter number of processes: ");
    scanf("%d", &np);

    printf("Enter process sizes: ");
    for (i = 0; i < np; i++) {
        scanf("%d", &process[i]);
    }

    // Initialize allocation array
    for (i = 0; i < np; i++) {
        allocation[i] = -1;
    }

    // First Fit Allocation
    for (i = 0; i < np; i++) {
        for (j = 0; j < nb; j++) {
            if (block[j] >= process[i]) {
                allocation[i] = j;          // Allocate block
                block[j] -= process[i];     // Reduce block size
                break;
            }
        }
    }

    // Display result
    printf("Process No	Block No");
    for (i = 0; i < np; i++) {
        printf("%d		", i + 1);

        if (allocation[i] != -1) {
            printf("%d", allocation[i] + 1);
        } else {
            printf("Not Allocated");
        }
    }

    return 0;
}
  // example output to write like this
  // Enter number of blocks: 2
  // Enter block sizes: 555 333
  // Enter number of processes: 3
  // Enter process sizes: 3 5 6
  // Process No	Block No1		12		13		1 
    `
  },
  { 
    title: "FCFS Scheduling Algorithm",
    icon: "💻",
    code: `#include <stdio.h>

int main() {
    int bt[10], wt[10], tat[10];
    int n, i;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    printf("Enter burst times:");
    for (i = 0; i < n; i++) {
        scanf("%d", &bt[i]);
    }

    // Waiting time calculation
    wt[0] = 0;
    for (i = 1; i < n; i++) {
        wt[i] = wt[i - 1] + bt[i - 1];
    }

    // Turnaround time calculation
    for (i = 0; i < n; i++) {
        tat[i] = wt[i] + bt[i];
    }

    // Display output
    printf("Process	WT	TAT");
    for (i = 0; i < n; i++) {
        printf("%d	%d	%d", i + 1, wt[i], tat[i]);
    }

    return 0;
}` 
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('DBMS');

  const currentSnippets = activeTab === 'DBMS' ? dbmsSnippets : osSnippets;

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
            className={`nav-btn ${activeTab === 'OS' ? 'active' : ''}`}
            onClick={() => setActiveTab('OS')}
          >
            OS 
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
        <p>&copy; 2026. Designed by THE NOMADSTALLION.</p>
      </footer>
    </div>
  );
}

export default App;
