"use client";

import { useState } from "react";
import style from "./NavBar.module.scss";
import Image from "next/image";

function NavBar() {
  const [value, setValue] = useState<string>("");
  const handleSubmit = () => {};

  return (
    <nav className={style.container}>
      <div className={style.topBar}>
        <div className={style.logo}>
          <p className={style.title}>MaNaS Store</p>
          <p className={style.slogan}>Dress to impress</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for products, brands and more"
            required
            className={style.formInput}
          />
          <Image
            src="/assets/icons/SearchIcon.svg"
            alt="search icon"
            width={30}
            height={30}
          />
        </form>
        <div className={style.cartProfile}>
          <Image
            src="/assets/icons/Profile.svg"
            alt="search icon"
            width={30}
            height={30}
          />
          <Image
            src="/assets/icons/Cart.svg"
            alt="search icon"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className={style.mobileForm}>
        <form onSubmit={handleSubmit}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for products, brands and more"
            required
            className={style.formInput}
          />
          <Image
            src="/assets/icons/SearchIcon.svg"
            alt="search icon"
            width={30}
            height={30}
          />
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
