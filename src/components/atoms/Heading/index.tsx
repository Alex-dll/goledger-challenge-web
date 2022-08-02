import styles from './styles.module.css'

type Props = {
  title: string
}

function Heading({ title }: Props) {
  return <h1 className={styles.title}>{title}</h1>
}

export { Heading }
export type { Props as HeadingProps }
