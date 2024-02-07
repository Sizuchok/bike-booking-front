import { useMediaQuery } from 'usehooks-ts'
import BikeCard from '../../bikes/components/bike-card'
import BikeStatistics from '../../bikes/components/bike-statistics'
import CreateBikeForm from '../../bikes/forms/create-bike-form'
import { useAllBikes } from '../../bikes/hooks/all-bikes.hook'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/resizable'
import { ScrollArea } from '../../components/ui/scroll-area'

const BikesPage = () => {
  const { data, isSuccess } = useAllBikes()
  const isTablet = useMediaQuery('(min-width: 768px)')

  const bikes = data?.bikes ?? []

  const direction = isTablet ? 'horizontal' : 'vertical'
  const minMax = {
    minSize: isTablet ? 45 : 0,
    maxSize: isTablet ? 55 : 100,
  } as const

  return (
    <ResizablePanelGroup direction={direction} className="max-w-[1200px] mx-auto">
      <ResizablePanel defaultSize={50} {...minMax}>
        <ScrollArea className="h-full">
          <div className="space-y-2">
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
          {isSuccess && <BikeStatistics data={data} />}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default BikesPage
