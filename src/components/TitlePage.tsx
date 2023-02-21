interface TitlePage {
  title: string
}

const TitlePage = ({ title }: TitlePage) => {
  return <h1 style={{ marginBottom: '50px', textAlign: 'center' }}>{title}</h1>
}

export default TitlePage
