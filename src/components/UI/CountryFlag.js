import ReactCountryFlag from "react-country-flag"

function CountryFlag(props){
    const { isoCode } = props;
    const style = {
        width: '1.2rem',
        height: '1.2rem',
    }

    return <ReactCountryFlag 
                countryCode={isoCode} 
                svg 
                style={style} 
                className="country-flag" 
                alt="Country Flag" 
            /> 
}

export default CountryFlag