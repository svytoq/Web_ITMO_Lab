import '../css/header.css';

const studentName = "Svytoq";
const group = "P32302";
const variant = "#666";

function Header(){
    const clock = document.getElementById('clock');

    function runClock() {
            clock.innerHTML = new Date().toLocaleString();
    }
    runClock();
    setInterval(runClock, 1000);
    return(
        <header>
            <h1 className='headerText'>{studentName}</h1>
            <h2 className='headerText'>{group} || {variant}</h2>
        </header>
    )
}
export default Header;