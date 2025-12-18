import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useNavigate } from "react-router"


const EmptyAvatar = () => {
  const navigate = useNavigate()
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
        </EmptyMedia>
        <EmptyTitle>Page Not Found</EmptyTitle>
        <EmptyDescription>
          The page you’re looking for doesn’t exist or may have been moved. Please check the URL or return to the homepage.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm"
        onClick={()=>{navigate("/")}}
        >Go to Home</Button>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyAvatar