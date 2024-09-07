import React from "react";
import style from '../assessts/style/nav.module.scss'
import Link from "next/link";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <div className={`${style.button} ${style.thap_ha_noi}`}>
        <Link href="/thap-ha-noi"> Tháp Hà Nội</Link>
      </div>

      <div className={`${style.button} ${style.n_quan_hau}`}>
        <Link href="/n-quan-hau"> N Quân Hậu</Link>
      </div>
    </nav>
  );
}

export default Nav;
