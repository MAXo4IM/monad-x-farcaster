import { useEffect, useState } from 'react';

const REQUIRED_USER = "halfin";

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [checking, setChecking] = useState(false);

  const mockCheckFollowing = async () => {
    setChecking(true);
    return new Promise((resolve) => setTimeout(() => {
      const followed = Math.random() > 0.5;
      resolve(followed);
    }, 1000));
  };

  const handleConnect = () => {
    setIsConnected(true);
    alert("Wallet & Farcaster linked!");
  };

  const handleCheck = async () => {
    setChecking(true);
    const result = await mockCheckFollowing();
    setIsFollowing(result);
    if (!result) {
      alert("You must follow @halfin to unlock content.");
    } else {
      alert("Access granted!");
    }
    setChecking(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🔒 Follow-for-Access</h1>
      <p>
        Follow <a href="https://warpcast.com/halfin" target="_blank">@halfin</a> on Warpcast to unlock content.
      </p>
      {!isConnected ? (
        <button onClick={handleConnect}>Connect Wallet + Farcaster</button>
      ) : (
        <>
          <button onClick={handleCheck} disabled={checking}>
            {checking ? "Checking..." : "Verify Following"}
          </button>
          {isFollowing && (
            <div style={{ marginTop: "20px", background: "#d4edda", padding: "10px" }}>
              ✅ Welcome! Here is your gated content: <br />
              <a href="https://ipfs.io/ipfs/QmExampleHash" target="_blank">Download Secret PDF</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}