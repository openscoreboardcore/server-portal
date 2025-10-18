import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { useLocalStorage } from 'usehooks-ts'

export const Route = createFileRoute('/remote/manager')({
  component: RouteComponent,
})

function RouteComponent() {
  const WS_URL = 'wss://' + import.meta.env.VITE_API_URL + '/ws'
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    reconnectAttempts: 10,
  })
  const [scoreTeamA, setScoreTeamA] = useLocalStorage('scoreTeamA', 0)
  const [teamAName, setTeamAName] = useLocalStorage('teamAName', 'Thuis')
  const [scoreTeamB, setScoreTeamB] = useLocalStorage('scoreTeamB', 0)
  const [teamBName, setTeamBName] = useLocalStorage('teamBName', 'Uit')

  const sendScreenUpdate = () => {
    if (readyState === WebSocket.OPEN) {
      sendJsonMessage({
        type: 'publish',
        topic: 'match-manual',
        message: {
          homeTeam: { name: teamAName, score: scoreTeamA },
          awayTeam: {
            name: teamBName,
            score: scoreTeamB,
            // logo: "https://storage.googleapis.com/publiq_be_production/files/projecten/UDB/_660x660_crop_center-center_82_line/UiTlabel.png",
            // logo: 'https://lirp.cdn-website.com/32c872e6/dms3rep/multi/opt/Logo+MHV+kleur_M-1920w.png',
          },

          status: 'in_progress',
          time: '',
          part: 'Manual',
        },
      })
    }
  }

  useEffect(() => {
    sendScreenUpdate()
    console.log({ teamAName, scoreTeamA, teamBName, scoreTeamB })
  }, [
    teamAName,
    scoreTeamA,
    teamBName,
    scoreTeamB,
    readyState,
    sendJsonMessage,
  ])

  return (
    <div>
      <h1 className="text-3xl font-bold underline">ScoreBoard Admin Page</h1>
      <div className="p-4">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thuis Team Naam
              </label>
              <input
                type="text"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Thuis Team Score
              </label>
              <input
                type="number"
                value={scoreTeamA}
                onChange={(e) => setScoreTeamA(parseInt(e.target.value, 10))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <p>Screen Control:</p>
            <div>
              <Button
                onClick={() => {
                  sendJsonMessage({
                    type: 'publish',
                    topic: 'screen-1',
                    message: {
                      status: 'match',
                    },
                  })
                  sendJsonMessage({
                    type: 'publish',
                    topic: 'field-veld1',
                    message: {
                      matchId: 'match-manual',
                    },
                  })
                  setTimeout(function () {
                    sendScreenUpdate()
                  }, 1500)
                }}
              >
                On
              </Button>
              <Button
                onClick={() => {
                  sendJsonMessage({
                    type: 'publish',
                    topic: 'screen-1',
                    message: {
                      status: 'off',
                    },
                  })
                }}
              >
                Off
              </Button>
            </div>
          </div>
          <div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Uit Team Naam
                </label>
                <input
                  type="text"
                  value={teamBName}
                  onChange={(e) => setTeamBName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Uit Team Score
                </label>
                <input
                  type="number"
                  value={scoreTeamB}
                  onChange={(e) => setScoreTeamB(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  setScoreTeamA(0)
                  setTeamAName('Thuis')
                  setScoreTeamB(0)
                  setTeamBName('Uit')
                  sendScreenUpdate()
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
