import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskApp extends Component {
  state = {
    taskInput: '',
    taskType: tagsList[0].optionId,
    taskArray: [],
    otherArray: [],
    isTag: false,
    tagId: '',
  }

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({taskType: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {taskInput, taskType} = this.state
    if (taskInput !== '') {
      const taskObj = {
        taskInput,
        taskType,
        id: uuid(),
      }
      this.setState(prevState => ({
        taskArray: [...prevState.taskArray, taskObj],
        taskInput: '',
        taskType: tagsList[0].optionId,
      }))
    }
  }

  onTag = eachTag => {
    const {tagId} = this.state
    if (tagId === eachTag.optionId) {
      this.setState({
        otherArray: [],
        isTag: false,
        tagId: '',
      })
    } else {
      this.setState(prevState => ({
        otherArray: prevState.taskArray.filter(
          eachItem => eachItem.taskType === eachTag.optionId,
        ),
        isTag: true,
        tagId: eachTag.optionId,
      }))
    }
  }

  renderNoResult = () => (
    <div className="no-container">
      <p className="head2">No Tasks Added Yet</p>
    </div>
  )

  renderTag = eachTag => {
    const {tagId} = this.state
    const className =
      tagId === eachTag.optionId ? 'tag-item-active' : 'tag-item'
    return (
      <li className={className} key={eachTag.optionId}>
        <button
          className="tag-text"
          type="button"
          onClick={() => this.onTag(eachTag)}
        >
          {eachTag.displayText}
        </button>
      </li>
    )
  }

  renderOther = () => {
    const {otherArray} = this.state
    const isZeroOther = otherArray.length === 0
    return (
      <>
        {isZeroOther && this.renderNoResult()}
        {!isZeroOther && (
          <ul className="task-container">
            {otherArray.map(eachItem => (
              <li className="task-list-item" key={eachItem.id}>
                <p className="task-text">{eachItem.taskInput}</p>
                <p className="tag-type">{eachItem.taskType}</p>
              </li>
            ))}
          </ul>
        )}{' '}
      </>
    )
  }

  renderResult = () => {
    const {taskArray, isTag} = this.state
    return (
      <>
        {!isTag && (
          <ul className="task-container">
            {taskArray.map(eachItem => (
              <li className="task-list-item" key={eachItem.id}>
                <p className="task-text">{eachItem.taskInput}</p>
                <p className="tag-type">{eachItem.taskType}</p>
              </li>
            ))}
          </ul>
        )}
        {isTag && this.renderOther()}
      </>
    )
  }

  render() {
    const {taskInput, taskType, taskArray} = this.state
    const isZero = taskArray.length === 0
    return (
      <div className="app-container">
        <div className="left-container">
          <h1 className="head">Create a Task!</h1>
          <form onSubmit={this.onAdd} className="form-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              className="input"
              type="text"
              placeholder="Enter the task here"
              id="task"
              value={taskInput}
              onChange={this.onChangeInput}
            />
            <label htmlFor="type" className="label">
              Tags
            </label>
            <select
              id="type"
              className="input"
              value={taskType}
              onChange={this.onChangeOption}
            >
              {tagsList.map(eachItem => (
                <option
                  key={eachItem.optionId}
                  value={eachItem.optionId}
                  id={eachItem.displayText}
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="head2">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(eachTag => this.renderTag(eachTag))}
          </ul>
          <h1 className="head2">Tasks</h1>
          {isZero && this.renderNoResult()}
          {!isZero && this.renderResult()}
        </div>
      </div>
    )
  }
}

export default TaskApp
