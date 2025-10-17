import { RightSideGlassPlane } from '@/components/layout/RightSideGlassPlane'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/remote/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <RightSideGlassPlane>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Kies een wedstrijd
      </h1>
      <div className="flex flex-col gap-4"></div>
    </RightSideGlassPlane>
  )
}
