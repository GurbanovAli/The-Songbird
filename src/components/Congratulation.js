import React, { Component } from 'react';

const url = 'http://memok.net/uploads/2016/12/08/58499c406ac2f.jpg';

class Congratulation extends Component {
   render() {
      return (
         <>
         {this.props.score === 30 ?
            <div className='congrats' >
             <p className='congrats-p'> Ну ты крутой с*ка <br/>
                 Держи подарок!!!</p>
                 <img
                 src={url}
                 className='prize'
                  />
             </div>
            : <div className='congrats' >
                <p className='congrats-p' > Поздравляем вы набрали {this.props.score} баллов из 30</p>
                <button onClick={()=> window.location.reload()}> Желаете еще попробовать? </button>
            </div>
         }
         </>
      );
   }
}

export default Congratulation ;
