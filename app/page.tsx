"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthentication = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        router.push("/home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router]);

  return <div className={styles.page}></div>;
}