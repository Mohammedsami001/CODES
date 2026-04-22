import React from 'react';
import SnippetCard from './components/SnippetCard';

const snippets = [
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
);`
  },
  {
    title: "MainBoard Class Program",
    icon: "🎮",
    code: `public class MainBoard {
    private List<Card> cards;
    
    public void setupGame() {
        // Initialize the game board
        cards = new ArrayList<>();
        // Add game logic here
    }
}`
  },
  {
    title: "WindowCard Class Program",
    icon: "🪟",
    code: `public class WindowCard extends JFrame {
    public WindowCard() {
        setTitle("Game Interface");
        setSize(800, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
}`
  },
  {
    title: "ScoreCard Program",
    icon: "🏆",
    code: `public class ScoreCard {
    private int score;
    
    public void addPoints(int p) {
        score += p;
    }
    
    public int getScore() {
        return score;
    }
}`
  },
  {
    title: "Message Card Program",
    icon: "💬",
    code: `public class MessageCard {
    public void showMessage(String msg) {
        System.out.println("Notification: " + msg);
    }
}`
  },
  {
    title: "Game Controller",
    icon: "🕹️",
    code: `public class GameController {
    public void startGame() {
        System.out.println("Game started!");
    }
    
    public void pauseGame() {
        // Pause logic
    }
}`
  },
  {
    title: "Card Validator",
    icon: "✅",
    code: `public class CardValidator {
    public boolean isValid(Card card) {
        return card != null && card.getId() > 0;
    }
}`
  },
  {
    title: "Card Generator",
    icon: "⚡",
    code: `public class CardGenerator {
    public Card createCard(String type) {
        return new Card(type);
    }
}`
  },
  {
    title: "Card Shuffler",
    icon: "🔀",
    code: `public class CardShuffler {
    public void shuffle(List<Card> deck) {
        Collections.shuffle(deck);
    }
}`
  },
  {
    title: "Card Deck",
    icon: "🃏",
    code: `public class CardDeck {
    private Stack<Card> deck;
    
    public Card draw() {
        return deck.pop();
    }
}`
  },
  {
    title: "Player Class",
    icon: "👤",
    code: `public class Player {
    private String username;
    private int level;
    
    public void levelUp() {
        level++;
    }
}`
  },
  {
    title: "Game Logic",
    icon: "🧠",
    code: `public class GameLogic {
    public void processMove() {
        // Core game mechanics
    }
}`
  }
];

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Code Snippet Gallery</h1>
        <p>A professional collection of Java components and game logic snippets. Click copy to use them in your project.</p>
      </header>

      <main className="snippet-grid">
        {snippets.map((snippet, index) => (
          <SnippetCard 
            key={index}
            title={snippet.title}
            icon={snippet.icon}
            code={snippet.code}
          />
        ))}
      </main>

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
        <p>&copy; 2026 Snippet Gallery. Designed for professionals.</p>
      </footer>
    </div>
  );
}

export default App;
