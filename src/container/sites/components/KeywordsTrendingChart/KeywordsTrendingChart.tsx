import { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { useAppSelector } from '@/api/store'

import { getComputedStyleValue } from '@/utils/helper'

import './KeywordsTrendingChart.scss'

type ChartData = {
  dates: string[]
  values: number[]
}

const KeywordsTrendingChart: React.FC = () => {
  const borderColorRef = useRef<string>('')
  const chartRef = useRef<ReactECharts>(null)
  const colorCommonMainRef = useRef<string>('')
  const descriptionColorMainRef = useRef<string>('')
  const [typeSelection, setTypeSelection] = useState<'traffic' | 'ranking'>('ranking')
  const [durationSelection, setDurationSelection] = useState<7 | 30 | 365>(7)

  const [data, setData] = useState<ChartData>({
    dates: [],
    values: [],
  })

  const theme = useAppSelector((state) => state.auth.theme)

  let colorCommonMain, descriptionColorMain, borderColor

  useEffect(() => {
    const fetchData = () => {
      let fetchedData: ChartData = { dates: [], values: [] }
      switch (durationSelection) {
        case 7:
          fetchedData = {
            dates: ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05'],
            values: [10, 20, 15, 30, 25],
          }
          break
        case 30:
          fetchedData = {
            dates: [
              '2024-06-01',
              '2024-06-02',
              '2024-06-03',
              '2024-06-04',
              '2024-06-05',
              '2024-06-06',
              '2024-06-07',
              '2024-06-08',
              '2024-06-09',
              '2024-06-10',
              '2024-06-11',
              '2024-06-12',
              '2024-06-13',
              '2024-06-14',
              '2024-06-15',
              '2024-06-16',
              '2024-06-17',
              '2024-06-18',
              '2024-06-19',
              '2024-06-20',
              '2024-06-21',
              '2024-06-22',
              '2024-06-23',
              '2024-06-24',
              '2024-06-25',
              '2024-06-26',
              '2024-06-27',
              '2024-06-28',
              '2024-06-29',
              '2024-06-30',
            ],
            values: [15, 25, 20, 35, 30, 22, 28, 19, 32, 26, 18, 24, 21, 34, 29, 23, 27, 17, 31, 28, 16, 26, 20, 33, 27, 21, 29, 19, 30, 25],
          }
          break
        case 365:
          fetchedData = {
            dates: [
              '2023-01-01',
              '2023-02-01',
              '2023-03-01',
              '2023-04-01',
              '2023-05-01',
              '2023-06-01',
              '2023-07-01',
              '2023-08-01',
              '2023-09-01',
              '2023-10-01',
              '2023-11-01',
              '2023-12-01',
            ],
            values: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
          }
          break
        default:
          fetchedData = {
            dates: [],
            values: [],
          }
          break
      }
      setData(fetchedData)
    }

    fetchData()
  }, [durationSelection])

  useEffect(() => {
    const appContainer = document.querySelector('.app-container') as HTMLElement
    colorCommonMainRef.current = getComputedStyleValue(appContainer, '--color-common-main')
    descriptionColorMainRef.current = getComputedStyleValue(appContainer, '--text-description-color')
    borderColorRef.current = getComputedStyleValue(appContainer, '--border-color')
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance()
      chart.setOption(getOption(data, colorCommonMainRef.current, descriptionColorMainRef.current, borderColorRef.current))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, theme, typeSelection, durationSelection])

  const getOption = (chartData: ChartData, mainColor?: string, descriptionColor?: string, borderColor?: string) => ({
    title: {
      text: typeSelection === 'ranking' ? 'RANKINGS GAIN' : 'ESTIMATED TRAFFIC',
      left: 'left',
      subtext: '-11',
      top: '0',
      textStyle: {
        color: descriptionColor,
        fontWeight: 'normal',
        fontSize: 16,
      },
      subtextStyle: {
        color: mainColor,
        fontSize: 40,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '40px',
      top: '20%',
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      data: chartData.dates,
      axisLine: {
        show: true,
        lineStyle: {
          color: borderColor,
          opacity: 0.3,
        },
        onZero: false,
        symbol: ['none', 'none'],
        symbolOffset: [0, 10],
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: descriptionColor,
        fontSize: 12,
        align: 'center',
        margin: 16,
      },
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: borderColor,
          opacity: 0.3,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data: chartData.values,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 15,
        itemStyle: {
          color: '#4e79a7',
        },
        lineStyle: {
          width: 2,
          color: '#4e79a7',
        },
      },
    ],
  })

  return (
    <Container className="keywords-trending-chart container-bg">
      <Flex vertical gap={32}>
        <Flex align="center" justify="between" className="keywords-trending-chart__controls">
          <Flex gap={16}>
            <Button
              size="sm"
              variant="text"
              type="borderRadius"
              onClick={() => setTypeSelection('ranking')}
              className={`chart-tab ${typeSelection === 'ranking' ? 'active' : ''}`}
            >
              Rankings
            </Button>
            <Button
              size="sm"
              variant="text"
              type="borderRadius"
              onClick={() => setTypeSelection('traffic')}
              className={`chart-tab ${typeSelection === 'traffic' ? 'active' : ''}`}
            >
              Traffic
            </Button>
          </Flex>
          <Flex gap={16} justify="end">
            <Button
              size="sm"
              variant="text"
              type="borderRadius"
              onClick={() => setDurationSelection(7)}
              className={`chart-btn ${durationSelection === 7 ? 'active' : ''}`}
            >
              7 Days
            </Button>
            <Button
              size="sm"
              variant="text"
              type="borderRadius"
              onClick={() => setDurationSelection(30)}
              className={`chart-btn ${durationSelection === 30 ? 'active' : ''}`}
            >
              30 Days
            </Button>
            <Button
              size="sm"
              variant="text"
              type="borderRadius"
              onClick={() => setDurationSelection(365)}
              className={`chart-btn ${durationSelection === 365 ? 'active' : ''}`}
            >
              Last Year
            </Button>
          </Flex>
        </Flex>
        <Flex vertical>
          <ReactECharts
            ref={chartRef}
            option={getOption(data, colorCommonMain, descriptionColorMain, borderColor)}
            style={{ height: '400px', width: '100%' }}
          />
          <Typography text="Calculated using keywords with ranking data during the analysis period." />
        </Flex>
      </Flex>
    </Container>
  )
}

export default KeywordsTrendingChart
