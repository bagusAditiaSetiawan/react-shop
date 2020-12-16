const LocalSearch = ({keyword, setKeyword}) => {
    return <input type="text" className="form-control" value={keyword}
    onChange={e=>{
        setKeyword(e.target.value)
    }}
    />
} 

export default LocalSearch;