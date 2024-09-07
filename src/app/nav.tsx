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
        <a href="/thap-ha-noi/n-quan-hau"> N Quân Hậu</a>
      </div>
    </nav>
  );
}

export default Nav;
