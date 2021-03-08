import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import '../styles.css'
import { Layout, AudioPlayer } from '../components'
import theme from '../theme'

export default function App({ Component, pageProps }) {
  const [playerUrl, setPlayer] = useState(null)
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} setPlayerUrl={setPlayer} />
        <AudioPlayer url={playerUrl} />
      </Layout>
    </ThemeProvider>
  )
}
