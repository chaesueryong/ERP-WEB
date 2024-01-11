import { useState } from 'react';
import './BarStoreItem.css';

function BarStoreItem({data, topValue}) {
    const [hover, setHover] = useState(false);

    const mouseEnter = () => {
        setHover(true)
    }

    const mouseOut = () => {
        setHover(false)
    }

    return (
        <div className='BarStoreItem'>

            <div className='bsi-box' onMouseEnter={mouseEnter} onMouseLeave={mouseOut}>
                <div className='bsi-bar' style={{height: data.value / topValue * 100+'%', backgroundColor: data.color}}>
                    <div className='bsi-hover' style={hover ? {display: 'flex'} : {display: 'none'}}>
                        <div className='bsi-hover-date'>2023/01/17</div>

                        <div className='bsi-hover-price'>1,000,000 원</div>
                        <div className='bsi-hover-late-price'>지난주(10,000,000 원)</div>

                        <div className='bsi-hover-percent-box'>
                            <div className='bsi-hover-box'></div>
                            <div className='bsi-hover-percent'>+12%</div>
                        </div>
                    </div>

                    
                </div>
            </div>
            <div className='bsi-legend-box'>
                <div className='bsi-legend' style={{backgroundColor: data.color}}>
                </div>
                <div className='bsi-legend-text'>
                    {data.legend}
                </div>
            </div>
        </div>
    
    );
}

export default BarStoreItem;