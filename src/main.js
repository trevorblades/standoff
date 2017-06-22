import autobind from 'autobind-decorator';
import {KEY_1, KEY_2, KEY_3} from 'keycode-js';
import React, {Component} from 'react';
import styled from 'styled-components';

import Button from './components/button';
import BulletIcon from './assets/icons/bullet.svg';
import HeartIcon from './assets/icons/heart.svg';

import {
  GRAY_LIGHTER,
  PADDING_BASE,
  PADDING_LARGER,
  PADDING_SMALL
} from './variables';

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
  font-size: 24px;
  font-weight: 700;
  position: absolute;
  top: ${gamePadding};
  left: ${gamePadding};
`;

const Actions = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Action = styled(Button)`
  width: 120px;
  height: 64px;
  &:not(:last-child) {
    margin-right: ${PADDING_BASE};
  }
`;

const Health = styled.div`
  display: flex;
  position: absolute;
  top: ${gamePadding};
  left: 50%;
  transform: translateX(-50%);
  svg {
    width: 27px;
    height: 24px;
    &:not(:last-child) {
      margin-right: ${PADDING_SMALL};
    }
  }
`;

const Ammo = styled.div`
  display: flex;
  position: absolute;
  bottom: ${gamePadding};
  left: 50%;
  transform: translateX(-50%);
  svg {
    width: 24px;
    height: 69px;
    &:not(:last-child) {
      margin-right: ${PADDING_SMALL};
    }
  }
`;

const MAX_ROUNDS = 100;
const ROUND_INTERVAL = 3000; // time between read actions, in milliseconds

const MAX_HEALTH = 3;
const MAX_BULLETS = 5;

const COVER = 'block';
const RELOAD = 'reload';
const FIRE = 'fire';
const ACTIONS = {
  [COVER]: 'Cover',
  [RELOAD]: 'Reload',
  [FIRE]: 'Fire'
};

@autobind
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bulletsLoaded: 0,
      healthRemaining: MAX_HEALTH - 1,
      playing: false,
      round: 0,
      selectedAction: COVER
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(event) {
    if (this.state.playing) {
      const acceptedKeys = [KEY_1, KEY_2, KEY_3];
      const keyIndex = acceptedKeys.indexOf(event.keyCode);
      if (keyIndex !== -1) {
        const action = Object.keys(ACTIONS)[keyIndex];
        if (action !== FIRE || this.state.bulletsLoaded) {
          this.setState({selectedAction: action});
        }
      }
    }
  }

  onActionClick(key) {
    this.setState({selectedAction: key});
  }

  start() {
    this.interval = setInterval(this.readAction, ROUND_INTERVAL);
    this.setState({
      playing: true,
      round: 0
    });
  }

  readAction() {
    console.log(this.state.selectedAction); // eslint-disable-line no-console
    if (this.state.round + 1 === MAX_ROUNDS) {
      return this.end();
    }

    return this.setState(prevState => {
      const nextState = {
        round: prevState.round + 1,
        selectedAction: COVER
      };

      if (
        prevState.selectedAction === RELOAD &&
        prevState.bulletsLoaded < MAX_BULLETS
      ) {
        nextState.bulletsLoaded = prevState.bulletsLoaded + 1;
      } else if (prevState.selectedAction === FIRE) {
        nextState.bulletsLoaded = prevState.bulletsLoaded - 1;
      }

      return nextState;
    });
  }

  end() {
    clearInterval(this.interval);
    this.setState({playing: false});
  }

  renderHealth() {
    const bullets = [];
    for (let i = 0; i < MAX_HEALTH; i++) {
      bullets.push(
        <HeartIcon
          fill={this.state.healthRemaining >= i + 1 ? 'red' : GRAY_LIGHTER}
          key={i.toString()}
        />
      );
    }
    return <Health>{bullets}</Health>;
  }

  renderAmmo() {
    const bullets = [];
    for (let i = 0; i < MAX_BULLETS; i++) {
      let fill = GRAY_LIGHTER;
      if (this.state.bulletsLoaded >= i + 1) {
        fill = i === MAX_BULLETS - 1 ? 'gold' : 'black';
      }

      bullets.push(<BulletIcon fill={fill} key={i.toString()} />);
    }
    return <Ammo>{bullets}</Ammo>;
  }

  render() {
    return (
      <Wrapper>
        {this.state.playing
          ? <Game>
              <Round>{`Round ${this.state.round + 1}`}</Round>
              {this.renderHealth()}
              {this.renderAmmo()}
              <QuitButton onClick={this.end}>Quit game</QuitButton>
              <Actions>
                {Object.keys(ACTIONS).map((key, index) => {
                  let backgroundColor;
                  if (key === this.state.selectedAction) {
                    backgroundColor = 'blue';
                  }

                  return (
                    <Action
                      backgroundColor={backgroundColor}
                      disabled={key === FIRE && this.state.bulletsLoaded < 1}
                      key={key}
                      onClick={() => this.onActionClick(key)}
                    >
                      {`${index + 1}. ${ACTIONS[key]}`}
                    </Action>
                  );
                })}
              </Actions>
            </Game>
          : <Button onClick={this.start}>Start game</Button>}
      </Wrapper>
    );
  }
}

export default Main;
