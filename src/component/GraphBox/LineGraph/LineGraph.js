import { useState } from 'react';
import './LineGraph.css';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    CommonAxisSettings,
    Grid,
    Export,
    Legend,
    Margin,
    Tooltip,
    Label,
    Format,
    Point
  } from 'devextreme-react/chart';

function LineGraph({title}) {
    const [tapList, setTapList] = useState([
        {name: '전체', checked: true},
        {name: '온라인', checked: false},
        {name: '오프라인', checked: false},
      ]);
    
      const [dateType, setDateType] = useState([
        {name: '일별', value: 'day', checked: true},
        {name: '주차별', value: 'week', checked: false},
        {name: '월별', value: 'month', checked: false},
        {name: '연도별', value: 'year', checked: false},
      ]);

      const handleClickTap = (index, type) => {
        switch(type){
          case 'tap':
            setTapList(tapList.map((e, i) => {
              if(i === index){
                return {
                  ...e,
                  checked: true
                }
              }else{
                return {
                  ...e,
                  checked: false
                }
              }
            }))
            break;
          case 'date': 
            setDateType(dateType.map((e, i) => {
              if(i === index){
                return {
                  ...e,
                  checked: true
                }
              }else{
                return {
                  ...e,
                  checked: false
                }
              }
            }))
            break;  
            default:
              break;
        }
      }

    return (
        <div className='LineGraph'>
            <div className='lf-title'>{title}</div>
            <div className='lf-select-box'>
                <div className='line-graph-switch-box'>
                {
                    tapList.map((e, i) => (
                        <div key={i} className='lf-switch' onClick={() => handleClickTap(i, 'tap')}>
                            <div className='lf-switch-title' style={e.checked ? { color: 'black'} : { color: '#ADB5BD'}}>{e.name}</div>
                            <div className='lf-switch-under-bar' style={e.checked ? {backgroundColor: 'black'} : {backgroundColor: 'white'}}></div>
                        </div>
                    ))
                }
                </div>
                <div className='lf-date-list-box'>
                    {
                        dateType.map((e, i) => (
                            <div key={i} onClick={() => handleClickTap(i, 'date')} style={e.checked ? {color: 'white', backgroundColor: 'black'} : {color: 'black', backgroundColor: 'white'}}>
                                {e.name}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>

            </div>

            <div className='lg-chart-box'>
                <Chart
                    palette="Violet"
                    dataSource={sharingStatisticsInfo}
                >
                    <CommonSeriesSettings
                        argumentField="day"
                        type='splinearea'
                        hoverMode="includePoints"
                    >
                        <Point hoverMode="allArgumentPoints" />
                    </CommonSeriesSettings>
                    <CommonAxisSettings>
                        <Grid visible={false} />
                    </CommonAxisSettings>
                    <Series
                        key={dateType.filter(e => e.checked)[0].value}
                        valueField={dateType.filter(e => e.checked)[0].value}
                        name={dateType.filter(e => e.checked)[0].value} 
                    />
                    <ArgumentAxis
                    allowDecimals={false}
                    axisDivisionFactor={60}
                    >
                        <Label>
                            <Format type="decimal" />
                        </Label>
                    </ArgumentAxis>
                    <Legend
                        visible={false}
                        verticalAlignment="top"
                        horizontalAlignment="right"
                    />
                    <Tooltip enabled={true} />
                </Chart>
            </div>
        </div>
    );
}

export default LineGraph;
  
export const sharingStatisticsInfo = [{
    day: 500,
    week: 263,
    month: 9,
    year: 1,
  }, {
    day: 1500,
    week: 169,
    month: 61,
    year: 7,
  }, {
    day: 2001,
    week: 57,
    month: 157,
    year: 45,
  }, {
    day: 1000,
    week: 100,
    month: 121,
    year: 211,
  }, {
    day: 850,
    mmp: 97,
    month: 39,
    year: 382,
  }, {
    day: 1500,
    mmp: 83,
    month: 3,
    year: 437,
  }];