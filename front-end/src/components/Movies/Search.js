import {useState} from 'react';
import style from './Search.module.css'
import {Redirect} from 'react-router-dom'

const Search = () => {
    const [search, setSearch] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    if (submitted) return <Redirect to={{pathname: '/results', state: {search} }} />

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="search" value={search} id={style['search-field']} placeholder="Search" type="text"/>
        </form>
    )
}

export default Search