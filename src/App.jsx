import { useEffect, useState } from 'react';

const REQUIRED_FID = 2261; // @halfin

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [fid, setFid] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [checking, setChecking] = useState(false);

  const connectFarcaster = async () => {
    try {
      const res = await fetch("https://api.neynar.com/v2/farcaster/user", {
        method: "GET",
        headers: {
          accept: "application/json",
          api_key: "NEYNAR_PUBLIC_API_KEY"
        },
        credentials: "include"
      });

      const data = await res.json();
      if (data && data.result && data.result.user) {
        setFid(data.result.user.fid);
        setIsConnected(true);
      } else {
        alert("Failed to connect Farcaster account");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to Farcaster");
    }
  };

  const checkFollowing = async () => {
    if (!fid) return;
    setChecking(true);
    try {
      const res = await fetch(`https://api.neynar.com/v2/farcaster/user/follows?fid=${fid}&target_fid=${REQUIRED_FID}`, {
        headers: {
          accept: "application/json",
          api_key: "NEYNAR_PUBLIC_API_KEY"
        }
      });
      const data = await res.json();
      if (data.is_following) {
        setIsFollowing(true);
      } else {
        alert("You must follow @halfin to unlock content.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to check follow status");
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
        <button onClick={connectFarcaster}>Connect Farcaster</button>
      ) : (
        <>
          <button onClick={checkFollowing} disabled={checking}>
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
