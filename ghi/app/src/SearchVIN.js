const SearchVIN = (props) => {
    const { filterValue, handleChange} = props;

    return (
      <>
        <input value={filterValue} onChange={handleChange} placeholder="VIN"/>
      </>
    );
  };

  export default SearchVIN;
