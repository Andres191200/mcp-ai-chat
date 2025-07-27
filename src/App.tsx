import Chat from "./components/chat/Chat";
import "./globals.scss";
import styles from "./styles.module.scss";

// const dataBase = db;
function App() {  
  // console.log('db: ', dataBase);
  console.log('env: ', process.env['REACT_APP_FIREBASE_API_KEY']);
  
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
