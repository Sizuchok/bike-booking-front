import { useMediaQuery } from 'react-responsive'
import BikeCard from '../../bikes/components/bike-card'
import CreateBikeForm from '../../bikes/forms/create-bike-form'
import { useAllBikes } from '../../bikes/hooks/all-bikes.hook'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/resizable'

const BikesPage = () => {
  const { data } = useAllBikes()
  const isTablet = useMediaQuery({ minWidth: 768 })

  const bikes = data ?? []

  const direction = isTablet ? 'horizontal' : 'vertical'
  const minMax = {
    minSize: isTablet ? 45 : 0,
    maxSize: isTablet ? 55 : 100,
  } as const

  return (
    <ResizablePanelGroup direction={direction} className="max-w-[1200px] mx-auto">
      <ResizablePanel defaultSize={50} {...minMax}>
        <div className="space-y-2">
          {bikes.map(bike => (
            <BikeCard bike={bike} key={bike._id} />
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="my-2 md:my-0 md:mx-2" />
      <ResizablePanel defaultSize={50}>
        <CreateBikeForm />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default BikesPage
