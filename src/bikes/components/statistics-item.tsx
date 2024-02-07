type Props = {
  term: string
  details: string | number
}

const StatisticsItem = ({ term, details }: Props) => {
  return (
    <div>
      <dt className="inline">{term}:</dt>
      <dd className="inline">
        <span className="font-bold ml-1">{details}</span>
      </dd>
    </div>
  )
}

export default StatisticsItem
