import Header from '@/components/Header'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
