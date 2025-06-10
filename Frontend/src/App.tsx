import { PlusIcon } from "./components/icons/PlusIcon"
import { ShareIcon } from "./components/icons/ShareIcon"
import { Button } from "./components/ui/Button"

const App = () => {
  return (
    <div>

      <Button 
        startIcon={<PlusIcon size="md" />} 
        endIcon={<ShareIcon size="md" />}
        title={'share'} 
        size="lg" 
      />

    </div>
  )
}

export default App