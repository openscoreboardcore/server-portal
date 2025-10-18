export function RightSideGlassPlane({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row h-screen max-w-full overflow-hidden bg-[url(/bg-field-1-mhcflevo.jpg)] bg-cover">
      <div className="h-full grow"></div>
      <div className=" h-full w-full sm:w-md p-4">
        <div className="bg-white/80 rounded-lg shadow-lg p-6 h-full flex flex-col">
          <div className="flex-grow flex flex-col justify-center items-center">
            {children}
          </div>
          <div className="flex flex-col justify-end items-center text-center text-sm text-gray-600">
            <p>
              By <a href="https://jcklerk.dev">@jcklerk.dev</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
