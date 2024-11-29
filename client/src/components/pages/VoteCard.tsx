import { ICandidate } from '../../types/candidates'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchProfileUpdate } from '../../redux/slices/userSlice'
import { socket } from '../../main'

interface props {
  candidate: ICandidate
}

export default function VoteCard({ candidate }: props) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const handleVote = async () => {
    try {
      const data = await fetch(`https://server-app:3000/api/votes`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage['Authorization']!,
        },
        body: JSON.stringify({
          candidateId: candidate._id,
          userId: user?._id,
        }),
      })
      console.log(data)
      //   dispatch(fetchCandidates());
      dispatch(fetchProfileUpdate(user?._id!))
      socket.emit('newVote')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className={`vote-card ${
        user?.votedFor === candidate._id ? 'my-vote' : ''
      }`}
    >
      <h1>
        {candidate.name}
        <span className='badge'>{candidate.votes}</span>
      </h1>

      <button
        onClick={handleVote}
        // disabled={user?.hasVoted}
      >
        VOTE
      </button>
    </div>
  )
}
