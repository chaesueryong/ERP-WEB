import './ButtonNormal.css';
import plus_icon from '../../assets/images/+-icon.svg';

function ButtonNormal({name, bg_color, color, font_weight=600, icon=false, handleClick}) {

  return (
    <div className="ButtonNormal" style={{backgroundColor: bg_color, color: color, fontWeight: font_weight}} onClick={() => {
        handleClick();
    }}>
        <img className='plus-img' src={plus_icon} style={icon ? {} : {display: 'none'}} />
        {name}
    </div>
  );
}

export default ButtonNormal;
