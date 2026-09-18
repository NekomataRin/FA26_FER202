import React, { Component } from 'react'
import { PlayerList } from '../shared/ListOfPlayers'
import PlayersPresnetation from './PlayersPresentation'

export class Main extends Component {
    constructor() {
        super()
        this.state = {
            players: PlayerList
        }
    }

    render() {
        return <PlayersPresnetation players={this.state.players} />
    }
}

export default Main