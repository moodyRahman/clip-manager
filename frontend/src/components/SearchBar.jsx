import React from 'react'

function SearchBar({ state: { search, setSearch } }) {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
      {/* <button onClick={() => console.log(search)}>Search</button> */}
    </div>
  )
}

export default SearchBar