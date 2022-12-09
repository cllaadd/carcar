
function SearchVIN() {

    const searchVIN = async(vin) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${vin}/`, {method:"GET"})
        const data = await response.json();
        console.log(data)
        getData();
        window.location = "/appointments"
    }

    useEffect(()=> {
        getData();
    }, []
    )

}
