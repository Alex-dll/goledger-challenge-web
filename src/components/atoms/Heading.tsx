function Heading({ title }: { title: string }) {
  return (
    <h1 className="my-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl md:my-24">
      {title}
    </h1>
  )
}

export { Heading }
