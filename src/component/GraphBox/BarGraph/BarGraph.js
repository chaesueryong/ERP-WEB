import './BarGraph.css';
import BarDayItem from './BarDayItem/BarDayItem';
import BarStoreItem from './BarStoreItem/BarStoreItem';
import EmptyBarItem from './EmptyBarItem/EmptyBarItem';

function BarGraph({title, type}) {

    return (
        <div className='BarGraph'>
            <div className='bg-title'>{title}</div>
            <div className='bg-chart-box'>
              {
                type === 0 ? dateSource.map((e, i)=> 
                  (
                    <BarDayItem key={i} data={e} topValue={11} />
                  )) : <></>
              }{
                type === 1 ? storeSource.map((e, i)=> 
                  (
                    <BarStoreItem key={i} data={e} topValue={11} />
                  )) : <></>
              }{
                type === 1 ? <EmptyBarItem  /> : <></>
              }
            </div>
        </div>
    
    );
}

export default BarGraph;

export const dateSource = [{
    legend : '월',
    value: 3,
  }, {
    legend : '화',
    value: 2,
  }, {
    legend : '수',
    value: 3,
  }, {
    legend : '목',
    value: 4,
  }, {
    legend : '금',
    value: 6,
  }, {
    legend : '토',
    value: 11,
  }, {
    legend : '일',
    value: 4,
  }];
  
  export const storeSource = [{
    legend : '한남스토어',
    value: 3,
    color: '#FA5252'
  }, {
    legend : '성수 스토어',
    value: 2,
    color: '#FAB005'

  }, {
    legend : '온라인 스토어',
    value: 3,
    color: '#20C997'

  }, {
    legend : '팝업 스토어',
    value: 4,
    color: '#228BE6'

  }];