import { useRef } from 'react'

export default function PinInput({ onChangePin }) {
  const pinInput = {
    input1: useRef(),
    input2: useRef(),
    input3: useRef(),
    input4: useRef(),
    input5: useRef(),
    input6: useRef(),
  }

  const changeValue = (e) => {
    if (e.target.value.length > 0) {
      e.target.value = e.target.value.slice(e.target.value.length - 1)
      if (parseInt(e.target.name) < 6) {
        pinInput[`input${parseInt(e.target.name) + 1}`].current.focus()
      }
    } else {
      if (parseInt(e.target.name) > 1) {
        pinInput[`input${parseInt(e.target.name) - 1}`].current.focus()
      }
    }
    const pin = []
    for (const key in pinInput) {
      pin.push(pinInput[key].current.value)
    }
    onChangePin(pin.join(''))
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-8">
          <div className="flex gap-2 relative">
            <input
              type="number"
              onChange={changeValue}
              name="1"
              ref={pinInput.input1}
              className="w-14 h-14 text-center input input-bordered font-bold text-2xl"
            />
            <input
              type="number"
              onChange={changeValue}
              name="2"
              ref={pinInput.input2}
              className="w-14 h-14 text-center input input-bordered font-bold text-2xl"
            />
            <input
              type="number"
              onChange={changeValue}
              name="3"
              ref={pinInput.input3}
              className="w-14 h-14 text-center input input-bordered font-bold text-2xl"
            />
            <input
              type="number"
              onChange={changeValue}
              name="4"
              ref={pinInput.input4}
              className="w-14 h-14 text-center input input-bordered font-bold text-2xl"
            />
            <input
              type="number"
              onChange={changeValue}
              name="5"
              ref={pinInput.input5}
              className="w-14 h-14 text-center input input-bordered font-bold text-2xl"
            />
            <input
              type="number"
              onChange={changeValue}
              name="6"
              ref={pinInput.input6}
              className="w-14 h-14 text-center input input-bordered font-bold text-2xl"
            />
          </div>
        </div>
      </div>
    </>
  )
}
