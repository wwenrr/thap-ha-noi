"use client";
import { useState, useEffect } from 'react';
import style from './style.module.scss'
import { resolve } from 'path';
import { rejects } from 'assert';
import replay from '../../assessts/img/replay.png'
import Image from 'next/image';
import stop from '../../assessts/img/stop.png'

import play from '../../assessts/img/play.png'

let [ring, tower]: [string, string] = ['', '']
let arr: any = [];
let setArr: any = []

const Page = () => {
    const [clicked, setClicked] = useState(false);
    const [size, setSize] = useState<number | string>('');

    const [enter, setE] = useState<boolean>(false)
    const [tower1, set1] = useState<Array<number>>([])
    const [tower2, set2] = useState<Array<number>>([])
    const [tower3, set3] = useState<Array<number>>([])

    const [step, setStep] = useState<number>(0)

    const [tower_select, setTowerSelect] = useState(false)



    useEffect(() => {
        if (size !== '') {
            if (!(typeof size === 'number' && (size >= 3 && size <= 7))) setSize('')
            else if (typeof size === 'number' && (size >= 3 && size <= 7)) {
                const temp = [...tower1];
                for (let i: number = 0; i < size; i++) {
                    temp.push(i);
                }
                set1(temp)
                setE(true);
            }
        }
    }, [size])

    useEffect(() => {
        arr = [[...tower1], [...tower2], [...tower3]]
    }, [])

    useEffect(() => {
        arr = [[...tower1], [...tower2], [...tower3]];
        // console.log("arr update: ", arr, tower1, tower2, tower3)
        // console.log(tower1, tower2, tower3)
    }, [tower1, tower2, tower3]);

    const changeRing = (from: string, to: string) => {
        console.log('changRing from',from,'to',to)
        tower = '...'
        let temp_1 = [...arr[parseInt(from,10)]];
        let temp_2 = [...arr[to]];

        let temp = temp_1.pop()

        let comp = temp_2[temp_2.length - 1]
        if (temp_2.length > 0 && temp_2[temp_2.length - 1] > temp) {
            console.log("Err")
            // ring = '';
            tower = '';
            // setTowerSelect(false)
            return
        }
        // console.log(temp, comp)

        temp_2.push(temp);
        // console.log("debug: ",temp_1, temp_2)

        if (from === '0') set1(temp_1);
        else if (from === '1') set2(temp_1);
        else set3(temp_1);

        if (to === '0') set1(temp_2);
        else if (to === '1') set2(temp_2);
        else set3(temp_2);


        setStep(step => step + 1)
        // console.log('[', ring, to, ']')

        setTowerSelect(false)
        ring = '';
        tower = '';
    }

    const handleClick = (e: any) => {
        let id = e.target.id
        console.log('[', ring, tower, ']')

        if (id.length < 4) {
            const last = e.target.id[e.target.id.length - 1]
            if (last === '0' || last === '1' || last === '2' || last === '3' || last === '4' || last === '5' || last === '6' || last === '7') {
                const par_id: number = e.target.parentElement.id[e.target.parentElement.id.length - 1]
                const temp = arr[par_id - 1]

                // console.log("arr", arr)
                // console.log("par_id", par_id-1)
                console.log(temp, parseInt(last, 10))
                if (temp[temp.length - 1] === parseInt(last, 10)) {
                    ring = (par_id - 1).toString();
                    setTowerSelect(true)
                }
                // console.log("cập nhật ring:", ring)
            }
            else console.log("Chọn sai vật thể / Nên chọn: Vòng", "id = ", id, "last=", last)
        }
        else if (ring !== '' && tower === '') {
            if (id === 'tower_1') {
                if (ring === '0') {
                    console.log("err??")
                }
                else changeRing(ring, '0');
            }
            else if (id === 'tower_2') {
                if (ring === '1') console.log("err??")
                else changeRing(ring, '1');
            }
            else if (id === 'tower_3') {
                if (ring === '2') console.log("err??")
                else changeRing(ring, '2');
            }
            else console.log("Chọn sai vật thể / Nên chọn: Tháp, id=", id)
        }
        else {
            console.log("Handeling, plz wait")
        }

    }

    const handleReplay = () => {
        setSize('');
        set1([])
        set2([])
        set3([])
        setE(false)
        setStep(0)
    }

    const [playing, setPlay] = useState<boolean>(false)
    const [botArr, setArr] = useState([])

    useEffect(() => {
        if(botArr.length > 0) {
            setTimeout(() => {
                const temp_arr = [...botArr]
                const temp:any = temp_arr.shift()
                changeRing(temp.from.toString(), temp.to.toString());

                // console.log(temp.from, temp.to)
                setArr(preData => temp_arr)
            },500)
            // console.log('finish')
        }
        else setPlay(false)
    }, [botArr])

    //hehe

    const handlePlaying = () => {
        setPlay(true)
        let n: number = parseInt(size.toString(), 10);
        console.log('size=', n)
        const temp:any = []

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const chuyen = (n: number, a: number, b: number, c: number) => {
            if (n === 1) {
                console.log(a, '->', c);
                temp.push({from: a, to: c})
                
            } else {
                chuyen(n - 1, a, c, b);
                chuyen(1, a, b, c);
                chuyen(n - 1, b, a, c);
            }
        };

        chuyen(n, 0, 1, 2)
        setArr(temp)
    }

    return (
        <div className={style.main}>
            <div className={style.cta}>
                <div className="box">
                    <label>Số Lượng Đĩa: </label>
                    {size === '' && <input maxLength={1} type="number" value={size} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSize(parseInt(e.target.value) || 0);
                    }}
                        disabled={size !== ''}
                        placeholder='Nhập giá trị từ 3 dến 7'
                    />}
                    {enter && <label style={{ color: 'blue' }}>&nbsp; {size} &nbsp;</label>}
                    {enter && <label>  / </label>}
                    {enter && <label style={{ color: 'red' }}>  &nbsp; Step: {step} (min step = {2 ** (parseInt(size as string, 10)) - 1})</label>}
                    {enter && <button className={style.replay} title="Chơi lại" onClick={handleReplay}>
                        {<Image src={replay} alt="" />}
                    </button>}
                </div>
                {<button className={style.auto} title='Tự động giải'>
                    {enter && !playing && <Image src={play} alt="" onClick={step===0 ? handlePlaying : () => alert('Nah không bật được AI giữa chừng')} />}
                    {enter && playing && <Image src={stop} alt="" title='Không thể dừng khi AI đang chạy' onClick={() => alert("Không thể dừng khi AI đang chạy")} />}
                </button>}
                {/* <br></br> */}
            </div>
            <div className={style.game}>
                <div className={`${style.tower} ${style.tower_1}`} onClick={tower_select ? handleClick : undefined} id='tower_1' >
                    {tower1.map((item, index) => (
                        <div key={index} className={`${style.layer} ${style[`layer${item}`]}`}
                            style={{ bottom: `${index * 2.5}vw` }}
                            onClick={handleClick}
                            id={`0-${item}`}
                        />

                    ))}
                </div>
                <div className={`${style.tower} ${style.tower_2}`} onClick={tower_select ? handleClick : undefined} id='tower_2'>
                    {tower2.map((item, index) => (
                        <div key={index} className={`${style.layer} ${style[`layer${item}`]}`}
                            style={{ bottom: `${index * 2.5}vw` }}
                            onClick={handleClick}
                            id={`1-${item}`}
                        />
                    ))}
                </div>
                <div className={`${style.tower} ${style.tower_3}`} onClick={tower_select ? handleClick : undefined} id='tower_3'>
                    {tower3.map((item, index) => (
                        <div key={index} className={`${style.layer} ${style[`layer${item}`]}`}
                            style={{ bottom: `${index * 2.5}vw` }}
                            onClick={handleClick}
                            id={`2-${item}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page