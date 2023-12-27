import './SummaryItem.css';
import increase_icon from '../../assets/images/increase-icon.svg';
import descent_icon from '../../assets/images/descent-icon.svg';
import no_change_icon from '../../assets/images/no-change-icon.svg';
import trophy_icon from '../../assets/images/trophy-icon.svg';

function SummaryItem({type, percent, today, lastWeek, achievementRate}) {


    return (
        <div className='SummaryItem'>
            <div className='summaryitem-top'>
                <img src={boxType[type].src} alt='' />
                {
                    type === 3 ?
                    <div className='achievement'>목표달성률</div>
                    :
                    <div className={`summaryitem-inner ${boxType[type].color}`}>
                        <div className='percent'>{percent}</div>
                        <div className='compare-standard'>지난주 대비</div>
                    </div>
                }
            </div>
            <div className='summaryitem-bottom'>
                <div>
                    <div className='summaryitem-bottom-text-1'>{boxType[type].text}</div>
                    <div className='summaryitem-bottom-text-2'>{today}</div>
                    <div className='summaryitem-bottom-text-3' style={type === 3 ? {visibility: 'hidden'} : {}}>(지난주 {lastWeek} 원)</div>
                </div>
                <div className='achievement-rate'>
                    {achievementRate}
                </div>
            </div>
        </div>
    
    );
}

export default SummaryItem;


const boxType = {
    0: {
        src: increase_icon,
        color: 'blue',
        text: '총 매출 (원)',
    },
    1: {
        src: descent_icon,
        color: 'red',
        text: '매출 건수 (개)',
    },
    2: {
        src: no_change_icon,
        color: 'gray',
        text: '환불 금액(원)',
    },
    3: {
        src: trophy_icon,
        color: 'black',
        text: '목표금액',
    },
}
