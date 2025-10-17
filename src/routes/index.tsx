import { RightSideGlassPlane } from '@/components/layout/RightSideGlassPlane'
import { Button } from '@/components/ui/button'
import getEnv from '@/lib/env'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <RightSideGlassPlane>
      <h1 className="text-3xl font-bold mb-4 text-center">OpenScoreBoard</h1>
      <p className="text-center mb-6">
        {getEnv('ORG_NAME')} Scoreboard Portaal
      </p>

      <div className="flex flex-col gap-4">
        <Button asChild>
          <a href="/remote">Bedien ScoreBoard</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="/login">Login Dashboard</a>
        </Button>
      </div>
    </RightSideGlassPlane>
  )
}
