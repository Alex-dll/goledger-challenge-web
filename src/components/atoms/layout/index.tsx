import { ReactNode } from 'react'

import { Header } from '../../molecules'
import styles from './styles.module.css'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  )
}

export { Layout }
