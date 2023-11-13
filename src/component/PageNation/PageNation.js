import './PageNation.css';
import right_arrow from '../../assets/images/right-arrow-icon.svg';
import rightx2_arrow from '../../assets/images/rightx2-arrow-icon.svg';

function PageNation({first, last, empty, totalPage, number, handlePageClick}) {
    // console.log(totalPage, number)

    const renderPage = () => {
        const arr = [];

        for(let i = 0; i < totalPage; i++) {
            arr.push(<div key={i} className={number === i ? 'page-box page-box-check': 'page-box'}
                onClick={() => {
                    handlePageClick(i);
                }}
            >{i+1}</div>)
        }

        return arr;
    }

    return (
        <div className="PageNation">
            <div className='arrow-box' onClick={() => {
                    handlePageClick(0);
                }} style={first ? {display: 'none'} : {display: 'flex'}}>
                <img className='left-arrow arrow' src={rightx2_arrow} />
            </div>
            <div className='arrow-box' onClick={() => {
                    handlePageClick(number - 1);
                }} style={first ? {display: 'none'} : {display: 'flex'}}>
                <img className='left-arrow arrow' src={right_arrow} />
            </div>

            {renderPage()}

            <div className='arrow-box' onClick={() => {
                    handlePageClick(number + 1);
                }} style={last ? {display: 'none'} : {display: 'flex'}}>
                <img className='arrow' src={right_arrow} />
            </div>
            <div className='arrow-box' onClick={() => {
                    handlePageClick(totalPage - 1);
                }} style={last ? {display: 'none'} : {display: 'flex'}}>
                <img className='arrow' src={rightx2_arrow} />
            </div>
        </div>
    );
}

export default PageNation;
