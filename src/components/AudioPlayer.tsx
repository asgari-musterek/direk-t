import React, { useRef } from 'react'
import Player from 'react-h5-audio-player'
import styled from 'styled-components'

const Wrapper = styled.footer<{disabled: boolean}>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${(props) => props.theme.colors.primary};
  z-index: 10;
  & > * {
    opacity: ${props => props.disabled ? '0.75' : '1'};
  }
  pointer-events: ${props => props.disabled ? 'none' : 'default'};
`

const jumpSteps = { backward: 30000, forward: 30000 }

const AudioPlayer = (props) => {
  const player = useRef<any>(null)
  return (
    <Wrapper disabled={!Boolean(props.url)}>
      <Player
        autoPlay
        src={props.url}
        defaultCurrentTime="0:00"
        defaultDuration="0:00"
        showJumpControls
        showSkipControls={false}
        progressJumpSteps={jumpSteps}
        ref={player}
        customIcons={{
          play: <img src={process.env.NEXT_PUBLIC_URL+"play_circle.svg"} width="40"/>,
          forward: <img src={process.env.NEXT_PUBLIC_URL+"forward.svg"} width="30"/>,
          rewind: <img src={process.env.NEXT_PUBLIC_URL+"replay.svg"} width="30"/>,
          pause: <img src={process.env.NEXT_PUBLIC_URL+"pause_circle.svg"} width="40"/>,
        }}
      />
    </Wrapper>
  )
}

export default AudioPlayer
