import { useMediaQuery } from 'usehooks-ts'
import BikeCard from '../../bikes/components/bike-card'
import BikeCardSkeleton from '../../bikes/components/bike-card-skeleton'
import BikeStatistics from '../../bikes/components/bike-statistics'
import CreateBikeForm from '../../bikes/forms/create-bike-form'
import { useAllBikes } from '../../bikes/hooks/all-bikes.hook'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/resizable'
import { ScrollArea } from '../../components/ui/scroll-area'

const BikesPage = () => {
  const { data, isLoading, isFetching } = useAllBikes()
  const isTablet = useMediaQuery('(min-width: 768px)')

  const bikes = data?.bikes ?? []

  const direction = isTablet ? 'horizontal' : 'vertical'
  const minMax = {
    minSize: isTablet ? 45 : 0,
    maxSize: isTablet ? 55 : 100,
  } as const

  const skeletons = new Array(8).fill('')

  return (
    <ResizablePanelGroup direction={direction} className="max-w-[1200px] mx-auto">
      <ResizablePanel defaultSize={50} {...minMax}>
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {isLoading && skeletons.map((_, i) => <BikeCardSkeleton key={i} />)}

            {bikes.map(bike => (
              <BikeCard bike={bike} key={bike._id} />
            ))}
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle className="my-2 md:my-0 md:mx-2" />
      <ResizablePanel defaultSize={50}>
        <div>
          <CreateBikeForm />
          <BikeStatistics isFetching={isFetching} data={data} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default BikesPage
