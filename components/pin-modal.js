import { useRouter } from 'next/router'
import PinInput from './pin-input'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import http from '@/helpers/http'

export default function PinModal({ userToken }) {
  const [pins, setPin] = useState('')
  const router = useRouter()
  const recipients = useSelector((state) => state.transfer.user)
  const recipientAmount = useSelector((state) => state.transfer.amount)
  const recipientNotes = useSelector((state) => state.transfer.notes)

  async function doSubmit() {
    try {
      const recipientId = recipients.id
      const notes = recipientNotes
      const amount = recipientAmount
      const pin = pins
      const form = new URLSearchParams({
        recipientId,
        notes,
        amount,
        pin,
      }).toString()
      const { data } = await http(userToken).post(
        '/transactions/transfer',
        form
      )
      if (data) {
        router.push('/transaction/transfer-success')
      }
    } catch (err) {
      console.log(err)
    }
    // const { data } = await http(token).post("/transactions/transfer", form)
  }

  return (
    <>
      <div className="modal">
        <div className="modal-box">
          <div className="text-xl font-bold pb-6">Enter PIN to Transfer</div>
          <div className="max-w-xs pb-6">
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </div>
          <PinInput onChangePin={setPin} />
          <div className="modal-action">
            <label
              htmlFor="pinModal"
              className="btn btn-error normal-case text-white"
            >
              Cancel
            </label>
            <label
              htmlFor="pinModal"
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
