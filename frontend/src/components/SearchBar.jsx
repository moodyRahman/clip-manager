import React from 'react'



function SearchBar(props) {
  const handleSearch = (event) => {
    props.onSearch(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.onSearch(event.target.value)
    }
  }

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleSearch} onKeyPress={handleKeyPress} />
      <button onClick={() => props.onSearch(document.querySelector('input').value)}>Search</button>
    </div>
  )
}

export default SearchBar