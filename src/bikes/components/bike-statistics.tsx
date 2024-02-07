import { AllBikes } from '../types/bike.types'
import StatisticsItem from './statistics-item'

type Props = {
  data: Omit<AllBikes, 'bikes'>
}

const BikeStatistics = ({ data }: Props) => {
  return (
    <section className="mt-2 space-y-2">
      <h3 className="text-xl uppercase font-bold">Statistics</h3>
      <dl>
        <StatisticsItem term="Total" details={data.count} />
        <StatisticsItem term="Available" details={data.available} />
        <StatisticsItem term="Busy" details={data.busy} />
        <StatisticsItem term="Avg. price" details={data.avgPrice} />
      </dl>
    </section>
  )
}

export default BikeStatistics
