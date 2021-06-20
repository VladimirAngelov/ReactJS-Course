import { SearchField } from "./SearchStyled"

const Search = ({ search, setSearch, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <SearchField onChange={(e) => setSearch(e.target.value)}
                   name="search" value={search}
                   placeholder="Search" type="text" />
    </form>
  )
}

export default Search