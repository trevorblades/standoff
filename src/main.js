import autobind from 'autobind-decorator';
import React, {Component} from 'react';
import styled from 'styled-components';

import Button from './components/button';

import {PADDING_LARGER} from './variables';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Game = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const gamePadding = PADDING_LARGER;
const QuitButton = styled(Button)`
  position: absolute;
  top: ${gamePadding};
  right: ${gamePadding};
`;

const Round = styled.div`
  position: absolute;
  top: ${gamePadding};
  left: 50%;
`;

@autobind
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      round: 0
    };
  }

  start() {
    this.setState({
      playing: true,
      round: 0
    });
  }

  end() {
    this.setState({playing: false});
  }

  render() {
    return (
      <Wrapper>
        {this.state.playing
          ? <Game>
              <Round>{`Round ${this.state.round + 1}`}</Round>
              <QuitButton onClick={this.end}>Quit game</QuitButton>
            </Game>
          : <Button onClick={this.start}>Start game</Button>}
      </Wrapper>
    );
  }
}

export default Main;
