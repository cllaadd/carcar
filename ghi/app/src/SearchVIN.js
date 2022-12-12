const SearchVIN = (props) => {
    const { filterValue, handleChange, handleSubmit} = props;

    return (
      <>
        <form action="/" method='get'>
        <label htmlFor="vin-search">
            <span className="visually-hidden">Search VINs</span>
        </label>
          <input
            id="vin-search"
            type="text"
            name="vs"
            placeholder="VIN"
            value={filterValue}
            onChange={handleChange}
          />
          <button className="btn btn-secondary m-2" type="submit" onClick={()=> {handleSubmit(filterValue)}}>Search VIN</button>
        </form>
      </>
    );
  };

  export default SearchVIN;
