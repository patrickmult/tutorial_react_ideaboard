import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import Idea from './Idea'
import IdeaForm from './IdeaForm'


class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null
    }
  }

  addNewIdea = () => {
    axios.post(
      '/api/v1/ideas',
      { idea:
        {
          title: '',
          body: '',
        }
      }
    ).then(response => {
      console.log(response)
      const ideas = update(this.state.ideas, {
        $splice: [[0,0, response.data]]
      })
      this.setState({
        ideas: ideas,
        editingIdeaId: response.data.id
      })
    }).catch(error => console.log(error))
  }

  componentDidMount() {
  axios.get('/api/v1/ideas.json')
    .then(response => {
      console.log(response)
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <button className="newIdeaButton"
          onClick={this.addNewIdea} >
          New Idea
        </button>
        <div>
          {this.state.ideas.map((idea) => {
            if(this.state.editingIdeaId === idea.id) {
              return(<IdeaForm idea={idea} key={idea.key} />)
            } else {
              return(<Idea idea={idea} key={idea.id} />)
            }
          })}
        </div>
      </div>
    )
  }
}

export default IdeasContainer
