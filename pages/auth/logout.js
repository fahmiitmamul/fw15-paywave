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
    <div className="btn btn-secondary normal-case shadow-xl" onClick={doLogout}>
      Logout
    </div>
  )
}

export default Logout
