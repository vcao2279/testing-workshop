// Basic unit test
import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../login'

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // 🐨 create a fake object to hold the form field values (username and password)
  const fakeInputs = {
    username: 'stormer2279',
    password: 'slayer2710',
  }
  // 🐨 create a jest.fn() for your submit handler
  const handleSubmit = jest.fn()
  // 🐨 render the Login component to a div
  const div = document.createElement('div')
  ReactDOM.render(<Login onSubmit={handleSubmit} />, div)
  //
  // 🐨 get the field nodes
  const inputs = div.querySelectorAll('input')
  const [userInput, passwordInput] = inputs
  const form = div.querySelector('form')
  const button = div.querySelector('button')
  // 🐨 fill in the field values
  userInput.value = fakeInputs.username
  passwordInput.value = fakeInputs.password
  // Act
  // 🐨 submit the form:
  const event = new window.Event('submit')
  // 💰 formNode.dispatchEvent(new window.Event('submit'))
  form.dispatchEvent(event)
  //
  // Assert
  // 🐨 ensure your submit handler was called properly
  expect(button.type).toBe('submit')
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toBeCalledWith(fakeInputs)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=login.step-1&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
