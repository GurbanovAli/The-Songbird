import React from 'react';

import ReactAudioPlayer from 'react-audio-player';
import { birdsData, questions } from './Dates/data';
import birdImage from './Dates/bird.png';
import volume from './img/amplifier.png';


const AnswersList = (props) => {
    const { isGuessed, chosen, activeQuestionIndex, lastClickedIndex, guess } = props;

    const correctBirdIndex = questions[activeQuestionIndex];

    const question = birdsData[activeQuestionIndex];

    const isChosen = !!chosen.length;
    const chosenBird = lastClickedIndex !== -1 ? question[lastClickedIndex] : null;

    return (
        <>
            <div className="bla">
                <div className="block_three">
                    {question.map((birds, index) => {
                        let styles = {};

                        if (chosen.includes(index)) {
                            styles = isGuessed && index === correctBirdIndex
                                ? { color: 'green' }
                                : { color: 'red' };
                        }

                        return (
                            <li
                                key={birds.id}
                                onClick={() => guess(birds.id)}
                                className="birds_item"
                                style={styles}
                            >
                               <span>
                                  {birds.name}
                               </span>
                            </li>
                        );
                    })}
                </div>
                <div className="block_four">
                    <div className="block_four_item">
                        <img src={isChosen ? chosenBird.image : volume} />
                        <div>
                            <h2>{isChosen ? chosenBird.name : ''}</h2>
                            <h2>{isChosen ? chosenBird.species : ''}</h2>
                            {isChosen && (
                                <ReactAudioPlayer
                                    className="audio"
                                    src={chosenBird.audio}
                                    controls
                                />
                            )}
                        </div>
                    </div>
                    <p>{isChosen ? chosenBird.description : 'Пожалуйста послушайте плеер сперва'}</p>
                </div>
            </div>
        </>
    );
};

export default AnswersList;
