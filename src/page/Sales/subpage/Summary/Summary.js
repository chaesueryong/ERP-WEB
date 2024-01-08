import BarGraph from '../../../../component/GraphBox/BarGraph/BarGraph';
import LineGraph from '../../../../component/GraphBox/LineGraph/LineGraph';
import SummaryItem from '../../../../component/SummaryItem/SummaryItem';
import './Summary.css';

function Summary() {

  return (
    <div className="Summary">
        <div className='item'>
          <SummaryItem type={0} percent='+12%' today={200000000} lastWeek={180000000} />
        </div>
        <div className='item'>
          <SummaryItem type={1} percent='-12%' today={200000000} lastWeek={180000000} />
        </div>
        <div className='item'>
          <SummaryItem type={2} percent='변동 없음' today={200000000} lastWeek={180000000} />
        </div>
        <div className='item'>
          <SummaryItem type={1} percent='+12%' today={200000000} lastWeek={180000000} />
        </div>
        <div className='item'>
          <SummaryItem type={3} today={200000000} lastWeek={180000000} achievementRate='100%' />
        </div>

        <div className='item'>
          <LineGraph title={'매출 그래프'} />
        </div>
        <div className='item'>
          <BarGraph title={'스토어 별 매출 비교'} type={1} />
        </div>        

        <div className='item'>
          <LineGraph title={'매출 건수 그래프'} />
        </div>
        <div className='item'>
          <BarGraph title={'요일 별 매출 비교'} type={0} />
        </div>
      
    </div>
  );
}

export default Summary;