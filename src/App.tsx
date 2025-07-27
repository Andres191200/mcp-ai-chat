import Chat from "./components/chat/Chat";
import "./globals.scss";
import styles from "./styles.module.scss";

function App() {  
  return (
    <div className={styles.mainApp}>
      <div className={styles.mainContent}>
        <header>
          <div className={styles.titleContainer}>
            <h1>Chat app with MCP</h1>
          </div>
        </header>
        <div className={styles.body}>
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
