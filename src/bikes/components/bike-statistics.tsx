import { Skeleton } from '../../components/ui/skeleton'
import { AllBikes } from '../types/bike.types'
import StatisticsItem from './statistics-item'

type Props = {
  data: Omit<AllBikes, 'bikes'> | undefined
  isFetching: boolean
}

const BikeStatistics = ({ data, isFetching }: Props) => {
  return (
    <section className="mt-2 space-y-2">
      <h3 className="text-xl uppercase font-bold">Statistics</h3>
      {isFetching ? (
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-28" />
        </div>
      ) : (
        <dl>
          <StatisticsItem term="Total" details={data?.count ?? '-'} />
          <StatisticsItem term="Available" details={data?.available ?? '-'} />
          <StatisticsItem term="Busy" details={data?.busy ?? '-'} />
          <StatisticsItem term="Avg. price" details={data?.avgPrice ?? '-'} />
        </dl>
      )}
    </section>
  )
}

export default BikeStatistics
