interface TitlePage {
  title: string
}

const TitlePage = ({ title }: TitlePage) => {
  return <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>{title}</h2>
}

export default TitlePage
