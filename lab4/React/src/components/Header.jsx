import '../css/header.css';

const studentName = "Kirillov Andrey Andreevich";
const group = "P32311";
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