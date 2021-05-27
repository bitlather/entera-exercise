import React from 'react'
import PropTypes from 'prop-types';
import { Item, Loader } from 'semantic-ui-react'

const ResultsPane = ({results, activeItem, setActiveItem, isLoadingError, isLoading}) => {
  const displayResult = () => {
    if (!('data' in results)) {
      return;
    }
    if (results['data'].length == 0) {
      return (
        <div>
          No results found.
        </div>
      )
    }
    return (
      results['data']
        .filter(element => element.type === "college_score_card_school")
        .map((result) => (
          <Item
            key={`ResultsPane_Item_${result.id}`} // Using school ID only could cause conflicts, so namespace it.
            style={result.id === activeItem ? {backgroundColor: '#ADD8E6', cursor: 'pointer'} : {cursor: 'pointer'}}        
            onMouseEnter={() => setActiveItem(result.id)}
            onMouseLeave={() => setActiveItem()}
          >
            <Item.Content verticalAlign='middle'>
              {result.attributes.name}
            </Item.Content>
          </Item>
        ))
    )
  }

  return (
    <div style={{height: '100%', width: 280, margin: 10, paddingBottom: 75, overflow: 'auto'}}>
      <div style={{justifyContent: 'flex-start', overflow:'auto', marginTop: 10}}>
        {
          isLoadingError && <div>Darn, something didn't work. Try again?</div>
        }
        <Item.Group divided >
          { isLoading ?
          <Loader active inline style={{overflow: 'hidden'}}/> :
          displayResult() }
        </Item.Group>
      </div>
    </div>
  )
}

export default ResultsPane

ResultsPane.propTypes = {
  results: PropTypes.object,
  setActiveItem: PropTypes.func,
  activeItem: PropTypes.string,
  isLoading: PropTypes.bool,
  isLoadingError: PropTypes.bool
}; 