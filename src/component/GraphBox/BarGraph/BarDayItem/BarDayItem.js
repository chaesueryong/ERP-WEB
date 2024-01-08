import { useState } from 'react';
import './BarDayItem.css';

function BarDayItem({data, topValue}) {
    const [hover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true)
    }

    const mouseOut = () => {
        setHover(false)
    }

    return (
        <div className='BarDayItem'>

            <div className='bdi-box' onMouseEnter={mouseEnter} onMouseLeave={mouseOut}>
                <div className='bdi-bar' style={{height: data.value / topValue * 100+'%'}}>
                    <div className='bdi-hover' style={hover ? {display: 'flex'} : {display: 'none'}}>
                        <div className='bdi-hover-date'>2023/01/17</div>

                        <div className='bdi-hover-price'>1,000,000 원</div>
                        <div className='bdi-hover-late-price'>지난주(10,000,000 원)</div>

                        <div className='bdi-hover-percent-box'>
                            <div className='bdi-hover-box'></div>
                            <div className='bdi-hover-percent'>+12%</div>
                        </div>
                    </div>
                </div>
                <div className='bdi-legend-text'>{data.legend}</div>
            </div>
        </div>
    
    );
}

export default BarDayItem;