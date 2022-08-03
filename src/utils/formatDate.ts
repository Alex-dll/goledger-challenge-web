export function formatDate(date: Date) {
  const NewDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return NewDate
}
