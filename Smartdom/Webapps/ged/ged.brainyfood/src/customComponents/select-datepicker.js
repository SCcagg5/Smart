import styled from 'styled-components'
import SelectDatepicker from '../customComponents/react-select-datepicker'

const StyledSelectDatepicker = styled(SelectDatepicker)`
  .rid_date-container {
    > div {
      margin-right: 0;

      &:last-child {
        margin-right: 0;
      }

      label {
        font-size: 0.8rem;
        margin-bottom: 5px;
        font-weight: 600;
      }

      select {
        color: #444444;
        font-size: 13px;
        padding: 8px;
        border-radius: 3px;
        border:1px solid #ced4da;
        text-align: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        height:40px;

        &.has-error {
          border: 2px solid #f97474;
        }
      }
    }

    .rid_day-container select {
      width: 60px;
    }
    .rid_month-container select {
      width: 95px;
    }
    .rid_year-container select {
      width: 80px;
    }
  }

  .error-message {
    color: #f97474;
    margin-top: 6px;
    font-size: 0.9rem;
  }
`

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .rid_date-container {
    justify-content: center;
  }
`

export { StyledSelectDatepicker, DateContainer }
