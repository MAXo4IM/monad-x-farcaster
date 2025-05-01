import { useState } from 'react'
import { checkIfFollowsHalfin } from './followCheck'

export default function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [fid, setFid] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [checking, setChecking] = useState(false)

  // Simulated SIWF + wallet connect
  const handleConnect = () => {
    // TODO: replace with real SIWF integration to get userFid
    const simulatedFid = prompt('Enter your Farcaster FID for demo:')
    if (simulatedFid) {
      setFid(Number(simulatedFid))
      setIsConnected(true)
    }
  }

  const handleCheck = async () => {
    setChecking(true)
    const follows = await checkIfFollowsHalfin(fid)
    setIsFollowing(follows)
    setChecking(false)
    if (!follows) {
      alert('You must follow @halfin to unlock content.')
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🔒 Follow-for-Access</h1>
      <p>
        Follow{' '}
        <a href="https://warpcast.com/halfin" target="_blank" rel="noreferrer">
          @halfin
        </a>{' '}
        on Warpcast to unlock exclusive content.
      </p>

      {!isConnected ? (
        <button onClick={handleConnect}>Connect Wallet + Farcaster</button>
      ) : (
        <>
          <button onClick={handleCheck} disabled={checking}>
            {checking ? 'Checking...' : 'Verify Following'}
          </button>

          {isFollowing && (
            <div
              style={{
                marginTop: '20px',
                background: '#d4edda',
                padding: '10px',
                borderRadius: '4px'
              }}
            >
              ✅ Access granted!  
              Here’s your gated PDF:{' '}
              <a
                href="https://ipfs.io/ipfs/QmExampleHash"
                target="_blank"
                rel="noreferrer"
              >
                Download Secret PDF
              </a>
            </div>
          )}
        </>
      )}
    </div>
  )
}
