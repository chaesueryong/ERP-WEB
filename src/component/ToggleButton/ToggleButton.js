import './ToggleButton.css';

function ToggleButton({handleChange}) {

    return (
        <div className="ToggleButton">
            <input type="checkbox" id="toggle" hidden onChange={handleChange} /> 

            <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
            </label>
        </div>
    );
}

export default ToggleButton;
