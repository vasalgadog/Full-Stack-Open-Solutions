const Filter = ({filter, handleFilterChange}) => <>
    <div>
        filter shown with <input onChange={handleFilterChange} value={filter} />
    </div>
</>

export default Filter;