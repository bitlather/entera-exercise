import React, {useState} from 'react'
import PropTypes from 'prop-types';
import { Input, Button, Form } from 'semantic-ui-react'

const Search = ({searchAction}) => {

  const [searchInput, setSearchInput] = useState("")

  return (
    <div style={{paddingTop: 10}}>
      <Form onSubmit={() => searchAction(searchInput)}>
        <div>
          <Input type='text' onChange={e => setSearchInput(e.target.value)} placeholder='Search...' value={searchInput}>
            {/* Semantic UI seems to need this input: */}
            <input />
          </Input>
          <Button type='submit'>Search</Button>
        </div>
      </Form>
    </div>
  )
}

export default Search

Search.propTypes = {
  searchAction: PropTypes.func,
}; 