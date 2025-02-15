import Flex from '@/components/Flex'
import Button from '@/components/Button'
// import Select from '@/components/Select'
import Typography from '@/components/Typography/Typography'

import './RecommendationsHeader.scss'

const RecommendationsHeader = ({
  onClick,
  title = '',
  setFilterValue,
  filterValue = '',
  loading = false,
  total_count = 0,
  description = '',
  disabled = false,
  approved_count = 0,
  addPadding = true
}) => {
  return (
    <Flex vertical gap={16} padding={addPadding ? "40px 40px 0px 40px" : undefined} className="recommendation-header-container">
      <Flex vertical align="start" gap={16}>
        <Flex justify="between" align="center">
          <Typography type="h3" text={title} className='recommendation-header-container__title' />
          <Flex justify="end" align="center" gap={16}>
            {/* <Select
              Options={[
                { id: '', label: 'All' },
                { id: 'true', label: 'Approved' },
                { id: 'false', label: 'UnApproved' },
              ]}
              values={filterValue}
              setValues={setFilterValue}
              className="recommendation-header-container__select"
              placeholder="Select Type"
            /> */}
            <Button size="sm" variant="outlined" type="borderRadius" color="success" disabled={disabled} loading={loading} onClick={onClick}>
              Approve All ({approved_count}/{total_count})
            </Button>
          </Flex>
        </Flex>
        <Typography text={description} />
      </Flex>
    </Flex>
  )
}

export default RecommendationsHeader
