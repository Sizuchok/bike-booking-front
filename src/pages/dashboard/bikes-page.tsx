import BikeCard from '../../bikes/components/bike-card'
import CreateBikeForm from '../../bikes/forms/create-bike-form'
import { useAllBikes } from '../../bikes/hooks/all-bikes.hook'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/resizable'

const BikesPage = () => {
  const { data } = useAllBikes()

  const bikes = data ?? []

  return (
    <ResizablePanelGroup direction="horizontal" className="space-x-2 max-w-[1200px] p-4 mx-auto">
      <ResizablePanel defaultSize={45} maxSize={55} minSize={40}>
        <div className="space-y-2">
          {bikes.map(bike => (
            <BikeCard bike={bike} key={bike._id} />
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55}>
        <CreateBikeForm />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default BikesPage
