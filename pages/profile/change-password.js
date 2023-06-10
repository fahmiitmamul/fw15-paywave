import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Lock from '../../public/lock.svg'
import Image from 'next/image'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { RxEyeClosed } from 'react-icons/rx'
import { RxEyeOpen } from 'react-icons/rx'
import { useState } from 'react'

export default function ChangePassword() {
  const [openCurrent, setOpenCurrent] = useState(false)
  const [openNew, setOpenNew] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current Password is required !'),
    newPassword: Yup.string().required('New Password is required !'),
    confirmPassword: Yup.string().required('Confirm Password is required !'),
  })

  function setCurrent() {
    setOpenCurrent(!openCurrent)
  }

  function setNew() {
    setOpenNew(!openNew)
  }

  function setConfirm() {
    setOpenConfirm(!openConfirm)
  }

  function doSubmit(values) {
    alert(JSON.stringify(values))
  }
  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 w-2/6">
              <div className="font-bold text-2xl">Change Password</div>
              <div>
                You must enter your current password and then type your new
                password twice.
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={doSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                  isSubmitting,
                }) => {
                  return (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-10 w-2/5"
                    >
                      <div className="flex flex-col gap-10">
                        <div className="max-w-lg relative">
                          <input
                            type={openCurrent ? 'password' : 'text'}
                            name="currentPassword"
                            id="currentPassword"
                            value={values.currentPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                              touched.currentPassword &&
                              errors.currentPassword &&
                              'border-b-red-500'
                            }`}
                            placeholder="Current Password"
                          ></input>
                          <Image src={Lock} alt="" className="absolute top-2" />
                          <button
                            onClick={setCurrent}
                            type="button"
                            className="absolute top-3 right-4"
                          >
                            {openCurrent ? (
                              <RxEyeClosed color="gray" size={20} />
                            ) : (
                              <RxEyeOpen color="gray" size={20} />
                            )}
                          </button>
                          {errors.currentPassword &&
                            touched.currentPassword && (
                              <label
                                htmlFor="currentPassword"
                                className="label"
                              >
                                <span className="label-text-alt text-error">
                                  {errors.currentPassword}
                                </span>
                              </label>
                            )}
                        </div>
                        <div className="max-w-lg relative">
                          <input
                            type={openNew ? 'password' : 'text'}
                            name="newPassword"
                            id="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                              touched.newPassword &&
                              errors.newPassword &&
                              'border-b-red-500'
                            }`}
                            placeholder="Enter New Password"
                          ></input>
                          <Image src={Lock} alt="" className="absolute top-2" />
                          <button
                            onClick={setNew}
                            type="button"
                            className="absolute top-3 right-4"
                          >
                            {openNew ? (
                              <RxEyeClosed color="gray" size={20} />
                            ) : (
                              <RxEyeOpen color="gray" size={20} />
                            )}
                          </button>
                          {errors.newPassword && touched.newPassword && (
                            <label htmlFor="newPassword" className="label">
                              <span className="label-text-alt text-error">
                                {errors.newPassword}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="max-w-lg relative">
                          <input
                            type={openConfirm ? 'password' : 'text'}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                              touched.confirmPassword &&
                              errors.confirmPassword &&
                              'border-b-red-500'
                            }`}
                            placeholder="Enter Confirm Password"
                          ></input>
                          <Image src={Lock} alt="" className="absolute top-2" />
                          <button
                            onClick={setConfirm}
                            type="button"
                            className="absolute top-3 right-4"
                          >
                            {openConfirm ? (
                              <RxEyeClosed color="gray" size={20} />
                            ) : (
                              <RxEyeOpen color="gray" size={20} />
                            )}
                          </button>
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <label
                                htmlFor="confirmPassword"
                                className="label"
                              >
                                <span className="label-text-alt text-error">
                                  {errors.confirmPassword}
                                </span>
                              </label>
                            )}
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary normal-case max-w-lg w-full text-white shadow-2xl"
                          disabled={isSubmitting}
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
