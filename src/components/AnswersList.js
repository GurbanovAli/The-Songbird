import React from 'react';

import ReactAudioPlayer from 'react-audio-player';
import './Dates/fly.mp3';
import { birdsData, questions } from './Dates/data';
import birdImage from './Dates/bird.png';


const AnswersList = (props) => {
    const { isGuessed, chosen, activeQuestionIndex, guess } = props;


    const correctBirdIndex = questions[activeQuestionIndex];

    const question = birdsData[activeQuestionIndex];

    const isChosen = !!chosen.length;
    const lastChosenIndex = isChosen ? chosen[chosen.length - 1] : -1;
    const chosenBird = isChosen ? question[lastChosenIndex] : null;

    const url = 'http://freesoundeffect.net/sites/default/files/bonus-collect-1-sound-effect-82748414.mp3';
    const wins = new Audio(url);
    const soundOver = 'http://freesoundeffect.net/sites/default/files/wrong-answer-game-over-6-sound-effect-87570191.mp3';
    const over = new Audio(soundOver);


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
                        let play = {};

                        if (chosen.includes(index)) {
                            play = isGuessed && index === correctBirdIndex
                                ? [ wins.play()]
                                : [ over.play()];
                        }


                        return (
                            <li
                                key={birds.id}
                                onClick={() => guess(birds.id)}
                                className="birds_item"
                                style={styles}
                                play={play}
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
                        <img src={isChosen ? chosenBird.image : birdImage} />
                        <div>
                            <h2>{isChosen ? chosenBird.name : '*******'}</h2>
                            <h2>{isChosen ? chosenBird.species : '*******'}</h2>
                            {isChosen && (
                                <ReactAudioPlayer
                                    className="audio"
                                    src={chosenBird.audio}
                                    controls
                                />
                            )}
                        </div>
                    </div>
                    <p>{isChosen ? chosenBird.description : 'Послушайте звук сперва'}</p>
                </div>
            </div>
        </>
    );
};

export default AnswersList;
