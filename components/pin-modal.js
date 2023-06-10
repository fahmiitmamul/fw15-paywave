import PinInput from './pin-input'
import { useState } from 'react'

export default function PinModal() {
  const [pin, setPin] = useState('')

  function doSubmit() {
    alert(pin)
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
