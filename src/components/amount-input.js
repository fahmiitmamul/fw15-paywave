import React from 'react'

const AmountInput = ({ field, form, ...props }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '')

    if (!inputValue) {
      form.setFieldValue(field.name, '')
      return
    }

    const value = parseInt(inputValue, 10)
    const formattedValue = value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    form.setFieldValue(field.name, formattedValue)
  }

  return (
    <input
      type="text"
      {...field}
      {...props}
      onBlur={handleChange}
      className="border border-gray-400 w-full rounded-lg py-10 text-4xl text-center"
      onChange={handleChange}
    />
  )
}

export default AmountInput
