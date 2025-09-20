import { useEffect, useRef } from "react";
import Chat from "./components/chat/Chat";
import "./globals.scss";
import styles from "./styles.module.scss";
import gsap from 'gsap';
import axios from "axios";

function App() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('APIURL: ', apiUrl);
    axios.post(`${apiUrl}/api/login`, {
      "username": "grava",
      "password": "grava",
    }).then((res) => console.log('res from api login: ', res.data.token));


    if (titleRef.current) {
      const letteredTitle = (titleRef.current.textContent || "").split("");
      titleRef.current.innerHTML = "";

      letteredTitle.forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        span.style.filter = "blur(20px)"
        titleRef.current!.appendChild(span);
      });

      gsap.to(titleRef.current!.children, {
        opacity: 1,
        duration: 1,
        ease: "none",
        filter: "blur(0px)",
        stagger: 0.02,
      });


    }
  }, []);

  return (
    <div className={styles.mainApp}>
      <div className={styles.mainContent}>
        <header>
          <div className={styles.titleContainer}>
            <h1 ref={titleRef}>Chat app with MCP</h1>
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
