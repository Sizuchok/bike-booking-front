import { Skeleton } from '../../components/ui/skeleton'

const BikeCardSkeleton = () => {
  return (
    <div className="flex flex-col h-32 w-full border rounded-xl p-4">
      <Skeleton className="h-4 max-w-40 rounded-xl" />
      <Skeleton className="h-4 max-w-48 mt-3 rounded-xl" />
      <Skeleton className="h-6 max-w-80 mt-auto rounded-xl" />
    </div>
  )
}
export default BikeCardSkeleton
