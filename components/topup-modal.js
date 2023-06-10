export default function TopUpModal() {
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
            >
              Continue
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
