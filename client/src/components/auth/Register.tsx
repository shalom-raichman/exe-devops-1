import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { user } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (user?._id) {
      navigate('/votes')
    }
  }, [])

  const handleRegister = async () => {
    try {
      const res = await fetch(`https://server-app:3000/api/users/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin }),
      })
      const data = await res.json()
      console.log(data)
      navigate('/login')
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <div>
      {' '}
      <input
        type='text'
        placeholder='User Name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='checkbox'
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}
