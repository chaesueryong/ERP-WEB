import './EmptyBarItem.css';
import plus_bar_icon from '../../../../assets/images/plus-bar-icon.svg'

function EmptyBarItem() {

    return (
        <div className='EmptyBarItem'>

            <div className='ebi-box'>
                <div className='ebi-bar'>
                    <img src={plus_bar_icon} alt='' />
                </div>
            </div>
            <div className='ebi-legend-box'>
                <div className='ebi-legend'>
                </div>
                <div className='ebi-legend-text'>
                    &nbsp;
                </div>
            </div>
        </div>
    
    );
}

export default EmptyBarItem;