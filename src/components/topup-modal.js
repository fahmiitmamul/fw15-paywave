import { useState } from 'react'
import http from '@/src/helpers/http'
import { useDispatch } from 'react-redux'
import { getProfileAction } from '@/src/redux/actions/profile'

export default function TopUpModal({ userToken }) {
  const [values, setValues] = useState('')
  const dispatch = useDispatch()
  async function doSubmit() {
    try {
      const amount = values
      const form = new URLSearchParams({
        amount,
      }).toString()
      const { data } = await http(userToken).post('/transactions/topup', form)
      if (data) {
        dispatch(getProfileAction(userToken))
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl pb-4">Enter amount to top up</h3>
          <p className="pb-4">Enter the amount of money, and click submit</p>
          <div className="relative">
            <input
              type="number"
              className="input input-bordered w-full font-bold text-xl px-10"
              onChange={(e) => setValues(e.target.value)}
            ></input>
            <div className="absolute top-2.5 left-3 font-bold text-xl">Rp.</div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="topup-modal"
              className="btn btn-error normal-case text-white"
            >
              Cancel
            </label>
            <label
              htmlFor="topup-modal"
              className="btn btn-success normal-case text-white"
              onClick={doSubmit}
            >
              Continue
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
