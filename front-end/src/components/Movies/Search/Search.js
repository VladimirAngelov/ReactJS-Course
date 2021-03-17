import style from './Search.module.css'

const Search = ({search, setSearch, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setSearch(e.target.value)} name="search" value={search} id={style['search-field']} placeholder="Search" type="text"/>
        </form>
    )
}

export default Search