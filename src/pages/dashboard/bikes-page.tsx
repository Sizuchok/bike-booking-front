import { useAllBikes } from '../../bikes/hooks/all-bikes.hook'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/resizable'

const BikesPage = () => {
  const { data } = useAllBikes()

  const bikes = data ?? []

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="space-x-2 max-w-[1200px] border border-dashed rounded-xl p-2 mx-auto"
    >
      <ResizablePanel defaultSize={45} maxSize={55} minSize={40}>
        <div className="space-y-2">
          {bikes.map(bike => (
            <Card key={bike._id}>
              <CardHeader>
                <CardTitle>{`${bike.name} - ${bike.type} (${bike.color})`}</CardTitle>
                <CardDescription>{`ID: ${bike._id}`}</CardDescription>
              </CardHeader>
              <CardContent>{`Status: ${bike.status}`}</CardContent>
            </Card>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55}>some content here</ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default BikesPage
