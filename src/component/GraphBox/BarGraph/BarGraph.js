import './BarGraph.css';
import { Chart, Series, Legend, Grid, CommonAxisSettings} from 'devextreme-react/chart';

function BarGraph({title}) {

    return (
        <div className='BarGraph'>
            <div className='bg-title'>{title}</div>
            <div className='bg-chart-box'>

                <Chart id="chart" dataSource={dataSource}>
                    <Series
                        valueField="oranges"
                        argumentField="day"
                        // name="My oranges"
                        type="bar"
                        color="#ffaa66"
                    />
                    <CommonAxisSettings>
                        <Grid visible={false} />
                    </CommonAxisSettings>
                    <Legend
                        visible={false}
                        verticalAlignment="top"
                        horizontalAlignment="right"
                    />
                </Chart>
            </div>
        </div>
    
    );
}

export default BarGraph;

export const dataSource = [{
    day: '월',
    oranges: 3,
  }, {
    day: '화',
    oranges: 2,
  }, {
    day: '수',
    oranges: 3,
  }, {
    day: '목',
    oranges: 4,
  }, {
    day: '금',
    oranges: 6,
  }, {
    day: '토',
    oranges: 11,
  }, {
    day: '일',
    oranges: 4,
  }];