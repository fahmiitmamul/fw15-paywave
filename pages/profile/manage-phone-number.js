import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { FiPhone } from 'react-icons/fi'

export default function ManagePhoneNumber() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is invalid')
      .required('Phone Number is required !'),
  })

  function doSubmit(values) {
    alert(JSON.stringify(values))
  }
  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] lg:py-10 lg:px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 lg:w-2/6">
              <div className="font-bold text-2xl">Edit Phone Number</div>
              <div>
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <Formik
                initialValues={{
                  phoneNumber: '',
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
                      className="flex flex-col gap-10 lg:w-2/5"
                    >
                      <div className="flex flex-col gap-10">
                        <div className="max-w-lg relative">
                          <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                              touched.phoneNumber &&
                              errors.phoneNumber &&
                              'border-b-red-500'
                            }`}
                            placeholder="Enter Phone Number"
                          ></input>
                          <FiPhone size={20} className="absolute top-2.5" />
                          {errors.phoneNumber && touched.phoneNumber && (
                            <label htmlFor="phoneNumber" className="label">
                              <span className="label-text-alt text-error">
                                {errors.phoneNumber}
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
                          Edit Phone Number
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
