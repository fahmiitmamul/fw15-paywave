import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

function Logout() {
  const router = useRouter()
  const doLogout = useCallback(async () => {
    await axios.get('../api/logout')
    router.replace('../auth/login')
  }, [router])
  return (
    <div onClick={doLogout} className="font-bold">
      Logout
    </div>
  )
}

export default Logout
