import React, { useRef } from 'react'
import Player from 'react-h5-audio-player'
import styled from 'styled-components'

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${(props) => props.theme.colors.primary};
  z-index: 10;
`

const AudioPlayer = (props) => {
  const player = useRef<any>(null)
  return (
    <Wrapper>
      <Player
        autoPlay
        src={props.url}
        defaultCurrentTime="0:00"
        defaultDuration="0:00"
        ref={player}
        customIcons={{
          play: <img src="/play_circle.svg" width="40" />,
          forward: <img src="/forward.svg" width="30" />,
          rewind: <img src="/replay.svg" width="30" />,
          pause: <img src="/pause_circle.svg" width="40" />,
        }}
      />
    </Wrapper>
  )
}

export default AudioPlayer
