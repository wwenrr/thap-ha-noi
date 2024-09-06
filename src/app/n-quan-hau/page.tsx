"use client";
import React, { useEffect, useState } from "react";
import style from './style.module.scss'

const Main = () => {
    const [s, setS] = useState(false)

    useEffect(() => {
        console.log(s)
    }, [s])

    return (
        // ${s ? style.animate : ''}
        <div className={style.main}>
            <div className={style.form}>
                <div className={`${s ? style.animate : ''}`}>
                    <div className={`${style.user}`}>
                        <label>
                            User &nbsp;
                            <input type="text" />
                        </label>
                    </div>

                    <div className={`${style.pass}`}>
                        <label>
                            Pass &nbsp;
                            <input type="password" />
                        </label>
                    </div>
                </div>

                <div className={style.button}>
                    <button onClick={() => { setS(s => !s) }}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Main;

