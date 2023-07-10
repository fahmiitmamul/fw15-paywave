import cookieConfig from '@/helpers/cookie-config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(function logoutRoute(req, res) {
  req.session.destroy()
  res.send({ success: true, message: 'Logout Success' })
}, cookieConfig)
