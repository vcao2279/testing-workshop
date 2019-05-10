import React from 'react'
import ReactDOM from 'react-dom'
import Editor from '../editor.todo'
import * as apiMock from '../../utils/api'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  // Arrange
  // create a fake user, post, history, and api
  const fakeUser = {id: 'testUser'}
  const fakePost = {
    title: 'Test Post',
    content: 'This is a test post',
    tags: ['test  ', '   react    ', '    testing'],
  }
  const fakeHistory = {push: jest.fn()}

  // use ReactDOM.render() to render the editor to a div
  const container = document.createElement('div')
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container)
  // fill out form elements with your fake post
  const form = container.querySelector('form')
  const {title, content, tags} = form.elements
  title.value = fakePost.title
  content.value = fakePost.content
  tags.value = fakePost.tags

  // Act
  // submit form
  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  // wait for promise to settle
  await flushPromises()
  // Assert
  // ensure the create function was called with the right data
  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(apiMock.posts.create).toHaveBeenCalledTimes(1)
  expect(apiMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: fakePost.title,
    content: fakePost.content,
    tags: ['test', 'react', 'testing'],
    date: expect.any(String),
  })
})

// TODO later...
test('snapshot', () => {})
