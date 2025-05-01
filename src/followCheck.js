import axios from 'axios'

// Replace this with your real Neynar API key
const NEYNAR_API_KEY = 'E25B8E09-2674-49A6-981B-673DDD708C13'

// Halfin’s Farcaster ID
const TARGET_FID = 291502

/**
 * Returns true if userFid follows @halfin (fid 291502), else false.
 */
export const checkIfFollowsHalfin = async (userFid) => {
  try {
    const res = await axios.get(
      'https://api.neynar.com/v2/farcaster/user/follows',
      {
        headers: {
          api_key: NEYNAR_API_KEY
        },
        params: {
          fid: userFid,
          target_fid: TARGET_FID
        }
      }
    )
    return res.data?.follows === true
  } catch (err) {
    console.error('Error checking follow status:', err)
    return false
  }
}
