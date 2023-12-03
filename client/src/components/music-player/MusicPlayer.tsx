import * as React from 'react'
import AvatarTitle from '../avatarTitle/AvatarTitle'
import styles from './MusicPlayer.module.scss'

interface IMusicPlayerProps {
}

const MusicPlayer: React.FC<IMusicPlayerProps> = (props) => {
  return (
    <section className={styles.under}>
      
      <AvatarTitle />
    </section>
  )
}

export default MusicPlayer
