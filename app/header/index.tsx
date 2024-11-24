"use client";

import { Menu, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence, motion } from "motion/react";
import { links } from "./links";
import { blur, translate } from "./anim";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const getChars = (word: string) => {
    let chars: React.ReactNode[] = [];
    word.split("").forEach((char, index) => {
      chars.push(
        <motion.span
          key={char + index}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          custom={[index * 0.02, index * 0.01]}
          transition={{ duration: 0.5 }}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div>
      <div
        className={`flex items-center justify-between px-8 py-2 bg-[#ffe3cc] text-black border-b-[1px] border-black delay-0 duration-300 ${
          isActive && "border-transparent"
        }`}
      >
        <Link href="/">David Zhang</Link>

        <div
          className="w-[85px] h-[30px] flex justify-between items-center cursor-pointer"
          onClick={() => setIsActive((prev) => !prev)}
        >
          <div className="h-[20px] aspect-square flex flex-col justify-center gap-2 relative">
            <div
              className={`${styles.burgerDefault} ${
                isActive ? styles.burgerActiveLeft : ""
              }`}
            />
            <div
              className={`${styles.burgerDefault} ${
                isActive ? styles.burgerActiveRight : ""
              }`}
            />
          </div>
          <div className="h-full w-[60px] relative">
            <span
              className={`${styles.menuItem} ${
                isActive ? styles.disabledMenu : styles.activeMenu
              }`}
            >
              Menu
            </span>
            <span
              className={`${styles.menuItem} ${
                isActive ? styles.activeMenu : styles.disabledMenu
              }`}
            >
              Close
            </span>
          </div>
        </div>

        <div
          className="flex items-center gap-4"
          style={{ transitionDelay: "5s" }}
        >
          <p className={`transition ${isActive ? styles.disabledMenu : ""}`}>
            Shop
          </p>
          <div
            className={`flex items-center gap-2 transition ${
              isActive ? styles.disabledMenu : ""
            }`}
          >
            <ShoppingBasket />
            <p>Cart</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            key="menu"
            initial={{ opacity: 0.2, height: 0 }}
            animate={{ opacity: 1, height: "300px" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className=" w-full bg-[#ffe3cc] border-b-[1px] border-black text-6xl flex flex-col p-6 gap-4"
          >
            <div className="flex gap-8">
              {links.slice(0, 3).map((link) => (
                <Link href="/" key={link}>
                  <motion.div
                    key={link}
                    onMouseOver={() => setActiveLink(link)}
                    onMouseLeave={() => setActiveLink(null)}
                    variants={blur}
                    animate={
                      activeLink
                        ? activeLink === link
                          ? "closed"
                          : "open"
                        : "initial"
                    }
                  >
                    {getChars(link)}
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="flex gap-8">
              {links.slice(3, 5).map((link) => (
                <Link href="/" key={link}>
                  <motion.div
                    key={link}
                    onMouseOver={() => setActiveLink(link)}
                    onMouseLeave={() => setActiveLink(null)}
                    variants={blur}
                    animate={
                      activeLink
                        ? activeLink === link
                          ? "closed"
                          : "open"
                        : "initial"
                    }
                  >
                    {isActive && getChars(link)}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
